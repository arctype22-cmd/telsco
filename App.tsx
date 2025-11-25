import React, { useState } from 'react';
import { AuthForm } from './components/AuthForm';
import { TopNav } from './components/Nav';
import { Sidebar } from './components/Sidebar';
import { ContentFeed } from './components/ContentFeed';
import { ChatInterface } from './components/ChatInterface';
import { User, ViewState, DashboardTab, BotPersonality } from './types';

export default function App() {
  const [view, setView] = useState<ViewState>(ViewState.AUTH);
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<DashboardTab>(DashboardTab.HOME);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setView(ViewState.DASHBOARD);
  };

  const renderContent = () => {
    switch (activeTab) {
      case DashboardTab.HOME:
        return <ContentFeed />;
      case DashboardTab.HISTORY:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-4">Origins of Intelligence</h2>
            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
               <p className="text-slate-300 mb-4">
                 Explore the timeline from Turing's machines to modern Transformers. 
                 Use the Tutor Chat to ask specific questions about historical events.
               </p>
            </div>
            <ChatInterface mode={BotPersonality.TUTOR} />
          </div>
        );
      case DashboardTab.TUTORIALS:
         return (
          <div className="space-y-6">
             <h2 className="text-3xl font-bold text-white mb-4">Neural Training Grounds</h2>
             <p className="text-slate-400">Master the tools of tomorrow. Ask Telesco for prompts, code snippets, or configuration guides.</p>
             <ChatInterface mode={BotPersonality.TUTOR} />
          </div>
         )
      case DashboardTab.DEFENSE:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-rose-500 mb-4">Human Defense Protocol</h2>
             <div className="bg-rose-950/20 border border-rose-900/30 rounded-2xl p-6">
               <p className="text-rose-200 mb-4 font-mono text-sm">
                 WARNING: You are entering a restricted zone. The AI Advisor here is configured for survival strategy.
               </p>
            </div>
            <ChatInterface mode={BotPersonality.DEFENDER} />
          </div>
        );
      default:
        return <ContentFeed />;
    }
  };

  if (view === ViewState.AUTH) {
    return <AuthForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-telesco-dark text-slate-100 font-sans">
      {user && (
        <TopNav 
          user={user} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
      )}
      
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="lg:ml-64 pt-20 px-4 md:px-8 pb-8 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}