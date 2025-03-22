from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import TextFormatter
from youtube_transcript_api._errors import TranscriptsDisabled, NoTranscriptFound, CouldNotRetrieveTranscript
import os
import re

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini API
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    print("Warning: GOOGLE_API_KEY not found in environment variables")
else:
    genai.configure(api_key=GOOGLE_API_KEY)

# Pydantic Model
class VideoURL(BaseModel):
    url: str
    language: str = "en"  # Default language is English

# Function to extract YouTube Video ID
def extract_video_id(youtube_url):
    match = re.search(r"(?:v=|\/)([0-9A-Za-z_-]{11}).*", youtube_url)
    if match:
        return match.group(1)
    else:
        raise HTTPException(
            status_code=400,
            detail="Invalid YouTube URL. Please provide a valid video link."
        )

# Function to fetch transcript text
def fetch_transcript(video_id, language):
    try:
        print(f"🔍 Trying to fetch transcript in '{language}'...")
        return YouTubeTranscriptApi.get_transcript(video_id, languages=[language])
    except (TranscriptsDisabled, NoTranscriptFound, CouldNotRetrieveTranscript) as e:
        print(f"❌ Transcript Fetch Failed: {str(e)}")
        return None

def fetch_fallback_transcript(video_id):
    try:
        transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
        available_languages = [
            t.language_code for t in transcript_list._manually_created_transcripts.values()
        ] + [
            t.language_code for t in transcript_list._generated_transcripts.values()
        ]

        print(f"✅ Available Languages: {available_languages}")
        if not available_languages:
            raise HTTPException(status_code=400, detail="No transcripts available for this video.")

        transcript = transcript_list.find_transcript(available_languages).fetch()
        print(f"✅ Using Fallback Transcript Language: {transcript_list.find_transcript(available_languages).language}")
        return transcript
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error fetching transcript: {str(e)}")

def extract_transcript_text(youtube_video_url, language="en"):
    try:
        video_id = extract_video_id(youtube_video_url)
        print(f"📌 Extracted Video ID: {video_id}")

        transcript = fetch_transcript(video_id, language)
        if not transcript:
            transcript = fetch_fallback_transcript(video_id)

        transcript_text = " ".join([entry["text"] for entry in transcript])
        print("✅ Successfully Extracted Transcript (First 500 chars):", transcript_text[:500])
        return transcript_text
    except HTTPException as e:
        print("❌ HTTP Exception in extract_transcript_text:", str(e))
        raise e
    except Exception as e:
        print("❌ Unexpected Error in extract_transcript_text:", str(e))
        raise HTTPException(status_code=400, detail=f"Error processing video: {str(e)}")

# Function to generate summary using Gemini AI
def generate_summary(transcript_text, target_language):
    prompt = f"""
    You are a YouTube video summarizer. Summarize the given transcript into key points 
    with full explanation in more than 500 words using Markdown format. Include emojis for readability. 

    If the transcript is not in English, translate it to English first before summarizing.

    Transcript:
    {transcript_text}
    """

    try:
        model = genai.GenerativeModel("gemini-2.0-flash")

        response = model.generate_content(prompt)

        print("🔹 Raw Gemini Response:", response)
        if hasattr(response, 'text'):
            return response.text
        elif isinstance(response, dict):
            return response.get("candidates", [{}])[0].get("content", "Summary generation failed.")
        else:
            return "Unexpected response format from Gemini API."
    except Exception as e:
        print("❌ Gemini API Error:", str(e))
        raise HTTPException(status_code=500, detail=f"Gemini API Error: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.post("/api/summarize")
async def summarize_video(video: VideoURL):
    try:
        print(f"📌 Received URL: {video.url}, Language: {video.language}")

        transcript = extract_transcript_text(video.url, video.language)
        if not transcript:
            raise HTTPException(status_code=400, detail="Transcript extraction failed.")

        summary = generate_summary(transcript, target_language=video.language)
        print("📌 Generated Summary:", summary[:500])

        return {
            "summary": summary,
            "questions": [
                "What are the main points discussed in the video?",
                "How does this content relate to the broader context?",
                "What evidence is presented to support the main arguments?"
            ]
        }
    except HTTPException as e:
        print("❌ API Error:", str(e))
        raise e
    except Exception as e:
        print("❌ Unexpected Error:", str(e))
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@app.post("/api/generate-questions")
async def generate_questions(video: VideoURL):
    try:
        transcript = extract_transcript_text(video.url, video.language)
        if not transcript:
            raise HTTPException(status_code=400, detail="Transcript extraction failed.")

        prompt = f"""
        Based on this video transcript, generate 5 insightful questions and answers.

        Format:
        Q1: [Question]
        A1: [Answer]

        Q2: [Question]
        A2: [Answer]

        Transcript:
        {transcript}
        """

        model = genai.GenerativeModel("gemini-2.0-flash")

        response = model.generate_content(prompt)

        qa_pairs = []
        current_qa = None
        for line in response.text.split("\n"):
            line = line.strip()
            if not line:
                continue
            if line.startswith("Q"):
                if current_qa and "question" in current_qa and "answer" in current_qa:
                    qa_pairs.append(current_qa)
                current_qa = {"question": line[line.find(":")+1:].strip()}
            elif line.startswith("A") and current_qa:
                current_qa["answer"] = line[line.find(":")+1:].strip()

        if current_qa and "question" in current_qa and "answer" in current_qa:
            qa_pairs.append(current_qa)

        if not qa_pairs:
            raise HTTPException(status_code=500, detail="Failed to generate questions.")

        return {"questions": qa_pairs}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")