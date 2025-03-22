import React, { useState, useEffect } from "react";
import { CheckCircle, Circle, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";
import ProgressCircle from "./ProgressCircle";
import { toast } from "react-hot-toast"; // Add toast notification library

// Import local videos
import module1 from "../assets/videos/module1.mp4";
import module2 from "../assets/videos/module2.mp4";
import module3 from "../assets/videos/module3.mp4";
import module4 from "../assets/videos/module4.mp4";

interface LearningPathProps {
  className?: string;
}

const LearningPath: React.FC<LearningPathProps> = ({ className }) => {
  const [tokens, setTokens] = useState<number>(() => {
    return parseInt(localStorage.getItem("tokens") || "0", 10);
  });

  const [modules, setModules] = useState([
    { id: 1, title: "Fundamentals", completed: true, progress: 100, videoUrl: module1 },
    { id: 2, title: "Intermediate Concepts", completed: true, progress: 100, videoUrl: module2 },
    { id: 3, title: "Advanced Topics", completed: false, progress: 65, videoUrl: module3 },
    { id: 4, title: "Expert Techniques", completed: false, progress: 0, videoUrl: module4 },
  ]);

  const [currentModule, setCurrentModule] = useState(modules.find((m) => !m.completed) || modules[0]);

  const totalProgress = Math.round(modules.reduce((acc, module) => acc + module.progress, 0) / modules.length);

  const handleVideoEnd = () => {
    if (!currentModule.completed) {
      // Update tokens
      const newTokens = tokens + 10;
      setTokens(newTokens);
      localStorage.setItem("tokens", newTokens.toString());

      // Update module completion
      setModules((prevModules) =>
        prevModules.map((module) =>
          module.id === currentModule.id ? { ...module, completed: true, progress: 100 } : module
        )
      );

      // Move to the next module
      const nextModule = modules.find((m) => !m.completed);
      if (nextModule) {
        setCurrentModule(nextModule);
      }

      // Show toast notification
      toast.success(`Video Complete! 🎉 10 Tokens Received.`);
    }
  };

  useEffect(() => {
    localStorage.setItem("tokens", tokens.toString());
  }, [tokens]);

  return (
    <div className={cn("bg-white rounded-2xl p-6 shadow-md", className)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Learning Path</h2>
        <button className="text-sm text-blue-600 hover:underline focus:outline-none">
          View All
        </button>
      </div>

      {/* Tokens Display */}
      <div className="mb-4 text-sm text-gray-600">
        <strong>Tokens:</strong> {tokens}
      </div>

      {/* Current Module */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Current Module</h3>
          <p className="text-lg font-semibold">{currentModule.title}</p>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
              {totalProgress}% Complete
            </span>
          </div>
        </div>
        <ProgressCircle progress={totalProgress} size={100} strokeWidth={8}>
          <div className="text-center">
            <span className="block text-2xl font-bold">{totalProgress}%</span>
            <span className="text-xs text-gray-500">Overall</span>
          </div>
        </ProgressCircle>
      </div>

      {/* Video Player */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Now Playing: {currentModule.title}</h3>
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
          <video
            key={currentModule.id}
            controls
            autoPlay
            className="w-full h-full"
            onEnded={handleVideoEnd}
          >
            <source src={currentModule.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {modules.map((module, index) => (
          <div
            key={module.id}
            className={cn(
              "relative flex items-center p-3 rounded-lg border transition-all cursor-pointer",
              module.completed
                ? "border-green-200 bg-green-50"
                : index === modules.findIndex((m) => !m.completed)
                ? "border-blue-200 bg-blue-50"
                : "border-gray-200",
              index === modules.findIndex((m) => !m.completed) && "border-l-4 border-blue-600"
            )}
            onClick={() => setCurrentModule(module)}
          >
            <div className="mr-3">
              {module.completed ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <Circle
                  className={cn(
                    "h-6 w-6",
                    index === modules.findIndex((m) => !m.completed) ? "text-blue-600" : "text-gray-300"
                  )}
                />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium">{module.title}</p>
              <div className="mt-1 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                  style={{ width: `${module.progress}%` }}
                />
              </div>
            </div>
            {index === modules.findIndex((m) => !m.completed) && (
              <button
                className="ml-2 p-2 rounded-full bg-white shadow-sm hover:shadow transition-shadow"
                aria-label="Continue learning"
              >
                <ArrowRight className="h-4 w-4 text-blue-600" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPath;
