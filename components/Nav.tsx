import React from 'react';
import { LogoIcon, MenuIcon } from './Icons';
import { User } from '../types';

interface TopNavProps {
  user: User;
  onToggleSidebar: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ user, onToggleSidebar }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-telesco-base/80 backdrop-blur-md border-b border-white/5 z-50 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleSidebar}
          className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg lg:hidden"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-telesco-accent to-telesco-glow rounded-lg flex items-center justify-center">
            <LogoIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-wide hidden md:block">TELESCO</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm font-medium text-white">{user.username}</span>
          <span className="text-xs text-telesco-accent">Level 1 Operative</span>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-telesco-accent/50 p-0.5">
          <img 
            src={user.avatarUrl} 
            alt="Profile" 
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
};