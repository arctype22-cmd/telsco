import React from 'react';
import { DashboardTab } from '../types';
import { HomeIcon, HistoryIcon, BrainIcon, ShieldIcon } from './Icons';

interface SidebarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, isOpen, onClose }) => {
  const menuItems = [
    { id: DashboardTab.HOME, label: 'Feed', icon: HomeIcon, color: 'text-blue-400' },
    { id: DashboardTab.HISTORY, label: 'Origins', icon: HistoryIcon, color: 'text-amber-400' },
    { id: DashboardTab.TUTORIALS, label: 'Training', icon: BrainIcon, color: 'text-emerald-400' },
    { id: DashboardTab.DEFENSE, label: 'Defense Protocol', icon: ShieldIcon, color: 'text-rose-500' },
  ];

  const sidebarClasses = `
    fixed top-16 left-0 bottom-0 w-64 bg-telesco-base border-r border-white/5 z-40 transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:translate-x-0
  `;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={sidebarClasses}>
        <div className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-white/10 text-white shadow-lg shadow-black/20' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? item.color : 'currentColor'}`} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                )}
              </button>
            );
          })}
        </div>

        <div className="absolute bottom-4 left-4 right-4 p-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-slate-400 font-mono">SYSTEM ONLINE</span>
          </div>
          <p className="text-xs text-slate-500">
            Telesco v2.5.0
            <br />
            Powered by Gemini
          </p>
        </div>
      </aside>
    </>
  );
};