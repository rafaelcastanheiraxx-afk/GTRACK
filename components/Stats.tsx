
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { HealthRecord } from '../types';

interface StatsProps {
  history: HealthRecord[];
}

const Stats: React.FC<StatsProps> = ({ history }) => {
  const [period, setPeriod] = useState('7d');

  const chartData = history.map(h => ({
    name: new Date(h.timestamp).toLocaleDateString('pt-BR', { weekday: 'short' }),
    glicose: h.glucose,
    pressao: h.pressureSystolic,
  })).reverse();

  const pieData = [
    { name: 'Normal', value: 70, color: '#7ED321' },
    { name: 'Alerta', value: 20, color: '#FFB74D' },
    { name: 'Crítico', value: 10, color: '#E57373' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Gráficos Avançados</h2>
        <div className="bg-white px-2 py-1 rounded-full flex space-x-1 soft-shadow text-[10px] font-bold">
          {['7d', '30d', '90d', '1a'].map(p => (
            <button 
              key={p} 
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-full transition-colors ${period === p ? 'bg-[#4A90E2] text-white' : 'text-gray-400'}`}
            >
              {p}
              {p === '1a' && <i className="fas fa-crown ml-1 text-yellow-500 scale-75"></i>}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-3xl soft-shadow">
        <h3 className="text-sm font-bold text-gray-700 mb-4">Glicemia (mg/dL)</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorGlicose" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4A90E2" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                labelStyle={{ fontWeight: 'bold', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="glicose" stroke="#4A90E2" fillOpacity={1} fill="url(#colorGlicose)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-3xl soft-shadow">
          <h3 className="text-xs font-bold text-gray-500 mb-2 uppercase">Status Geral</h3>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={25} outerRadius={40} dataKey="value" stroke="none">
                  {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-3xl soft-shadow flex flex-col justify-center">
          <h3 className="text-xs font-bold text-gray-500 mb-2 uppercase">Insights Premium</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              <span className="text-[10px] text-gray-600">Sono vs Glicemia</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              <span className="text-[10px] text-gray-600">Picos Matinais</span>
            </div>
            <button className="text-[10px] font-bold text-[#4A90E2] underline mt-2">Liberar Tudo</button>
          </div>
        </div>
      </div>

      {/* Data Export Mock */}
      <div className="bg-[#4A90E2] p-6 rounded-3xl shadow-lg shadow-blue-200 text-white flex justify-between items-center">
        <div>
          <h4 className="font-bold">Relatório Mensal</h4>
          <p className="text-xs opacity-80">Gere um PDF para seu médico</p>
        </div>
        <button className="bg-white text-[#4A90E2] w-10 h-10 rounded-2xl flex items-center justify-center soft-shadow">
          <i className="fas fa-file-export"></i>
        </button>
      </div>
    </div>
  );
};

export default Stats;
