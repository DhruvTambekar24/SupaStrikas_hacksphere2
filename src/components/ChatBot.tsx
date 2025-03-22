// import React, { useState } from 'react';
// import { FcVoicePresentation } from 'react-icons/fc';
// import { FaRegStopCircle } from 'react-icons/fa';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import axios from 'axios';
// import { useSpeechSynthesis } from 'react-speech-kit';
// import Sidebar from './Sidebar';

// interface ChatMessage {
//   role: 'user' | 'bot';
//   message: string;
// }

// const ChatBot: React.FC = () => {
//   const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
//   const { speak } = useSpeechSynthesis();

//   const [ans, setAns] = useState<string>('Hello');
//   const [ttext, setText] = useState<string>('');
//   const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
//   const [history, setHistory] = useState<ChatMessage[]>([]);

//   // Start recording
//   const start = (): void => {
//     resetTranscript();
//     setText('');
//     SpeechRecognition.startListening({ continuous: true });
//   };

//   // Stop recording and generate answer
//   const stop = (): void => {
//     SpeechRecognition.stopListening();
//     setText(transcript);
//     if (transcript.trim()) {
//       generateAnswer(transcript);
//     } else {
//       setAns('Please say something.');
//     }
//   };

//   // Generate answer using FastAPI backend
//   const generateAnswer = async (text: string): Promise<void> => {
//     try {
//       const response = await axios.post('https://r-voiceaii.vercel.app/chat', {
//         user_message: text,
//         history: history,
//       });

//       const generatedText: string = response.data.bot_message;
//       setAns(generatedText);

//       // Update conversation history with user and bot messages
//       const newHistory: ChatMessage[] = [
//         ...history,
//         { role: 'user', message: text },
//         { role: 'bot', message: generatedText },
//       ];
//       setHistory(newHistory);

//       // Speak the answer and set speaking state. Cast the options as any to bypass type errors.
//       speak({
//         text: generatedText,
//         rate: 1.75,
//         onStart: () => setIsSpeaking(true),
//         onEnd: () => setIsSpeaking(false),
//       } as any);
//     } catch (error: any) {
//       console.error('Error generating answer:', error);
//       setAns("Sorry, I couldn't generate a response.");
//     }
//   };

//   if (!browserSupportsSpeechRecognition) {
//     return <p>Your browser does not support speech recognition.</p>;
//   }

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-[#cdd9ff] text-black">
//       <Sidebar />
//       <div className="flex flex-col items-center justify-center w-full p-6 md:p-10">
//         <div className="w-full max-w-2xl rounded-lg shadow-lg p-6 bg-gray-500/60 drop-shadow-2xl">
//           <h1 className="text-4xl font-extrabold text-white mb-6 text-center ">1-on-1 AI Tutor</h1>
//           <input
//             type="text"
//             value={ttext || transcript}
//             readOnly
//             className="w-full h-12 px-4 mb-6 text-lg text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           />
//           <div className="flex justify-around mb-6">
//             <button
//               onClick={start}
//               className="flex items-center px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-transform transform hover:scale-105"
//             >
//               <FcVoicePresentation size={30} />
//               <span className="ml-2 font-semibold">Start</span>
//             </button>
//             <button
//               onClick={stop}
//               className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105"
//             >
//               <FaRegStopCircle size={30} />
//               <span className="ml-2 font-semibold">Stop</span>
//             </button>
//           </div>
//           <p className="text-lg text-center text-white mb-6">{ans}</p>
//           {isSpeaking && (
//             <div className="flex justify-center mt-6">
//               <video
//                 className="rounded-lg shadow-lg"
//                 width="320"
//                 height="240"
//                 autoPlay
//                 loop
//                 muted
//               >
//                 <source
//                   src="https://www.example.com/your-ai-avatar-video.mp4"
//                   type="video/mp4"
//                 />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;
import React, { useState } from 'react';
import { FcVoicePresentation } from 'react-icons/fc';
import { FaRegStopCircle } from 'react-icons/fa';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import { useSpeechSynthesis } from 'react-speech-kit';
import Sidebar from './Sidebar';

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
      const response = await axios.post('https://r-voiceaii.vercel.app/chat', {
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
    <div className="flex flex-col md:flex-row min-h-screen bg-[#cdd9ff] text-black">
      <Sidebar />
      <div className="flex flex-col items-center justify-center w-full p-6 md:p-10">
        <div className="w-full max-w-2xl rounded-lg shadow-lg p-6 bg-gray-700/60 drop-shadow-2xl">
          <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center ">1-on-1 AI Tutor</h1>
          <input
            type="text"
            value={ttext || transcript}
            readOnly
            className="w-full h-12 px-4 mb-6 text-lg text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <div className="flex justify-around mb-6">
            <button
              onClick={start}
              className="flex items-center px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-transform transform hover:scale-105"
            >
              <FcVoicePresentation size={30} />
              <span className="ml-2 font-semibold">Start</span>
            </button>
            <button
              onClick={stop}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105"
            >
              <FaRegStopCircle size={30} />
              <span className="ml-2 font-semibold">Stop</span>
            </button>
          </div>
          <p className="text-lg text-center text-white mb-6">{ans}</p>
          {isSpeaking && (
            <div className="flex justify-center mt-6">
              <video
                className="rounded-lg shadow-lg"
                width="320"
                height="240"
                autoPlay
                loop
                muted
              >
                <source
                  src="https://www.example.com/your-ai-avatar-video.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
