import React, { useEffect, useState } from 'react';
import { generateFeedContent } from '../services/geminiService';
import { AIArticle } from '../types';
import { BrainIcon, HistoryIcon, ShieldIcon, RobotIcon } from './Icons';

export const ContentFeed: React.FC = () => {
  const [articles, setArticles] = useState<AIArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchContent = async () => {
      const data = await generateFeedContent();
      if (mounted) {
        setArticles(data);
        setLoading(false);
      }
    };
    fetchContent();
    return () => { mounted = false; };
  }, []);

  const getIcon = (category: string) => {
    switch(category) {
      case 'history': return <HistoryIcon className="w-6 h-6 text-amber-400" />;
      case 'safety': return <ShieldIcon className="w-6 h-6 text-rose-400" />;
      case 'tech': return <BrainIcon className="w-6 h-6 text-emerald-400" />;
      default: return <RobotIcon className="w-6 h-6 text-indigo-400" />;
    }
  };

  const getGradient = (category: string) => {
    switch(category) {
      case 'history': return 'from-amber-500/10 to-orange-500/5 border-amber-500/20';
      case 'safety': return 'from-rose-500/10 to-red-500/5 border-rose-500/20';
      case 'tech': return 'from-emerald-500/10 to-cyan-500/5 border-emerald-500/20';
      default: return 'from-indigo-500/10 to-purple-500/5 border-indigo-500/20';
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-64 rounded-2xl bg-white/5 animate-pulse border border-white/5"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Daily Intelligence Feed</h2>
        <span className="text-xs font-mono text-slate-500 border border-slate-700 px-2 py-1 rounded">
          UPDATED: {new Date().toLocaleDateString()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <div 
            key={article.id} 
            className={`
              relative p-6 rounded-2xl border bg-gradient-to-br transition-all hover:-translate-y-1 hover:shadow-xl
              ${getGradient(article.category)}
            `}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-slate-900/50 rounded-xl">
                {getIcon(article.category)}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {article.category}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 leading-tight">
              {article.title}
            </h3>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              {article.summary}
            </p>

            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-slate-300 text-sm leading-relaxed">
                {article.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};