import React, { useState } from 'react';
import { FcVoicePresentation } from 'react-icons/fc';
import { FaRegStopCircle } from 'react-icons/fa';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import { useSpeechSynthesis } from 'react-speech-kit';

interface ChatMessage {
  role: 'user' | 'bot';
  message: string;
}

const ChatBot: React.FC = () => {
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
  const { speak } = useSpeechSynthesis();

  const [ans, setAns] = useState<string>('Hello');
  const [ttext, setText] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);

  // Start recording
  const start = (): void => {
    resetTranscript();
    setText('');
    SpeechRecognition.startListening({ continuous: true });
  };

  // Stop recording and generate answer
  const stop = (): void => {
    SpeechRecognition.stopListening();
    setText(transcript);
    if (transcript.trim()) {
      generateAnswer(transcript);
    } else {
      setAns('Please say something.');
    }
  };

  // Generate answer using FastAPI backend
  const generateAnswer = async (text: string): Promise<void> => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/chat', {
        user_message: text,
        history: history,
      });

      const generatedText: string = response.data.bot_message;
      setAns(generatedText);

      // Update conversation history with user and bot messages
      const newHistory: ChatMessage[] = [
        ...history,
        { role: 'user', message: text },
        { role: 'bot', message: generatedText },
      ];
      setHistory(newHistory);

      // Speak the answer and set speaking state. Cast the options as any to bypass type errors.
      speak({
        text: generatedText,
        rate: 1.75,
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
      } as any);
    } catch (error: any) {
      console.error('Error generating answer:', error);
      setAns("Sorry, I couldn't generate a response.");
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (
    <div className="wapper-about">
      <div
        style={{
          margin: 'auto',
          width: '90%',
          maxWidth: '600px',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          backgroundColor: '#1e1c2a',
        }}
      >
        <h1 style={{ color: 'gold', marginBottom: '20px', fontWeight: '900' }}>R Fusion AI</h1>
        <input
          type="text"
          value={ttext || transcript}
          readOnly
          style={{
            height: '50px',
            width: '90%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            marginBottom: '20px',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '20px',
          }}
        >
          <div
            onClick={start}
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
          >
            <FcVoicePresentation size={50} />
            <span style={{ marginLeft: '10px', color: 'gold' }}>Start</span>
          </div>
          <div
            onClick={stop}
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
          >
            <FaRegStopCircle size={50} />
            <span style={{ marginLeft: '10px', color: 'gold' }}>Stop</span>
          </div>
        </div>
        {/* Display the generated answer */}
        <p style={{ fontSize: '18px', color: 'white' }}>{ans}</p>
        {/* Display video while AI is speaking */}
        {isSpeaking && (
          <div style={{ marginTop: '20px' }}>
            <video width="320" height="240" autoPlay loop muted>
              <source src="https://www.example.com/your-ai-avatar-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
