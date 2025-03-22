import React, { useState } from 'react';
import { Briefcase, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

interface CareerRoadmapProps {
  className?: string;
}

const CareerRoadmap: React.FC<CareerRoadmapProps> = ({ className }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const careerMilestones = [
    { id: 1, level: 'Entry Level', title: 'Junior Developer', skills: ['HTML/CSS', 'JavaScript', 'Basic Algorithms'], resources: 2 },
    { id: 2, level: 'Intermediate', title: 'Full Stack Developer', skills: ['React', 'Node.js', 'Databases'], resources: 5 },
    { id: 3, level: 'Advanced', title: 'Senior Developer', skills: ['System Design', 'Architecture', 'Team Leadership'], resources: 3 },
  ];

  return (
    <div className={cn('bg-white rounded-2xl p-6 shadow-md', className)}>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Briefcase className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Career Roadmap</h2>
            <p className="text-sm text-gray-500">Personalized path to your goals</p>
          </div>
        </div>
        <button className="p-1 rounded-md hover:bg-gray-100 transition-colors">
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-5 space-y-4 animate-fade-in">
          {careerMilestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className="border-l-2 border-dashed border-blue-300 pl-4 ml-4 pb-4 last:pb-0 relative animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-blue-600" />
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-blue-200 text-blue-700 text-xs rounded-full mb-1">
                      {milestone.level}
                    </span>
                    <h3 className="font-semibold">{milestone.title}</h3>
                  </div>
                  <button className="text-xs text-blue-600 flex items-center gap-1 hover:underline">
                    View Resources
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {milestone.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-white rounded-md text-xs font-medium shadow-sm border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="text-center mt-4">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm py-1.5 px-4 rounded-lg shadow-md hover:opacity-90 transition">
              Generate Detailed Roadmap
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerRoadmap;
