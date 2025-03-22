
// import React, { useState } from "react";

// const Summarize: React.FC = () => {
//   const [url, setUrl] = useState<string>("");
//   const [summary, setSummary] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUrl(e.target.value);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:8003/api/summarize", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ url, language: "en" }), // Ensure language is sent
//       });

//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }

//       const data: { summary: string } = await res.json();
//       setSummary(data.summary);
//       setError(null);
//     } catch (err) {
//       setError((err as Error).message);
//       setSummary(null);
//     }
//   };

//   return (
//     <div>
//       <input type="text" value={url} onChange={handleChanges} placeholder="Enter URL" />
//       <button onClick={handleSubmit}>Summarize</button>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {summary && <pre>{summary}</pre>}
//     </div>
//   );
// };

// export default Summarize;


// import React, { useState } from "react";

// const Summarize: React.FC = () => {
//   const [url, setUrl] = useState("");
//   const [mcqs, setMcqs] = useState<any[]>([]);
//   const [summary, setSummary] = useState<string | null>(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userAnswers, setUserAnswers] = useState<string[]>([]);
//   const [score, setScore] = useState<number | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUrl(e.target.value);
//   };

//   const handleGenerateMCQs = async () => {
//     setScore(null);
//     setCurrentQuestionIndex(0);
//     setUserAnswers([]);
//     setError(null);

//     const res = await fetch("http://localhost:8003/api/generate-mcqs", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ url }),
//     });

//     const data = await res.json();
//     if (!data.mcqs || data.mcqs.length === 0) {
//       setError("Failed to generate MCQs. Please check the video link or try again.");
//       return;
//     }
//     setMcqs(data.mcqs);
//   };

//   const handleSummarize = async () => {
//     setSummary(null);
//     setError(null);

//     const res = await fetch("http://localhost:8003/api/summarize", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ url }),
//     });

//     const data = await res.json();
//     if (!data.summary) {
//       setError("Failed to generate summary. Please check the video link or try again.");
//       return;
//     }
//     setSummary(data.summary);
//   };

//   const handleAnswerSelect = (answer: string) => {
//     setUserAnswers((prev) => [...prev, answer]);
//     if (currentQuestionIndex + 1 < mcqs.length) {
//       setCurrentQuestionIndex((prev) => prev + 1);
//     }
//   };

//   const handleSubmit = () => {
//     let correctCount = 0;
//     mcqs.forEach((mcq, index) => {
//       if (mcq.correct_answer === userAnswers[index]) {
//         correctCount++;
//       }
//     });
//     setScore(correctCount);
//   };

//   return (
//     <div>
//       <h2>YouTube Transcript Summarizer & MCQ Generator</h2>
      
//       {/* Input for YouTube URL */}
//       <input
//         type="text"
//         value={url}
//         onChange={handleChanges}
//         placeholder="Enter YouTube URL"
//       />
      
//       {/* Buttons for Summarization & MCQs */}
//       <button onClick={handleSummarize}>Summarize</button>
//       <button onClick={handleGenerateMCQs}>Generate MCQs</button>

//       {/* Show error message */}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* Show Summary */}
//       {summary && (
//         <div>
//           <h3>Summary</h3>
//           <p>{summary}</p>
//         </div>
//       )}

//       {/* Show MCQs */}
//       {mcqs.length > 0 && score === null && (
//         <div>
//           <h3>Question {currentQuestionIndex + 1}/{mcqs.length}</h3>
//           <p>{mcqs[currentQuestionIndex].question}</p>
//           {mcqs[currentQuestionIndex].options.map((option: string, index: number) => (
//             <button key={index} onClick={() => handleAnswerSelect(option)}>
//               {option}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Submit Button */}
//       {userAnswers.length === mcqs.length && score === null && (
//         <button onClick={handleSubmit}>Submit</button>
//       )}

//       {/* Show Score & Correct Answers */}
//       {score !== null && (
//         <div>
//           <h3>Your Score: {score} / {mcqs.length}</h3>
//           {mcqs.map((mcq, index) => (
//             <div key={index}>
//               <p><strong>Q{index + 1}:</strong> {mcq.question}</p>
//               <p>Your Answer: {userAnswers[index]}</p>
//               <p>Correct Answer: {mcq.correct_answer}</p>
//               <p><strong>Explanation:</strong> {mcq.explanation}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Summarize;

import React, { useState } from "react";

const Summarize: React.FC = () => {
  const [url, setUrl] = useState("");
  const [mcqs, setMcqs] = useState<any[]>([]);
  const [summary, setSummary] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleGenerateMCQs = async () => {
    setScore(null);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setError(null);

    const res = await fetch("http://localhost:8003/api/generate-mcqs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    if (!data.mcqs || data.mcqs.length === 0) {
      setError("Failed to generate MCQs. Please check the video link or try again.");
      return;
    }
    setMcqs(data.mcqs);
  };

  const handleSummarize = async () => {
    setSummary(null);
    setError(null);

    const res = await fetch("http://localhost:8003/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    if (!data.summary) {
      setError("Failed to generate summary. Please check the video link or try again.");
      return;
    }
    setSummary(data.summary);
  };

  const handleAnswerSelect = (answer: string) => {
    setUserAnswers((prev) => [...prev, answer]);
    if (currentQuestionIndex + 1 < mcqs.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    mcqs.forEach((mcq, index) => {
      if (mcq.correct_answer === userAnswers[index]) {
        correctCount++;
      }
    });
    setScore(correctCount);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          YouTube Transcript Summarizer & MCQ Generator
        </h2>

        {/* Input for YouTube URL */}
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={url}
            onChange={handleChanges}
            placeholder="Enter YouTube URL"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-4 space-x-3">
          <button
            onClick={handleSummarize}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Summarize
          </button>
          <button
            onClick={handleGenerateMCQs}
            className="px-5 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            Generate MCQs
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}

        {/* Summary Section */}
        {summary && (
          <div className="mt-6 p-4 bg-blue-100 border-l-4 border-blue-500 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800">Summary</h3>
            <p className="text-gray-700">{summary}</p>
          </div>
        )}

        {/* MCQ Section */}
        {mcqs.length > 0 && score === null && (
          <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Question {currentQuestionIndex + 1}/{mcqs.length}
            </h3>
            <p className="text-gray-700 mt-2">{mcqs[currentQuestionIndex].question}</p>
            <div className="mt-3 space-y-2">
              {mcqs[currentQuestionIndex].options.map((option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className="w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        {userAnswers.length === mcqs.length && score === null && (
          <div className="text-center mt-4">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
            >
              Submit
            </button>
          </div>
        )}

        {/* Score Section */}
        {score !== null && (
          <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800">
              Your Score: {score} / {mcqs.length}
            </h3>
            {mcqs.map((mcq, index) => (
              <div key={index} className="mt-4 p-4 bg-white shadow-sm rounded-lg">
                <p className="text-gray-800 font-semibold">
                  Q{index + 1}: {mcq.question}
                </p>
                <p className="text-gray-700">Your Answer: {userAnswers[index]}</p>
                <p className="text-gray-700">Correct Answer: {mcq.correct_answer}</p>
                <p className="text-gray-600 italic">
                  <strong>Explanation:</strong> {mcq.explanation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Summarize;
