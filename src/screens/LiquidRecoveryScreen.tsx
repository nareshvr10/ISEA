import React, { useState } from 'react';
import { LiquidRecoveryState, Language } from '../types';
import { getTranslation } from '../utils/translations';
import { 
  Droplet, 
  AlertTriangle, 
  ShieldCheck, 
  Info, 
  CheckCircle2, 
  Activity, 
  RefreshCw,
  Sliders,
  Send
} from 'lucide-react';

interface LiquidRecoveryScreenProps {
  liquidRecovery: LiquidRecoveryState;
  lang: Language;
  onDrainTank: () => void;
}

export const LiquidRecoveryScreen: React.FC<LiquidRecoveryScreenProps> = ({
  liquidRecovery,
  lang,
  onDrainTank
}) => {
  const [isDraining, setIsDraining] = useState(false);
  const [notificationSent, setNotificationSent] = useState(false);

  const fillPercent = Math.min(100, Math.round((liquidRecovery.currentVolumeL / liquidRecovery.capacityL) * 100));

  // Determine status color: 0-70% NORMAL, 70-90% WARNING, 90%+ CRITICAL
  const statusTier = fillPercent > 90 ? 'CRITICAL' : fillPercent >= 70 ? 'WARNING' : 'NORMAL';

  const handleDrain = () => {
    setIsDraining(true);
    setTimeout(() => {
      setIsDraining(false);
      onDrainTank();
    }, 1200);
  };

  const handleSendFullNotification = () => {
    setNotificationSent(true);
    setTimeout(() => setNotificationSent(false), 3000);
  };

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h2 className="text-lg font-black text-slate-900 tracking-tight">
          {getTranslation(lang, 'liquidRecovery')}
        </h2>
        <p className="text-xs text-slate-500">
          Event Liquid Collection Tank • Residual beverage isolation system
        </p>
      </div>

      {/* Non-potable Water Quality Clarification Banner */}
      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-3.5 flex items-start gap-3 text-teal-950 text-xs">
        <Info className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-teal-900 block mb-0.5">
            Terminology &amp; Water Grade Protocol:
          </span>
          <p className="text-teal-800 leading-relaxed">
            This collection tank stores <strong>Recovered / Event Liquid</strong> separated from discarded drinkware. It is categorized as event non-potable greywater, designated strictly for hall gardening or washroom flushing, and <strong>NEVER</strong> for drinking or potable use.
          </p>
        </div>
      </div>

      {/* Main Tank Visual Gauge */}
      <div className="bg-white/85 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-white/70 hover:bg-white/95 transition-all flex flex-col sm:flex-row items-center gap-6">
        {/* Visual Tank Cylindrical Gauge */}
        <div className="relative w-28 h-56 rounded-3xl bg-slate-100 border-4 border-slate-300 overflow-hidden shadow-inner flex flex-col justify-end p-1">
          {/* Fill Animation */}
          <div 
            className={`w-full rounded-2xl transition-all duration-700 relative ${
              statusTier === 'CRITICAL'
                ? 'bg-gradient-to-t from-rose-600 to-rose-400'
                : statusTier === 'WARNING'
                ? 'bg-gradient-to-t from-amber-600 to-amber-400'
                : 'bg-gradient-to-t from-teal-700 via-teal-500 to-cyan-400'
            }`}
            style={{ height: `${fillPercent}%` }}
          >
            {/* Liquid surface wave simulation */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-white/40 rounded-full animate-pulse" />
          </div>

          {/* Scale marks */}
          <div className="absolute inset-y-2 right-2 flex flex-col justify-between text-[9px] font-mono text-slate-400 select-none pointer-events-none">
            <span>10L</span>
            <span>7.5L</span>
            <span>5.0L</span>
            <span>2.5L</span>
            <span>0L</span>
          </div>

          {/* Level Overlay Pill */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900/80 backdrop-blur-xs text-white px-2 py-1 rounded-full text-xs font-mono font-bold shadow-md">
            {fillPercent}%
          </div>
        </div>

        {/* Tank Stats & Threshold Guidelines */}
        <div className="flex-1 space-y-3 w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Current Liquid Volume
            </span>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
              statusTier === 'CRITICAL'
                ? 'bg-rose-100 text-rose-800'
                : statusTier === 'WARNING'
                ? 'bg-amber-100 text-amber-800'
                : 'bg-emerald-100 text-emerald-800'
            }`}>
              {statusTier} LEVEL
            </span>
          </div>

          <div>
            <div className="text-3xl font-black text-slate-900 font-mono tracking-tight">
              {liquidRecovery.currentVolumeL} <span className="text-sm font-bold text-slate-500">/ {liquidRecovery.capacityL} Liters</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Residual water, tea, juices &amp; cold drinks extracted prior to plastic shredding.
            </p>
          </div>

          {/* Threshold Level Legend */}
          <div className="space-y-1 text-[11px] pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-emerald-700 font-medium">0% - 70% (0.0L - 7.0L):</span>
              <span className="font-bold text-emerald-900">NORMAL OPERATION</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-amber-700 font-medium">70% - 90% (7.0L - 9.0L):</span>
              <span className="font-bold text-amber-900">WARNING (Alert Operator)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-rose-700 font-medium">90%+ (&gt; 9.0L):</span>
              <span className="font-bold text-rose-900">CRITICAL (Chute Interlock)</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleDrain}
              disabled={isDraining || liquidRecovery.currentVolumeL === 0}
              className="flex-1 py-2.5 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isDraining ? 'animate-spin' : ''}`} />
              <span>{isDraining ? 'Opening Drain Valve...' : 'Empty Tank for Hall Utility'}</span>
            </button>

            <button
              onClick={handleSendFullNotification}
              className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{notificationSent ? 'Sent!' : 'Test Tank Alert'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sensor Health Telemetry Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
        <div className="bg-white/85 backdrop-blur-md rounded-2xl p-3 border border-white/70 shadow-xs hover:bg-white/95 transition-all">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Ultrasonic Depth</span>
          <span className="font-black text-slate-900 text-sm mt-0.5 block font-mono">14.2 cm</span>
          <span className="text-[10px] text-emerald-600 font-medium">Accurate to ±1mm</span>
        </div>

        <div className="bg-white/85 backdrop-blur-md rounded-2xl p-3 border border-white/70 shadow-xs hover:bg-white/95 transition-all">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Overflow Switch</span>
          <span className="font-black text-emerald-700 text-sm mt-0.5 block">DRY (Safe)</span>
          <span className="text-[10px] text-slate-500">Optical high-level</span>
        </div>

        <div className="bg-white/85 backdrop-blur-md rounded-2xl p-3 border border-white/70 shadow-xs hover:bg-white/95 transition-all">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Drain Valve</span>
          <span className="font-black text-slate-900 text-sm mt-0.5 block">CLOSED (12V)</span>
          <span className="text-[10px] text-slate-500">Solenoid ready</span>
        </div>

        <div className="bg-white/85 backdrop-blur-md rounded-2xl p-3 border border-white/70 shadow-xs hover:bg-white/95 transition-all">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Liquid Destination</span>
          <span className="font-black text-teal-800 text-sm mt-0.5 block">Mandapam Garden</span>
          <span className="text-[10px] text-teal-600">Eco-reuse pipeline</span>
        </div>
      </div>
    </div>
  );
};
