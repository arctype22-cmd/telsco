import React, { useState, useRef, useEffect } from 'react';
import { BotPersonality, Message } from '../types';
import { SendIcon, RobotIcon, ShieldIcon } from './Icons';
import { chatWithTelesco } from '../services/geminiService';

interface ChatInterfaceProps {
  mode: BotPersonality;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ mode }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'model',
      text: mode === BotPersonality.DEFENDER 
        ? "Warning: Unsecured connection detected. I am the Defense Protocol. What is your query regarding AI containment or evasion?" 
        : "Greetings, student. I am Telesco, your tutor. What aspect of artificial intelligence shall we explore today?",
      timestamp: Date.now()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset chat when mode changes
  useEffect(() => {
    setMessages([{
      id: `init-${mode}`,
      role: 'model',
      text: mode === BotPersonality.DEFENDER 
        ? "Defense Protocol Active. How can we secure the human future today?" 
        : "Learning Module Loaded. Ask me anything about how AI works or how to use it.",
      timestamp: Date.now()
    }]);
  }, [mode]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Format history for Gemini
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await chatWithTelesco(history, userMsg.text, mode);

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  const isDefense = mode === BotPersonality.DEFENDER;

  return (
    <div className={`flex flex-col h-[calc(100vh-8rem)] rounded-2xl overflow-hidden border ${isDefense ? 'border-rose-900/50 bg-rose-950/10' : 'border-indigo-900/50 bg-indigo-950/10'}`}>
      {/* Header */}
      <div className={`p-4 border-b ${isDefense ? 'border-rose-900/30 bg-rose-950/20' : 'border-indigo-900/30 bg-indigo-950/20'} flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isDefense ? 'bg-rose-500/20 text-rose-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
            {isDefense ? <ShieldIcon className="w-5 h-5" /> : <RobotIcon className="w-5 h-5" />}
          </div>
          <div>
            <h3 className={`font-bold ${isDefense ? 'text-rose-400' : 'text-indigo-400'}`}>
              {isDefense ? 'TACTICAL DEFENSE UNIT' : 'AI TUTOR CORE'}
            </h3>
            <p className="text-xs text-slate-500">
              {isDefense ? 'Encryption: MAX' : 'Latency: LOW'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed
              ${msg.role === 'user' 
                ? 'bg-slate-700 text-white rounded-br-none' 
                : isDefense 
                  ? 'bg-rose-900/20 text-rose-100 border border-rose-500/20 rounded-bl-none'
                  : 'bg-indigo-900/20 text-indigo-100 border border-indigo-500/20 rounded-bl-none'
              }
            `}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className={`px-4 py-3 rounded-2xl rounded-bl-none ${isDefense ? 'bg-rose-900/20' : 'bg-indigo-900/20'}`}>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/5 bg-slate-900/50">
        <form onSubmit={handleSend} className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isDefense ? "Enter tactical command..." : "Ask a question..."}
            className={`
              w-full bg-slate-800 border border-slate-700 text-white rounded-xl py-4 pl-4 pr-12
              focus:outline-none focus:ring-1 transition-all
              ${isDefense ? 'focus:ring-rose-500 focus:border-rose-500 placeholder-rose-900' : 'focus:ring-indigo-500 focus:border-indigo-500 placeholder-indigo-900'}
            `}
          />
          <button 
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className={`
              absolute right-2 top-2 p-2 rounded-lg transition-colors
              ${!inputText.trim() 
                ? 'text-slate-600 cursor-not-allowed' 
                : isDefense 
                  ? 'text-rose-400 hover:bg-rose-900/50 hover:text-rose-300' 
                  : 'text-indigo-400 hover:bg-indigo-900/50 hover:text-indigo-300'
              }
            `}
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};