import React, { useState } from 'react';
import { Bot, Send, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface AIChatboxProps {
  className?: string;
}

const AIChatbox: React.FC<AIChatboxProps> = ({ className }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { id: 1, sender: 'ai', message: 'Hello! I\'m your AI tutor. How can I help you with your learning today?', timestamp: '1:30 PM' },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage = {
      id: chatHistory.length + 1,
      sender: 'user',
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatHistory([...chatHistory, userMessage]);
    setMessage('');

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiMessage = {
        id: chatHistory.length + 2,
        sender: 'ai',
        message: "I understand you're curious about advanced algorithms. Let's break down the concept of dynamic programming...",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatHistory((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className={cn('bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col h-full', className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">AI Tutor</h2>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Online
        </span>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {chatHistory.map((chat) => (
          <div
            key={chat.id}
            className={cn(
              'flex items-start gap-3 animate-fade-in',
              chat.sender === 'ai' ? 'justify-start' : 'justify-end'
            )}
          >
            {chat.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
            )}

            <div
              className={cn(
                'rounded-2xl px-4 py-3 max-w-[80%]',
                chat.sender === 'ai'
                  ? 'bg-purple-100 text-gray-800 rounded-tl-none'
                  : 'bg-blue-100 text-gray-800 rounded-tr-none'
              )}
            >
              <p className="text-sm">{chat.message}</p>
              <p className="text-xs text-gray-500 mt-1">{chat.timestamp}</p>
            </div>

            {chat.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 border border-blue-300">
                <User className="h-4 w-4 text-blue-600" />
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask your AI tutor anything..."
          className="w-full px-4 py-3 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};

export default AIChatbox;
