import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Coins, 
  Bot, 
  Award, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import Streak from "../components/Streak"
interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { id: 'learn', label: 'Learn', icon: BookOpen, path: '/learn' },
    { id: 'stake', label: 'Stake Tokens', icon: Coins, path: '/stake' },
    { id: 'ai-tutor', label: 'AI Tutor', icon: Bot, path: '/chatbot' },
    { id: 'achievements', label: 'Roadmap', icon: Award, path: '/roadmap' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div 
      className={cn(
        'h-screen bg-white border-r border-gray-200 shadow-sm transition-all duration-300 z-10',
        isCollapsed ? 'w-20' : 'w-64',
        className
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                <span className="text-white font-medium text-sm">GS</span>
              </div>
              <h2 className="font-montserrat font-semibold text-lg">GyaanSphere</h2>
            </div>
          )}
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>
        
        <div className="flex-1 py-6 px-3 overflow-y-auto">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors',
                  activeItem === item.id && 'bg-gray-100 text-gray-900 font-semibold',
                  'animate-fade-in'
                )}
                style={{ animationDelay: `${menuItems.indexOf(item) * 0.05}s` }}
                onClick={() => setActiveItem(item.id)}
              >
                <item.icon size={20} />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        <Streak/>
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className={cn(
            "flex items-center gap-3 p-3 rounded-lg bg-gray-100",
            isCollapsed && "justify-center"
          )}>
            {!isCollapsed ? (
              <>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <span className="text-purple-500 font-medium">JS</span>
                </div>
                <div>
                  <p className="font-medium text-sm">John Smith</p>
                  <p className="text-xs text-gray-500">Pro Plan</p>
                </div>
              </>
            ) : (
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <span className="text-purple-500 font-medium">JS</span>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Sidebar;
