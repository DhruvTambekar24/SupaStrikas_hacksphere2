import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useFirebase } from './firebase';
import LandingPage from './pages/LandingPage';
import ChatBot from './components/ChatBot';
import RoadmapGenerator from './components/RoadmapGenerator';
import SignUp from './pages/Signin';
import Dashboard from './pages/Dashboard';

interface ProtectedRouteProps {
  children: JSX.Element;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const firebase = useFirebase();
  if (!firebase.user) {
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/chatbot" element={
       
          <ChatBot />
   
      } />
      <Route path="/roadmap" element={
    
          <RoadmapGenerator />
   
      } />
    </Routes>
  );
}

export default App;
