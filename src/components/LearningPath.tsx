import React from 'react';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import ProgressCircle from './ProgressCircle';

interface LearningPathProps {
  className?: string;
}

const LearningPath: React.FC<LearningPathProps> = ({ className }) => {
  const modules = [
    { id: 1, title: 'Fundamentals', completed: true, progress: 100 },
    { id: 2, title: 'Intermediate Concepts', completed: true, progress: 100 },
    { id: 3, title: 'Advanced Topics', completed: false, progress: 65 },
    { id: 4, title: 'Expert Techniques', completed: false, progress: 0 },
    { id: 5, title: 'Mastery', completed: false, progress: 0 },
  ];

  const totalProgress = Math.round(
    modules.reduce((acc, module) => acc + module.progress, 0) / modules.length
  );

  return (
    <div className={cn('bg-white rounded-2xl p-6 shadow-md', className)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Learning Path</h2>
        <button className="text-sm text-blue-600 hover:underline focus:outline-none">
          View All
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Current Module</h3>
          <p className="text-lg font-semibold">Advanced Topics</p>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
              65% Complete
            </span>
            <span className="text-xs text-gray-500">• 3 of 5 modules</span>
          </div>
        </div>

        <ProgressCircle progress={totalProgress} size={100} strokeWidth={8}>
          <div className="text-center">
            <span className="block text-2xl font-bold">{totalProgress}%</span>
            <span className="text-xs text-gray-500">Overall</span>
          </div>
        </ProgressCircle>
      </div>

      <div className="space-y-4">
        {modules.map((module, index) => (
          <div
            key={module.id}
            className={cn(
              'relative flex items-center p-3 rounded-lg border transition-all animate-fade-in',
              module.completed
                ? 'border-green-200 bg-green-50'
                : index === modules.findIndex((m) => !m.completed)
                ? 'border-blue-200 bg-blue-50'
                : 'border-gray-200',
              index === modules.findIndex((m) => !m.completed) && 'border-l-4 border-blue-600'
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="mr-3">
              {module.completed ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <Circle
                  className={cn(
                    'h-6 w-6',
                    index === modules.findIndex((m) => !m.completed) ? 'text-blue-600' : 'text-gray-300'
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
