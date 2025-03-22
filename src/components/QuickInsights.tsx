import React from 'react';
import { Clock, BookOpen, Award, Coins } from 'lucide-react';
import { cn } from '../lib/utils';

interface QuickInsightsProps {
  className?: string;
}

const QuickInsights: React.FC<QuickInsightsProps> = ({ className }) => {
  const insights = [
    { id: 1, title: 'Learning Hours', value: '42', icon: Clock, color: 'from-purple-500 to-indigo-500', change: '+3.5 hrs this week' },
    { id: 2, title: 'Lessons Completed', value: '28', icon: BookOpen, color: 'from-indigo-500 to-pink-500', change: '+4 new lessons' },
    { id: 3, title: 'Current Streak', value: '16', icon: Award, color: 'from-yellow-400 to-orange-500', change: 'days' },
    { id: 4, title: 'Tokens Earned', value: '3,250', icon: Coins, color: 'from-green-400 to-green-500', change: '+250 last week' },
  ];

  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4', className)}>
      {insights.map((insight, index) => (
        <div
          key={insight.id}
          className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow animate-fade-in"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">{insight.title}</p>
              <h3 className="text-2xl font-bold mt-1">{insight.value}</h3>
              <p className="text-xs text-gray-500 mt-1">{insight.change}</p>
            </div>
            <div
              className={cn(
                'w-10 h-10 rounded-full bg-gradient-to-r flex items-center justify-center',
                insight.color
              )}
            >
              <insight.icon className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickInsights;
