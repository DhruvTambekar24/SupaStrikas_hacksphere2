import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, BookOpen, Trophy, Compass } from 'lucide-react';
import { AuthModal } from '../components/AuthModal';
import image from '../assets/image.png';
import Spline from '@splinetool/react-spline';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate=useNavigate();
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
    <div
    className="min-h-screen"
    style={{ backgroundColor: "#C3D1FF" }}
  >
     

   <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
        {/* Spline component */}
        <Spline
          scene="https://prod.spline.design/RRrsATVg24EE3YwE/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />

        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "7%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <img src={image} alt="Descriptive Text" style={{ width: "200px", height: "auto" }} />
        </div>

        {/* welcome Text */}
        <div
  style={{
    position: "absolute",
    top: "35%",
    left: "22%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  }}
>
  {/* Main Heading */}
  <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500">
    WELCOME TO <span className="text-blue-700">Gyansphere</span>
  </h1>
  </div>
  <div style={{
    position: "absolute",
    top: "48%",
    left: "15%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  }}>

  {/* Subtext */}
  <p className="mt-4 text-lg text-gray-800 text-left">
    Revolutionizing Learning through <span className="font-bold text-purple-500">AI</span>, 
    <span className="font-bold text-blue-500"> Blockchain,</span><br/> and <span className="font-bold text-pink-500">exciting rewards</span>.
    <br />

  </p>
</div>


        {/* Overlay Text with Button */}
        <div
          style={{
            position: "absolute",
            top: "65%",
            left: "10%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <button  onClick={() => {
            navigate("/login")
          }}
            style={{
              background: "black",
              color: "white",
              padding: "0.8rem 1rem",
              fontSize: "1.8rem",
              fontWeight: "bold",
              border: "none",
              borderRadius: "30px",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = "linear-gradient(90deg, #FC20FF, #A269FF)";
              target.style.color = "white";
              target.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = "black";
              target.style.color = "white";
              target.style.transform = "scale(1)";
            }}
            onMouseDown={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.transform = "scale(0.9)";
              target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
            }}
            onMouseUp={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.transform = "scale(1)";
              target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            }}
          >
            Get Started →
          </button>
        </div>

        <div
          style={{
            position: "absolute",
            top: "94.5%",
            left: "95%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              background: "black",
              color: "white",
              fontSize: "0.7rem",
              padding: "0.5rem",
              borderRadius: "0px",
              display: "inline-block",
              width: "100px",
            }}
          >
            Supa Strikas
          </p>
        </div>
      </div>

 <br/>
  <br/>
  <br/>
  <motion.h1
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 text-gray-600 mx-20 max-w-lg "
>
  FEATURES
</motion.h1>
  

<div className="mx-14 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <Brain className="w-12 h-12 mb-4 text-black" />,
              title: "AI-Powered Learning",
              description: "Personalized learning paths adapted to your unique style"
            },
            {
              icon: <Trophy className="w-12 h-12 mb-4 text-black" />,
              title: "Learn & Earn",
              description: "Earn rewards as you progress through your learning journey"
            },
            {
              icon: <Compass className="w-12 h-12 mb-4 text-black" />,
              title: "Career Guidance",
              description: "AI-driven career roadmaps tailored to your goals"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white/30 backdrop-blur-lg rounded-xl p-6 text-center"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-black mb-2">{feature.title}</h3>
              <p className="text-black/80">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
   
        </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
     <div className="bg-white/30 backdrop-blur-lg text-black py-2 px-14">
  <div className="flex flex-col md:flex-row justify-between items-center">
    {/* Left Section */}
    <div className="mb-4 md:mb-0">
      <h2 className="text-lg font-bold">GyaanSphere</h2>
      <p className="text-sm">Empowering your learning journey</p>
    </div>



    {/* Right Section */}
    <div className="mt-4 md:mt-0">
      <p className="text-sm">&copy; 2025 GyaanSphere. All rights reserved.</p>
    </div>
  </div>
</div>

    </div>
    
  );
}

export default LandingPage;