
import React from 'react';
import { HealthRecord, UserSettings } from '../types';
import { COLORS, MOOD_EMOJIS } from '../constants';

interface DashboardProps {
  settings: UserSettings;
  latestRecord?: HealthRecord;
  biblicalMessage?: string;
  history: HealthRecord[];
}

const Dashboard: React.FC<DashboardProps> = ({ settings, latestRecord, biblicalMessage, history }) => {
  const getStatusColor = (val: number | undefined, type: string) => {
    if (!val) return 'text-gray-400';
    if (type === 'glucose') {
      if (val > 140) return 'text-red-500';
      if (val > 100) return 'text-yellow-500';
      return 'text-green-500';
    }
    return 'text-green-500';
  };

  // Calculate frequent symptoms from the last 7 days
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recentHistory = history.filter(r => r.timestamp > sevenDaysAgo);
  
  const symptomCounts = recentHistory.reduce((acc, record) => {
    record.symptoms.forEach(s => {
      acc[s] = (acc[s] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const sortedSymptoms = Object.entries(symptomCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Header Greeting */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-[#222222]">Olá, {settings.userName} 👋</h1>
          <p className="text-sm text-gray-500">Resumo da sua saúde hoje</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <img src="https://picsum.photos/seed/rafael/200" className="w-10 h-10 rounded-full border-2 border-white" alt="Avatar" />
        </div>
      </div>

      {/* Sync Status */}
      <div className="flex items-center space-x-2 px-3 py-1 bg-white/50 rounded-full w-fit soft-shadow border border-white/40">
        <div className={`w-2 h-2 rounded-full ${settings.offlineMode ? 'bg-orange-400' : 'bg-green-500'}`}></div>
        <span className="text-[10px] font-medium text-gray-600">
          {settings.offlineMode ? 'Modo Offline — Dados protegidos localmente' : 'Sincronização concluída'}
        </span>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        <MetricCard 
          icon="fa-droplet" 
          label="Glicose" 
          value={latestRecord?.glucose || '--'} 
          unit="mg/dL" 
          color={getStatusColor(latestRecord?.glucose, 'glucose')} 
        />
        <MetricCard 
          icon="fa-heart-pulse" 
          label="Pressão" 
          value={latestRecord ? `${latestRecord.pressureSystolic}/${latestRecord.pressureDiastolic}` : '--'} 
          unit="mmHg" 
          color="text-[#4A90E2]" 
        />
        <MetricCard 
          icon="fa-bolt" 
          label="Batimentos" 
          value={latestRecord?.heartRate || '--'} 
          unit="bpm" 
          color="text-red-400" 
        />
        <MetricCard 
          icon="fa-wind" 
          label="Saturação" 
          value={latestRecord?.spO2 ? `${latestRecord.spO2}%` : '--'} 
          unit="SpO2" 
          color="text-green-500" 
        />
      </div>

      {/* AI Insight Section */}
      {settings.isAiEnabled && latestRecord?.aiInsight && (
        <div className="bg-white p-5 rounded-3xl soft-shadow space-y-3 border border-blue-50">
          <div className="flex items-center justify-between">
            <span className="bg-blue-50 text-[#4A90E2] text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">Insight Observacional</span>
            <span className="text-lg">{MOOD_EMOJIS[latestRecord.mood || 'happy']}</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed italic">
            "{latestRecord.aiInsight}"
          </p>
          <p className="text-[10px] text-gray-400">Esta observação não substitui orientação médica.</p>
        </div>
      )}

      {/* Biblical Message / Council */}
      {settings.isBiblicalEnabled && biblicalMessage && (
        <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-3xl soft-shadow border border-green-100">
          <div className="flex items-center space-x-2 mb-2 text-[#7ED321]">
            <i className="fas fa-dove"></i>
            <span className="text-xs font-bold">Palavra de Conforto</span>
          </div>
          <p className="text-sm text-gray-700 font-medium">
            {biblicalMessage}
          </p>
        </div>
      )}

      {/* Mini Chart Summary Placeholder */}
      <div className="bg-white p-5 rounded-3xl soft-shadow">
        <h3 className="text-sm font-bold text-gray-700 mb-4">Tendência da Semana</h3>
        <div className="h-32 w-full bg-gray-50 rounded-2xl flex items-end justify-between px-4 pb-4">
          {[40, 60, 45, 80, 55, 70, 65].map((h, i) => (
            <div key={i} className="w-3 rounded-full bg-[#4A90E2]/20 relative">
              <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-[#4A90E2] rounded-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Frequent Symptoms Card */}
      <div className="bg-white p-5 rounded-3xl soft-shadow">
        <h3 className="text-sm font-bold text-gray-700 mb-4">Sintomas Frequentes (7 dias)</h3>
        {sortedSymptoms.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {sortedSymptoms.map(([symptom, count]) => (
              <div key={symptom} className="px-3 py-2 bg-red-50 rounded-2xl flex items-center space-x-2 border border-red-100/50">
                <span className="text-xs font-medium text-red-600">{symptom}</span>
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {count}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 italic">Nenhum sintoma registrado recentemente.</p>
        )}
      </div>
    </div>
  );
};

const MetricCard = ({ icon, label, value, unit, color }: any) => (
  <div className="bg-white p-4 rounded-3xl soft-shadow flex flex-col items-start border border-gray-50 transition-transform active:scale-95">
    <div className={`w-8 h-8 rounded-xl ${color} bg-gray-50 flex items-center justify-center mb-3`}>
      <i className={`fas ${icon}`}></i>
    </div>
    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">{label}</span>
    <div className="flex items-baseline space-x-1">
      <span className={`text-xl font-bold ${color}`}>{value}</span>
      <span className="text-[10px] text-gray-400">{unit}</span>
    </div>
  </div>
);

export default Dashboard;
