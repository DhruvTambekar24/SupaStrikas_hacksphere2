import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, BookOpen, Trophy, Compass } from 'lucide-react';
import { AuthModal } from './components/AuthModal';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white h-screen shadow-lg">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-primary-600">GyaanSphere</h2>
            </div>
            <nav className="mt-6">
              <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600">
                <Brain className="mr-3" />
                AI Tutor
              </a>
              <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600">
                <Trophy className="mr-3" />
                Earn-to-Learn
              </a>
              <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600">
                <Compass className="mr-3" />
                Career Roadmap
              </a>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome, User! Your Learning Journey Starts Now</h1>
            {/* Add dashboard content here */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 animate-gradient">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex justify-center mb-8">
            <BookOpen size={64} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            GyaanSphere
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Revolutionizing Learning Through AI & Blockchain
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAuthModalOpen(true)}
            className="bg-white text-primary-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <Brain className="w-12 h-12 mb-4 text-primary-100" />,
              title: "AI-Powered Learning",
              description: "Personalized learning paths adapted to your unique style"
            },
            {
              icon: <Trophy className="w-12 h-12 mb-4 text-primary-100" />,
              title: "Learn & Earn",
              description: "Earn rewards as you progress through your learning journey"
            },
            {
              icon: <Compass className="w-12 h-12 mb-4 text-primary-100" />,
              title: "Career Guidance",
              description: "AI-driven career roadmaps tailored to your goals"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default App;