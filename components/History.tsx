
import React from 'react';
import { HealthRecord } from '../types';
import { MOOD_EMOJIS } from '../constants';

interface HistoryProps {
  history: HealthRecord[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-gray-800">Histórico Completo</h2>
        <div className="flex space-x-2">
           <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 soft-shadow border border-gray-50">
             <i className="fas fa-filter text-xs"></i>
           </button>
           <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 soft-shadow border border-gray-50">
             <i className="fas fa-search text-xs"></i>
           </button>
        </div>
      </div>

      <div className="space-y-4">
        {history.map(record => (
          <div key={record.id} className="bg-white p-5 rounded-3xl soft-shadow border border-gray-50 flex items-start space-x-4">
            <div className="text-3xl bg-gray-50 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
              {MOOD_EMOJIS[record.mood]}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-gray-400 uppercase">
                  {new Date(record.timestamp).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </span>
                {record.aiInsight && (
                  <i className="fas fa-brain text-[#4A90E2] text-xs"></i>
                )}
              </div>
              <div className="grid grid-cols-2 gap-y-1">
                <div className="text-sm font-medium text-gray-700">Glicose: <span className="font-bold">{record.glucose}</span></div>
                <div className="text-sm font-medium text-gray-700">Pressão: <span className="font-bold">{record.pressureSystolic}/{record.pressureDiastolic}</span></div>
                <div className="text-sm font-medium text-gray-700">Pulso: <span className="font-bold">{record.heartRate}</span></div>
                <div className="text-sm font-medium text-gray-700">Temp: <span className="font-bold">{record.temperature}°C</span></div>
              </div>
              {record.symptoms.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {record.symptoms.map(s => (
                    <span key={s} className="text-[9px] px-2 py-0.5 bg-red-50 text-red-500 rounded-full font-bold">{s}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-10 pb-6 text-center">
        <p className="text-xs text-gray-400">Total de {history.length} registros guardados localmente.</p>
      </div>
    </div>
  );
};

export default History;
