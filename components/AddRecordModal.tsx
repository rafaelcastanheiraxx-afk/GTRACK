
import React, { useState } from 'react';
import { HealthRecord, Mood } from '../types';
import { MOOD_EMOJIS, SYMPTOMS_LIST } from '../constants';

interface AddRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: Partial<HealthRecord>) => void;
}

const AddRecordModal: React.FC<AddRecordModalProps> = ({ isOpen, onClose, onSave }) => {
  const [mood, setMood] = useState<Mood>('happy');
  const [glicose, setGlicose] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [spO2, setSpO2] = useState('');
  const [temp, setTemp] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      glucose: glicose ? Number(glicose) : undefined,
      pressureSystolic: systolic ? Number(systolic) : undefined,
      pressureDiastolic: diastolic ? Number(diastolic) : undefined,
      heartRate: heartRate ? Number(heartRate) : undefined,
      spO2: spO2 ? Number(spO2) : undefined,
      temperature: temp ? Number(temp) : undefined,
      mood,
      symptoms: selectedSymptoms,
      timestamp: Date.now()
    });
    // Reset fields
    setGlicose('');
    setSystolic('');
    setDiastolic('');
    setMood('happy');
    setSelectedSymptoms([]);
    onClose();
  };

  const toggleSymptom = (s: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(s) ? prev.filter(item => item !== s) : [...prev, s]
    );
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full bg-[#F5F5F5] rounded-t-[40px] soft-shadow p-6 max-h-[90%] overflow-y-auto hide-scrollbar animate-slide-up">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
        
        <h2 className="text-xl font-bold text-gray-800 mb-6">Registrar Saúde</h2>

        <div className="space-y-6 pb-24">
          {/* Mood Selection */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest">Como você se sente?</h3>
            <div className="flex justify-between">
              {(Object.keys(MOOD_EMOJIS) as Mood[]).map((m) => (
                <button 
                  key={m}
                  onClick={() => setMood(m)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all ${mood === m ? 'bg-[#4A90E2] scale-110 shadow-lg shadow-blue-200' : 'bg-white soft-shadow opacity-60'}`}
                >
                  {MOOD_EMOJIS[m]}
                </button>
              ))}
            </div>
          </section>

          {/* Metrics Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <InputGroup icon="fa-droplet" label="Glicose" unit="mg/dL" value={glicose} onChange={setGlicose} />
            <InputGroup icon="fa-bolt" label="Pulso" unit="bpm" value={heartRate} onChange={setHeartRate} />
            <InputGroup icon="fa-heart" label="P. Sistólica" unit="mmHg" value={systolic} onChange={setSystolic} />
            <InputGroup icon="fa-heart-circle-check" label="P. Diastólica" unit="mmHg" value={diastolic} onChange={setDiastolic} />
            <InputGroup icon="fa-wind" label="SpO2" unit="%" value={spO2} onChange={setSpO2} />
            <InputGroup icon="fa-temperature-half" label="Temperatura" unit="°C" value={temp} onChange={setTemp} />
          </div>

          {/* Symptoms Checklist */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest">Sintomas</h3>
            <div className="flex flex-wrap gap-2">
              {SYMPTOMS_LIST.map(s => (
                <button 
                  key={s}
                  onClick={() => toggleSymptom(s)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${selectedSymptoms.includes(s) ? 'bg-red-500 text-white shadow-md' : 'bg-white text-gray-500'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </section>

          <button 
            onClick={handleSave}
            className="w-full py-5 bg-[#4A90E2] text-white rounded-3xl font-bold soft-shadow text-lg active:scale-95 transition-transform"
          >
            Salvar Registro
          </button>
          
          <p className="text-center text-[10px] text-gray-400 font-medium">Registro será salvo localmente no dispositivo.</p>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ icon, label, unit, value, onChange }: any) => (
  <div className="bg-white p-4 rounded-3xl soft-shadow border border-gray-50">
    <div className="flex items-center space-x-2 text-gray-400 mb-2">
      <i className={`fas ${icon} text-[10px]`}></i>
      <span className="text-[10px] font-bold uppercase tracking-wide">{label}</span>
    </div>
    <div className="flex items-center">
      <input 
        type="number" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="--" 
        className="w-full text-xl font-bold text-gray-700 outline-none bg-transparent"
      />
      <span className="text-[10px] text-gray-400 font-medium">{unit}</span>
    </div>
  </div>
);

export default AddRecordModal;
