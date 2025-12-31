
import { HealthRecord, UserSettings, AppTab } from './types';

export const COLORS = {
  primary: '#4A90E2',
  secondary: '#7ED321',
  background: '#F5F5F5',
  card: '#FFFFFF',
  danger: '#E57373',
  text: '#222222',
  warning: '#FFB74D'
};

export const INITIAL_SETTINGS: UserSettings = {
  userName: 'Rafael',
  isAiEnabled: true,
  isBiblicalEnabled: true,
  isPremium: false,
  offlineMode: true,
  theme: 'light'
};

export const MOCK_HISTORY: HealthRecord[] = [
  {
    id: '1',
    timestamp: Date.now() - 86400000 * 2,
    glucose: 95,
    pressureSystolic: 120,
    pressureDiastolic: 80,
    heartRate: 72,
    spO2: 98,
    temperature: 36.6,
    mood: 'happy',
    symptoms: [],
    aiInsight: 'Seus níveis estão excelentes hoje. Continue mantendo sua rotina ativa.'
  },
  {
    id: '2',
    timestamp: Date.now() - 86400000,
    glucose: 110,
    pressureSystolic: 130,
    pressureDiastolic: 85,
    heartRate: 78,
    spO2: 97,
    temperature: 36.8,
    mood: 'neutral',
    symptoms: ['Cansaço'],
    aiInsight: 'Notamos uma leve elevação na pressão arterial. Tente descansar e evite excesso de sal.'
  }
];

export const SYMPTOMS_LIST = [
  'Dor de cabeça',
  'Cansaço',
  'Tontura',
  'Náusea',
  'Falta de ar',
  'Dor no peito',
  'Febre',
  'Tosse'
];

export const MOOD_EMOJIS: Record<string, string> = {
  happy: '😃',
  neutral: '😐',
  sad: '😔',
  angry: '😠',
  sick: '🤒'
};
