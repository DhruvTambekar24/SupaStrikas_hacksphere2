import React from 'react';
import { Coins, TrendingUp, ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface RewardsSectionProps {
  className?: string;
}

const RewardsSection: React.FC<RewardsSectionProps> = ({ className }) => {
  const rewardHistory = [
    { id: 1, title: 'Completed Advanced Quiz', amount: 250, date: '2 days ago' },
    { id: 2, title: 'Daily Login Streak (7 days)', amount: 175, date: '5 days ago' },
    { id: 3, title: 'Finished Module "Data Structures"', amount: 500, date: '1 week ago' },
  ];

  return (
    <div className={cn('bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow', className)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Earn-to-Learn Rewards</h2>
        <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm py-1.5 px-4 rounded-lg hover:opacity-90 transition">
          Stake Tokens
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Current Balance */}
        <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl p-4 flex items-center gap-4 animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg">
            <Coins className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Current Balance</p>
            <p className="text-2xl font-bold">3,250</p>
            <p className="text-xs text-gray-500">EduTokens</p>
          </div>
        </div>
        
        {/* Staking Returns */}
        <div className="bg-gradient-to-br from-indigo-100 to-pink-100 rounded-xl p-4 flex items-center gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Staking Returns</p>
            <p className="text-2xl font-bold">+15%</p>
            <p className="text-xs text-gray-500">Annual Yield</p>
          </div>
        </div>
      </div>

      {/* Recent Rewards */}
      <h3 className="text-lg font-medium mb-3">Recent Rewards</h3>
      <div className="space-y-3">
        {rewardHistory.map((reward, index) => (
          <div
            key={reward.id}
            className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all animate-fade-in"
            style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
          >
            <div>
              <p className="font-medium">{reward.title}</p>
              <p className="text-xs text-gray-500">{reward.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-purple-500">+{reward.amount}</p>
              <Coins className="h-4 w-4 text-purple-500" />
            </div>
          </div>
        ))}
      </div>
      
      {/* View All Transactions */}
      <div className="mt-4 flex justify-center">
        <button className="text-sm text-gray-500 hover:text-purple-500 flex items-center gap-1 transition-colors">
          View all transactions
          <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default RewardsSection;
