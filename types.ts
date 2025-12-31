
export type Mood = 'happy' | 'neutral' | 'sad' | 'angry' | 'sick';

export interface HealthRecord {
  id: string;
  timestamp: number;
  glucose?: number; // mg/dL
  pressureSystolic?: number;
  pressureDiastolic?: number;
  heartRate?: number; // bpm
  spO2?: number; // %
  temperature?: number; // °C
  mood: Mood;
  symptoms: string[];
  notes?: string;
  aiInsight?: string;
}

export enum AppTab {
  DASHBOARD = 'dashboard',
  STATS = 'stats',
  HISTORY = 'history',
  SETTINGS = 'settings'
}

export interface UserSettings {
  userName: string;
  isAiEnabled: boolean;
  isBiblicalEnabled: boolean;
  isPremium: boolean;
  offlineMode: boolean;
  theme: 'light' | 'dark';
}
