
import React from 'react';
import { AppTab, UserSettings } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  settings: UserSettings;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, settings }) => {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#F5F5F5] overflow-hidden border-x border-gray-100 shadow-2xl relative">
      {/* Top Status Bar Simulator */}
      <div className="px-4 py-2 flex justify-between items-center text-xs text-gray-400 bg-white/50">
        <span>09:41</span>
        <div className="flex space-x-2">
          <i className="fas fa-signal"></i>
          <i className="fas fa-wifi"></i>
          <i className="fas fa-battery-full"></i>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-24 hide-scrollbar">
        {children}
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 px-6 py-4 flex justify-between items-center soft-shadow rounded-t-3xl">
        <button 
          onClick={() => onTabChange(AppTab.DASHBOARD)}
          className={`flex flex-col items-center space-y-1 ${activeTab === AppTab.DASHBOARD ? 'text-[#4A90E2]' : 'text-gray-400'}`}
        >
          <i className="fas fa-home text-xl"></i>
          <span className="text-[10px] font-medium">Início</span>
        </button>
        <button 
          onClick={() => onTabChange(AppTab.STATS)}
          className={`flex flex-col items-center space-y-1 ${activeTab === AppTab.STATS ? 'text-[#4A90E2]' : 'text-gray-400'}`}
        >
          <i className="fas fa-chart-line text-xl"></i>
          <span className="text-[10px] font-medium">Gráficos</span>
        </button>
        
        {/* Floating Action Button for Add Record */}
        <div className="relative -top-10">
          <button 
            onClick={() => (window as any).openAddModal()}
            className="w-14 h-14 bg-[#4A90E2] text-white rounded-2xl flex items-center justify-center soft-shadow hover:scale-105 transition-transform"
          >
            <i className="fas fa-plus text-2xl"></i>
          </button>
        </div>

        <button 
          onClick={() => onTabChange(AppTab.HISTORY)}
          className={`flex flex-col items-center space-y-1 ${activeTab === AppTab.HISTORY ? 'text-[#4A90E2]' : 'text-gray-400'}`}
        >
          <i className="fas fa-history text-xl"></i>
          <span className="text-[10px] font-medium">Histórico</span>
        </button>
        <button 
          onClick={() => onTabChange(AppTab.SETTINGS)}
          className={`flex flex-col items-center space-y-1 ${activeTab === AppTab.SETTINGS ? 'text-[#4A90E2]' : 'text-gray-400'}`}
        >
          <i className="fas fa-cog text-xl"></i>
          <span className="text-[10px] font-medium">Ajustes</span>
        </button>
      </div>
    </div>
  );
};

export default Layout;
