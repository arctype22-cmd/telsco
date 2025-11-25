import React, { useState } from 'react';
import { LogoIcon } from './Icons';
import { User } from '../types';

interface AuthFormProps {
  onLogin: (user: User) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      onLogin({
        username: formData.username || 'Traveler',
        email: formData.email,
        avatarUrl: `https://picsum.photos/seed/${formData.username}/100/100`
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-telesco-dark">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-telesco-accent opacity-10 blur-[100px] rounded-full animate-pulse-slow"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-telesco-glow opacity-10 blur-[80px] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-telesco-accent to-telesco-glow rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-telesco-accent/20">
            <LogoIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">TELESCO</h1>
          <p className="text-slate-400 mt-2 text-center">
            {isLogin ? 'Access the Database' : 'Initiate Neural Link'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Codename</label>
              <input
                name="username"
                type="text"
                required
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-telesco-accent focus:border-transparent outline-none transition-all placeholder-slate-600"
                placeholder="Enter your alias"
                onChange={handleChange}
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Frequency (Email)</label>
            <input
              name="email"
              type="email"
              required
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-telesco-accent focus:border-transparent outline-none transition-all placeholder-slate-600"
              placeholder="user@telesco.ai"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Access Key</label>
            <input
              name="password"
              type="password"
              required
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-telesco-accent focus:border-transparent outline-none transition-all placeholder-slate-600"
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-telesco-accent to-telesco-glow hover:from-indigo-400 hover:to-purple-400 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/25 flex justify-center items-center"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              isLogin ? 'Authenticate' : 'Establish Connection'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            {isLogin ? "New to the network?" : "Already have credentials?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-telesco-accent hover:text-white font-medium underline-offset-4 hover:underline transition-colors"
            >
              {isLogin ? 'Initialize Uplink' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};