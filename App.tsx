
import React, { useState, useEffect, useCallback } from 'react';
import { AppTab, HealthRecord, UserSettings } from './types';
import { INITIAL_SETTINGS, MOCK_HISTORY } from './constants';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Stats from './components/Stats';
import History from './components/History';
import Settings from './components/Settings';
import AddRecordModal from './components/AddRecordModal';
import { generateHealthInsight, generateBiblicalMessage } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [settings, setSettings] = useState<UserSettings>(INITIAL_SETTINGS);
  const [history, setHistory] = useState<HealthRecord[]>(MOCK_HISTORY);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [biblicalMessage, setBiblicalMessage] = useState<string>('');

  // Expose global function for FAB to open modal from layout
  useEffect(() => {
    (window as any).openAddModal = () => setIsAddModalOpen(true);
    
    // Initial fetch of biblical message
    if (settings.isBiblicalEnabled) {
      generateBiblicalMessage().then(setBiblicalMessage);
    }
  }, [settings.isBiblicalEnabled]);

  const handleSaveRecord = async (newRecordData: Partial<HealthRecord>) => {
    const tempId = Math.random().toString(36).substring(7);
    const newRecord: HealthRecord = {
      ...newRecordData,
      id: tempId,
      timestamp: Date.now(),
      mood: newRecordData.mood || 'neutral',
      symptoms: newRecordData.symptoms || [],
    } as HealthRecord;

    // Ethical AI Observational Insight (if online and enabled)
    if (settings.isAiEnabled && !settings.offlineMode) {
      const insight = await generateHealthInsight(newRecord, history);
      newRecord.aiInsight = insight;
    } else if (settings.isAiEnabled) {
      newRecord.aiInsight = "Mantenha o registro diário para uma análise completa quando houver conexão.";
    }

    setHistory(prev => [newRecord, ...prev]);
    setIsAddModalOpen(false);
    
    // Switch to Dashboard if not there
    setActiveTab(AppTab.DASHBOARD);
  };

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return (
          <Dashboard 
            settings={settings} 
            latestRecord={history[0]} 
            biblicalMessage={biblicalMessage} 
            history={history}
          />
        );
      case AppTab.STATS:
        return <Stats history={history} />;
      case AppTab.HISTORY:
        return <History history={history} />;
      case AppTab.SETTINGS:
        return <Settings settings={settings} setSettings={setSettings} />;
      default:
        return (
          <Dashboard 
            settings={settings} 
            latestRecord={history[0]} 
            biblicalMessage={biblicalMessage} 
            history={history}
          />
        );
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab} settings={settings}>
      {renderContent()}
      <AddRecordModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSave={handleSaveRecord} 
      />
    </Layout>
  );
};

export default App;
