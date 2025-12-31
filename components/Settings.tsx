
import React from 'react';
import { UserSettings } from '../types';

interface SettingsProps {
  settings: UserSettings;
  setSettings: React.Dispatch<React.SetStateAction<UserSettings>>;
}

const Settings: React.FC<SettingsProps> = ({ settings, setSettings }) => {
  const toggleSetting = (key: keyof UserSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Ajustes & Privacidade</h2>

      <div className="space-y-4">
        <div className="bg-white p-5 rounded-3xl soft-shadow space-y-5">
          <SettingToggle 
            icon="fa-brain" 
            label="IA Observacional" 
            desc="Análise inteligente de padrões de saúde" 
            active={settings.isAiEnabled} 
            onToggle={() => toggleSetting('isAiEnabled')}
          />
          <SettingToggle 
            icon="fa-dove" 
            label="Mensagens de Fé" 
            desc="Versículos bíblicos e conselhos" 
            active={settings.isBiblicalEnabled} 
            onToggle={() => toggleSetting('isBiblicalEnabled')}
          />
          <SettingToggle 
            icon="fa-cloud-arrow-up" 
            label="Modo Offline" 
            desc="Priorizar armazenamento local seguro" 
            active={settings.offlineMode} 
            onToggle={() => toggleSetting('offlineMode')}
          />
        </div>

        <div className="bg-white p-5 rounded-3xl soft-shadow space-y-5">
           <div className="flex justify-between items-center">
             <div className="flex items-center space-x-3">
               <i className="fas fa-book-medical text-gray-400"></i>
               <span className="text-sm font-medium">Protocolos de Referência</span>
             </div>
             <span className="text-xs font-bold text-[#4A90E2]">ADA / SBC</span>
           </div>
           <div className="flex justify-between items-center">
             <div className="flex items-center space-x-3">
               <i className="fas fa-file-contract text-gray-400"></i>
               <span className="text-sm font-medium">Privacidade & LGPD</span>
             </div>
             <i className="fas fa-chevron-right text-gray-300 text-xs"></i>
           </div>
        </div>

        <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
           <div className="flex items-center space-x-2 text-red-500 mb-2">
             <i className="fas fa-circle-exclamation"></i>
             <span className="text-xs font-bold uppercase tracking-wide">Aviso Importante</span>
           </div>
           <p className="text-[11px] text-red-800 leading-tight">
             O GTRACK não realiza diagnósticos médicos. Todas as informações geradas pela IA são observacionais. Em caso de dúvida ou sintomas graves, consulte imediatamente um médico.
           </p>
        </div>

        <div className="text-center py-4">
           <span className="text-[10px] text-gray-400 font-medium">Versão 2.4.0 • GTRACK Health Solutions</span>
        </div>
      </div>
    </div>
  );
};

const SettingToggle = ({ icon, label, desc, active, onToggle }: any) => (
  <div className="flex justify-between items-center">
    <div className="flex items-start space-x-4">
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${active ? 'bg-[#4A90E2]/10 text-[#4A90E2]' : 'bg-gray-50 text-gray-300'}`}>
        <i className={`fas ${icon}`}></i>
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-700">{label}</h4>
        <p className="text-[10px] text-gray-400">{desc}</p>
      </div>
    </div>
    <button 
      onClick={onToggle}
      className={`w-12 h-6 rounded-full relative transition-colors ${active ? 'bg-[#4A90E2]' : 'bg-gray-200'}`}
    >
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${active ? 'left-7' : 'left-1'}`}></div>
    </button>
  </div>
);

export default Settings;
