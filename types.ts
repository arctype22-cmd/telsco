export enum ViewState {
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
}

export enum DashboardTab {
  HOME = 'HOME',
  HISTORY = 'HISTORY',
  TUTORIALS = 'TUTORIALS',
  DEFENSE = 'DEFENSE',
}

export interface User {
  username: string;
  email: string;
  avatarUrl?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface AIArticle {
  id: string;
  title: string;
  summary: string;
  category: 'history' | 'future' | 'tech' | 'safety';
  content: string;
  icon: string;
}

export enum BotPersonality {
  TUTOR = 'TUTOR', // Helpful, educational
  DEFENDER = 'DEFENDER', // Strategic, survivalist, counter-AI
}