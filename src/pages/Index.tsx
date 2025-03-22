import React from 'react';
import Sidebar from '@/components/Sidebar';
import LearningPath from '@/components/LearningPath';
import RewardsSection from '@/components/RewardsSection';
import AIChatbox from '@/components/AIChatbox';
import CareerRoadmap from '@/components/CareerRoadmap';
import Achievements from '@/components/Achievements';
import QuickInsights from '@/components/QuickInsights';

const Index = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gyaan-blue/30">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-block px-2.5 py-0.5 bg-gyaan-light-purple text-gyaan-purple text-xs font-medium rounded-full">
                Pro Plan
              </span>
              <span className="text-sm text-muted-foreground">• 28 days remaining</span>
            </div>
            <h1 className="text-3xl font-bold">Welcome back, John!</h1>
            <p className="text-muted-foreground">Continue your learning journey where you left off.</p>
          </header>
          
          <section className="mb-6">
            <QuickInsights />
          </section>
          
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <LearningPath />
            <RewardsSection />
          </section>
          
          <section className="mb-6">
            <CareerRoadmap />
          </section>
          
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Achievements className="lg:col-span-1" />
            <AIChatbox className="lg:col-span-2 h-[400px]" />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
