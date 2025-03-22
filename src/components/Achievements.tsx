//commit
import React from 'react';
import { Award, Star, Trophy, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface AchievementsProps {
  className?: string;
}

const Achievements: React.FC<AchievementsProps> = ({ className }) => {
  const achievements = [
    { id: 1, title: 'Swift Learner', description: 'Completed 5 modules in one week', icon: Star, color: 'from-yellow-400 to-orange-500', unlocked: true },
    { id: 2, title: 'Problem Solver', description: 'Solved 50 coding challenges', icon: Trophy, color: 'from-green-400 to-cyan-500', unlocked: true },
    { id: 3, title: 'Consistency Champion', description: '30-day learning streak', icon: Award, color: 'from-purple-500 to-indigo-500', unlocked: false },
  ];

  return (
    <div className={cn('bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow', className)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Achievements & NFTs</h2>
        <button className="text-sm text-purple-600 hover:underline focus:outline-none">
          View Collection
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement, index) => (
          <div 
            key={achievement.id}
            className={cn(
              "relative p-4 rounded-xl border transition-all animate-fade-in overflow-hidden",
              achievement.unlocked 
                ? "border-gray-200 bg-white" 
                : "border-gray-200 bg-gray-50"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div 
              className={cn(
                "absolute inset-0 opacity-10 bg-gradient-to-br",
                achievement.color
              )}
            />
            
            <div className="relative">
              <div className={cn(
                "w-12 h-12 rounded-full bg-gradient-to-r mb-3 flex items-center justify-center",
                achievement.color
              )}>
                <achievement.icon className="h-6 w-6 text-white" />
              </div>
              
              <h3 className="font-semibold">{achievement.title}</h3>
              <p className="text-xs text-gray-500 mt-1 mb-3">{achievement.description}</p>
              
              {achievement.unlocked ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Unlocked
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  In Progress
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex justify-center">
        <button className="group text-sm text-purple-600 hover:text-indigo-600 flex items-center gap-1 transition-colors">
          View all achievements
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default Achievements;
