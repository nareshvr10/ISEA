import React, { useState } from 'react';
import { Machine, Language, HealthStatus } from '../types';
import { getTranslation } from '../utils/translations';
import { 
  Server, 
  MapPin, 
  Activity, 
  Wifi, 
  Power, 
  Camera, 
  Cpu, 
  Droplet, 
  Layers, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Map as MapIcon,
  ListFilter,
  Sliders,
  RotateCw
} from 'lucide-react';

interface MachinesScreenProps {
  machines: Machine[];
  selectedMachineId: string;
  onSelectMachine: (id: string) => void;
  lang: Language;
  onOpenUniversalInput: () => void;
}

export const MachinesScreen: React.FC<MachinesScreenProps> = ({
  machines,
  selectedMachineId,
  onSelectMachine,
  lang,
  onOpenUniversalInput
}) => {
  const [viewMode, setViewMode] = useState<'LIST' | 'MAP' | 'DIAGNOSTICS'>('LIST');
  const [filter, setFilter] = useState<'ALL' | 'ONLINE' | 'WARNING'>('ALL');
  const [diagnosticFilter, setDiagnosticFilter] = useState<string | null>(null);

  const activeMachine = machines.find((m) => m.id === selectedMachineId) || machines[0];

  const filteredMachines = machines.filter((m) => {
    if (filter === 'ONLINE') return m.isOnline;
    if (filter === 'WARNING') return m.status === 'WARNING';
    return true;
  });

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-300">
      {/* Header & Subtitle */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            {getTranslation(lang, 'machines')} Management
          </h2>
          <p className="text-xs text-slate-500">
            Event-Side Smart Recycling Kiosk Fleet • IoT ESP32 Telemetry
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setViewMode('LIST')}
            className={`px-3 py-1 rounded-lg transition-all ${
              viewMode === 'LIST' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            List
          </button>
          <button
            onClick={() => setViewMode('MAP')}
            className={`px-3 py-1 rounded-lg transition-all ${
              viewMode === 'MAP' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Live Map
          </button>
          <button
            onClick={() => setViewMode('DIAGNOSTICS')}
            className={`px-3 py-1 rounded-lg transition-all ${
              viewMode === 'DIAGNOSTICS' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Diagnostics
          </button>
        </div>
      </div>

      {/* 1. MAP VIEW */}
      {viewMode === 'MAP' && (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-emerald-50 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapIcon className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-950">
                Live Geographic Kiosk Deployments
              </h3>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-bold">
              <span className="flex items-center gap-1 text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Online
              </span>
              <span className="flex items-center gap-1 text-amber-700">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Warning / High Level
              </span>
              <span className="flex items-center gap-1 text-rose-700">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Critical / Offline
              </span>
            </div>
          </div>

          {/* Simulated Interactive Map Canvas */}
          <div className="relative w-full h-80 rounded-2xl bg-slate-950 overflow-hidden border border-emerald-900/30 shadow-inner flex items-center justify-center p-4">
            {/* Grid styling mimicking dark-mode satellite / terrain map */}
            <div 
              className="absolute inset-0 opacity-25 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" 
            />

            {/* Render Machine Markers on map */}
            {machines.map((m, index) => {
              const isSelected = m.id === selectedMachineId;
              const markerColor = !m.isOnline 
                ? 'bg-rose-500 text-rose-100 border-rose-300' 
                : m.status === 'WARNING' 
                ? 'bg-amber-500 text-amber-100 border-amber-300' 
                : 'bg-emerald-500 text-emerald-100 border-emerald-300';

              // Positioning offsets for the 3 machines
              const positions = [
                { top: '35%', left: '28%' },
                { top: '55%', left: '60%' },
                { top: '25%', left: '72%' }
              ];
              const pos = positions[index % positions.length];

              return (
                <div
                  key={m.id}
                  style={{ top: pos.top, left: pos.left }}
                  onClick={() => onSelectMachine(m.id)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all z-20 group`}
                >
                  <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 shadow-lg ${markerColor} ${
                    isSelected ? 'ring-4 ring-white scale-125' : 'hover:scale-110'
                  }`}>
                    <Server className="w-4 h-4 text-white" />
                    <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  </div>

                  {/* Marker Tooltip */}
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white text-[10px] font-sans px-2.5 py-1.5 rounded-xl whitespace-nowrap shadow-xl border border-slate-700 pointer-events-none opacity-90 group-hover:opacity-100 z-30">
                    <p className="font-bold text-emerald-300">{m.name}</p>
                    <p className="text-[9px] text-slate-300">{m.eventName}</p>
                    <p className="text-[8px] font-mono text-slate-400">Waste: {m.totalWasteKg}kg • Liq: {m.recoveredLiquidL}L</p>
                  </div>
                </div>
              );
            })}

            {/* Map Legend Overlay */}
            <div className="absolute bottom-3 left-3 bg-slate-900/90 text-white text-[10px] px-3 py-1.5 rounded-xl border border-slate-800 backdrop-blur-xs">
              <span className="font-bold text-emerald-400">GPS Coverage:</span> Chennai &amp; Coimbatore Event Centers
            </div>
          </div>

          {/* Active selected machine summary card under map */}
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-emerald-950 block">{activeMachine.name} ({activeMachine.id})</span>
              <span className="text-[11px] text-emerald-800">{activeMachine.eventName} • {activeMachine.address}</span>
            </div>
            <button
              onClick={() => setViewMode('DIAGNOSTICS')}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer"
            >
              Open Diagnostics
            </button>
          </div>
        </div>
      )}

      {/* 2. LIST VIEW */}
      {viewMode === 'LIST' && (
        <div className="space-y-3">
          {/* Quick Filters */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                filter === 'ALL' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              All Kiosks ({machines.length})
            </button>
            <button
              onClick={() => setFilter('ONLINE')}
              className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                filter === 'ONLINE' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              Online Only
            </button>
            <button
              onClick={() => setFilter('WARNING')}
              className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                filter === 'WARNING' ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              Warnings / Tanks
            </button>
          </div>

          {/* Machine Cards */}
          <div className="space-y-3">
            {filteredMachines.map((m) => {
              const isSelected = m.id === selectedMachineId;
              return (
                <div
                  key={m.id}
                  onClick={() => onSelectMachine(m.id)}
                  className={`bg-white rounded-3xl p-5 shadow-sm border transition-all cursor-pointer ${
                    isSelected ? 'border-emerald-600 ring-2 ring-emerald-500/20' : 'border-emerald-50 hover:border-emerald-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-slate-900">{m.name}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          m.isOnline ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {m.isOnline ? 'ONLINE' : 'OFFLINE'}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">ID: {m.id}</span>
                      </div>
                      <p className="text-xs text-emerald-700 font-medium mt-0.5">{m.eventName}</p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {m.address}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectMachine(m.id);
                        setViewMode('DIAGNOSTICS');
                      }}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
                    >
                      <span>Diagnostics</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Telemetry Status Bar */}
                  <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-emerald-50 text-center text-xs">
                    <div className="bg-emerald-50/50 p-2.5 rounded-2xl border border-emerald-50">
                      <span className="text-[10px] text-emerald-800/50 uppercase font-bold block mb-0.5">Total Waste</span>
                      <span className="font-bold text-slate-900">{m.totalWasteKg} kg</span>
                    </div>
                    <div className="bg-teal-50/50 p-2.5 rounded-2xl border border-teal-50">
                      <span className="text-[10px] text-teal-800/50 uppercase font-bold block mb-0.5">Plastic Shrd</span>
                      <span className="font-bold text-emerald-700">{m.plasticShreddedKg} kg</span>
                    </div>
                    <div className="bg-blue-50/50 p-2.5 rounded-2xl border border-blue-50">
                      <span className="text-[10px] text-blue-800/50 uppercase font-bold block mb-0.5">Event Liq</span>
                      <span className="font-bold text-teal-700">{m.recoveredLiquidL} L</span>
                    </div>
                    <div className="bg-amber-50/50 p-2.5 rounded-2xl border border-amber-50">
                      <span className="text-[10px] text-amber-800/50 uppercase font-bold block mb-0.5">Liquid Tank</span>
                      <span className="font-bold text-slate-900">{((m.recoveredLiquidL / m.liquidTankCapacityL) * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. DIAGNOSTICS & HEALTH CHECK VIEW (All 13 Modules) */}
      {viewMode === 'DIAGNOSTICS' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-emerald-50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-sm text-emerald-950">
                  Comprehensive 13-Point Hardware Diagnostic Health Check
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Target: {activeMachine.name} ({activeMachine.id}) • Telemetry refresh rate: 2000ms
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                System Healthy
              </span>
            </div>

            {/* 13 Diagnostic Modules Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {activeMachine.healthChecks.map((hc, idx) => {
                const isNormal = hc.status === 'NORMAL';
                const isWarning = hc.status === 'WARNING';
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-emerald-50/40 border border-emerald-100/60 flex items-start justify-between gap-2"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] text-emerald-700/60 font-bold">{idx + 1}.</span>
                        <span className="font-bold text-emerald-950">{hc.component}</span>
                      </div>
                      <p className="text-[11px] text-slate-500">{hc.message}</p>
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-lg shrink-0 ${
                      isNormal 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : isWarning 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {hc.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
