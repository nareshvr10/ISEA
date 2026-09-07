import React from 'react';
import { Machine, EventItem, Language, PlasticProcessingState, LiquidRecoveryState, ReportItem, AlertItem } from '../types';
import { getTranslation } from '../utils/translations';
import { 
  Trash2, 
  Droplet, 
  Layers, 
  Cpu, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Calendar, 
  Clock, 
  MapPin, 
  Activity, 
  Wind, 
  QrCode, 
  Award,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface HomeScreenProps {
  currentMachine: Machine;
  currentEvent: EventItem;
  plasticProcessing: PlasticProcessingState;
  liquidRecovery: LiquidRecoveryState;
  alerts: AlertItem[];
  lang: Language;
  onOpenUniversalInput: () => void;
  onOpenPlasticProcessing: () => void;
  onOpenLiquidRecovery: () => void;
  onOpenReport: (type: 'DAILY' | 'WEEKLY' | 'MONTHLY') => void;
  onOpenCertificate: () => void;
  onOpenQrModal: () => void;
  onNavigateToTab: (tab: 'MACHINES' | 'WASTE' | 'ANALYTICS') => void;
  onOpenCodeExplorer: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  currentMachine,
  currentEvent,
  plasticProcessing,
  liquidRecovery,
  alerts,
  lang,
  onOpenUniversalInput,
  onOpenPlasticProcessing,
  onOpenLiquidRecovery,
  onOpenReport,
  onOpenCertificate,
  onOpenQrModal,
  onNavigateToTab,
  onOpenCodeExplorer
}) => {
  return (
    <div className="space-y-5 pb-24 animate-in fade-in duration-300">
      {/* 1. Current Event Card (Geometric Balance Emerald Hero) */}
      <div className="bg-emerald-900 rounded-3xl p-5 sm:p-6 text-white shadow-xl relative overflow-hidden border border-emerald-800/80">
        <div className="relative z-10 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                  Current Event • {currentEvent.type}
                </span>
                <span className="bg-emerald-500/20 px-2 py-0.5 rounded-lg border border-emerald-500/30 text-[10px] font-mono text-emerald-200">
                  {currentEvent.id}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {currentEvent.name}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-emerald-200/90 pt-1">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-300" />
                  {currentEvent.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-300" />
                  {currentEvent.startTime} - {currentEvent.endTime}
                </span>
                <span className="flex items-center gap-1.5 truncate max-w-xs">
                  <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                  {currentEvent.location}
                </span>
              </div>
            </div>

            <button
              onClick={onOpenQrModal}
              title="Open Event QR"
              className="p-3 rounded-2xl bg-emerald-800 text-white hover:bg-emerald-700/80 transition-all border border-emerald-700 shrink-0 flex flex-col items-center gap-1 shadow-sm"
            >
              <QrCode className="w-5 h-5 text-emerald-300" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Event QR</span>
            </button>
          </div>

          {/* Sustainability Metric Bar */}
          <div className="space-y-2 pt-1">
            <div className="flex justify-between text-xs items-center">
              <span className="text-emerald-300 font-semibold">Event Sustainability Score</span>
              <span className="font-bold text-lg text-white">
                92 <span className="text-[10px] text-emerald-400">/ 100</span>
              </span>
            </div>
            <div className="h-2 bg-emerald-950/70 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 w-[92%] rounded-full transition-all duration-500" />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 pt-1">
              <button
                onClick={onOpenCertificate}
                className="bg-white text-emerald-900 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:bg-emerald-50 transition-all"
              >
                <Award className="w-4 h-4 text-emerald-700" />
                <span>View Certificate</span>
              </button>
              <button
                onClick={onOpenQrModal}
                className="bg-emerald-800 text-white py-2.5 px-4 rounded-xl font-bold text-xs border border-emerald-700 flex items-center justify-center gap-2 hover:bg-emerald-700/90 transition-all"
              >
                <QrCode className="w-4 h-4 text-emerald-300" />
                <span>Event QR Display</span>
              </button>
            </div>
          </div>

          {/* Machine Badge subrow */}
          <div className="pt-2 border-t border-emerald-800/80 flex items-center justify-between text-xs text-emerald-300/80">
            <span className="font-mono text-[11px]">Machine: <strong>{currentMachine.id}</strong> ({currentMachine.name})</span>
            <span className="text-[10px] uppercase tracking-wider text-emerald-300">ESP32 4G Active</span>
          </div>
        </div>
      </div>

      {/* 2. Machine Status Card */}
      <div className="bg-white/85 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-white/70 shadow-sm flex items-center justify-between gap-3 hover:bg-white/95 transition-all">
        <div className="flex items-center gap-3.5">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold shadow-xs ${
            currentMachine.isOnline 
              ? 'bg-emerald-100 text-emerald-700' 
              : 'bg-rose-100 text-rose-700'
          }`}>
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-emerald-900">
                {getTranslation(lang, 'machineStatus')}: {currentMachine.isOnline ? getTranslation(lang, 'online') : getTranslation(lang, 'offline')}
              </h3>
            </div>
            <p className="text-xs text-emerald-700/70 font-medium mt-0.5">
              Chute: Standby • AI Camera: Active • Sump Drain: Nominal
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateToTab('MACHINES')}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 hover:underline"
        >
          <span>Diagnostics</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3. Four Major KPI Cards (Geometric Balance Clean Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Waste */}
        <div className="bg-white/85 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-white/70 flex flex-col justify-between hover:bg-white/95 transition-all">
          <div>
            <p className="text-[10px] font-bold text-emerald-800/50 uppercase mb-1 tracking-wider">
              {getTranslation(lang, 'totalWaste')}
            </p>
            <p className="text-2xl font-bold text-emerald-900 tracking-tight">
              {currentMachine.totalWasteKg} <span className="text-sm font-medium text-slate-500">kg</span>
            </p>
          </div>
          <div className="mt-3">
            <div className="h-1 w-full bg-emerald-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${Math.min(100, Math.round((currentMachine.totalWasteKg / 30) * 100))}%` }}
              />
            </div>
            <span className="text-[10px] text-emerald-700/60 block mt-1 font-medium">All 7 categories</span>
          </div>
        </div>

        {/* Plastic Collected */}
        <div className="bg-white/85 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-white/70 flex flex-col justify-between hover:bg-white/95 transition-all">
          <div>
            <p className="text-[10px] font-bold text-emerald-800/50 uppercase mb-1 tracking-wider">
              {getTranslation(lang, 'plastic')}
            </p>
            <p className="text-2xl font-bold text-emerald-900 tracking-tight">
              {currentMachine.plasticCollectedKg} <span className="text-sm font-medium text-slate-500">kg</span>
            </p>
          </div>
          <div className="mt-3">
            <div className="h-1 w-full bg-teal-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-teal-500 rounded-full transition-all"
                style={{ width: `${Math.min(100, Math.round((currentMachine.plasticCollectedKg / 20) * 100))}%` }}
              />
            </div>
            <span className="text-[10px] text-teal-700/70 block mt-1 font-medium">
              {currentMachine.bottlesCount} Btls • {currentMachine.cupsCount} Cups
            </span>
          </div>
        </div>

        {/* Plastic Shredded */}
        <div className="bg-white/85 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-white/70 flex flex-col justify-between hover:bg-white/95 transition-all">
          <div>
            <p className="text-[10px] font-bold text-emerald-800/50 uppercase mb-1 tracking-wider">
              {getTranslation(lang, 'plasticShredded')}
            </p>
            <p className="text-2xl font-bold text-emerald-900 tracking-tight">
              {currentMachine.plasticShreddedKg} <span className="text-sm font-medium text-slate-500">kg</span>
            </p>
          </div>
          <div className="mt-3">
            <div className="h-1 w-full bg-blue-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${Math.min(100, Math.round((currentMachine.plasticShreddedKg / Math.max(1, currentMachine.plasticCollectedKg)) * 100))}%` }}
              />
            </div>
            <span className="text-[10px] text-blue-700/70 block mt-1 font-medium">Dewatered &amp; clean</span>
          </div>
        </div>

        {/* Recovered Liquid */}
        <div 
          onClick={onOpenLiquidRecovery}
          className="bg-white/85 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-white/70 flex flex-col justify-between cursor-pointer hover:border-emerald-300 hover:bg-white/95 transition-all"
        >
          <div>
            <p className="text-[10px] font-bold text-emerald-800/50 uppercase mb-1 tracking-wider truncate">
              {getTranslation(lang, 'recoveredLiquid')}
            </p>
            <p className="text-2xl font-bold text-emerald-900 tracking-tight">
              {currentMachine.recoveredLiquidL} <span className="text-sm font-medium text-slate-500">L</span>
            </p>
          </div>
          <div className="mt-3">
            <div className="h-1 w-full bg-amber-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full transition-all"
                style={{ width: `${Math.min(100, Math.round((currentMachine.recoveredLiquidL / currentMachine.liquidTankCapacityL) * 100))}%` }}
              />
            </div>
            <span className="text-[10px] text-amber-800/70 block mt-1 font-medium">
              Tank: {((currentMachine.recoveredLiquidL / currentMachine.liquidTankCapacityL) * 100).toFixed(0)}% full
            </span>
          </div>
        </div>
      </div>

      {/* 4. Quick Reports Navigation Bar (Geometric Balance Report Center) */}
      <div className="bg-white/85 backdrop-blur-md rounded-3xl p-5 border border-white/70 shadow-sm hover:bg-white/95 transition-all">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-emerald-800/50 uppercase tracking-widest">Report Center</p>
              <h3 className="font-bold text-sm text-emerald-900">
                {getTranslation(lang, 'reports')} • Instant PDF Generator
              </h3>
            </div>
          </div>
          <button
            onClick={onOpenCertificate}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-100"
          >
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>Green Certificate</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            onClick={() => onOpenReport('DAILY')}
            className="p-3 rounded-2xl border border-emerald-100 hover:bg-emerald-50/80 text-left transition-all flex items-center justify-between group shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                D
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-900 block group-hover:text-emerald-700">
                  Daily Event Summary
                </span>
                <span className="text-[10px] text-emerald-600/80 block">Single Shift Audit</span>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => onOpenReport('WEEKLY')}
            className="p-3 rounded-2xl border border-teal-100 hover:bg-teal-50/80 text-left transition-all flex items-center justify-between group shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs">
                W
              </div>
              <div>
                <span className="text-xs font-bold text-teal-900 block group-hover:text-teal-700">
                  Weekly Report
                </span>
                <span className="text-[10px] text-teal-600/80 block">Aggregated Telemetry</span>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-teal-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => onOpenReport('MONTHLY')}
            className="p-3 rounded-2xl border border-emerald-100 hover:bg-emerald-50/80 text-left transition-all flex items-center justify-between group shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                M
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-900 block group-hover:text-emerald-700">
                  Monthly Audit
                </span>
                <span className="text-[10px] text-emerald-600/80 block">Fleet ESG Report</span>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* 5. Critical Engineering Workflow Callout & Universal Waste Input Drop Action */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 rounded-3xl p-5 sm:p-6 text-white shadow-md border border-emerald-800/70 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
              {getTranslation(lang, 'universalInput')}
            </span>
          </div>
          <h4 className="text-base font-bold text-white">
            Drop Bottles, Cups &amp; Food Packs in Any Orientation
          </h4>
          <p className="text-xs text-emerald-200/80 max-w-lg">
            Universal Chute: Free liquids drain first into the 10L Event Liquid Tank, followed by dewatering, thermal drying, and twin-shaft shredding.
          </p>
        </div>

        <button
          onClick={onOpenUniversalInput}
          className="w-full sm:w-auto px-5 py-2.5 bg-white text-emerald-900 font-bold text-xs rounded-xl shadow-sm hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <span>Test Universal Drop</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 6. Plastic Processing Live Progress Card */}
      <div 
        onClick={onOpenPlasticProcessing}
        className="bg-white/85 backdrop-blur-md rounded-3xl p-5 border border-white/70 shadow-sm cursor-pointer hover:border-emerald-300 hover:bg-white/95 transition-all"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] font-bold text-emerald-800/50 uppercase tracking-widest mb-0.5">Sequential Stages</p>
            <h3 className="font-bold text-sm text-emerald-900">
              {getTranslation(lang, 'plasticProcessing')} Pipeline
            </h3>
            <p className="text-xs text-emerald-700/60 font-medium">
              Liquid Separation &rarr; Dewatering &rarr; Drying &rarr; Shredding &rarr; Storage
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-100">
            <span>Detail View</span>
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>

        {/* Steps Pipeline Tracker */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-100">
            <span className="text-[10px] text-emerald-700 block font-semibold">1. Liquid Drain</span>
            <span className="font-bold text-emerald-900 text-[11px]">COMPLETE</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-100">
            <span className="text-[10px] text-emerald-700 block font-semibold">2. Dewatering</span>
            <span className="font-bold text-emerald-900 text-[11px]">COMPLETE</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200">
            <span className="text-[10px] text-amber-700 block font-semibold">3. Drying</span>
            <span className="font-bold text-amber-900 text-[11px]">RUNNING</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block font-semibold">4. Shredding</span>
            <span className="font-bold text-slate-700 text-[11px]">WAITING</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block font-semibold">5. Weighing</span>
            <span className="font-bold text-slate-700 text-[11px]">WAITING</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <span className="text-[10px] text-emerald-700 block font-semibold">6. Storage</span>
            <span className="font-bold text-emerald-800 text-[11px]">READY</span>
          </div>
        </div>
      </div>

      {/* 7. Smart Bin Monitoring Summary */}
      <div className="bg-white/85 backdrop-blur-md rounded-3xl p-5 border border-white/70 shadow-sm hover:bg-white/95 transition-all">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] font-bold text-emerald-800/50 uppercase tracking-widest mb-0.5">Sensors &amp; Fill Levels</p>
            <h3 className="font-bold text-sm text-emerald-900">
              {getTranslation(lang, 'binMonitoring')}
            </h3>
          </div>
          <button
            onClick={() => onNavigateToTab('WASTE')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-100"
          >
            <span>All Bins</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {currentMachine.bins.slice(0, 4).map((bin) => (
            <div key={bin.id} className="p-3 rounded-2xl bg-emerald-50/30 border border-emerald-100/70 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-900 text-xs">{bin.category}</span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                  bin.status === 'NORMAL' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {bin.status}
                </span>
              </div>
              <div className="mt-3 space-y-1.5">
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-600 transition-all"
                    style={{ width: `${bin.fillPercentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-emerald-800/70 font-mono">
                  <span>{bin.fillPercentage}% Full</span>
                  <span>{bin.weightKg} kg</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Recent Alerts & Android Architecture Inspector Quick Access */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Alerts Card */}
        <div className="bg-white/85 backdrop-blur-md rounded-3xl p-5 border border-white/70 shadow-sm space-y-3 hover:bg-white/95 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-900">
                {getTranslation(lang, 'recentAlerts')}
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-700/60 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
              Live IoT
            </span>
          </div>

          <div className="space-y-2">
            {alerts.slice(0, 2).map((alt) => (
              <div key={alt.id} className="p-3 bg-emerald-50/40 rounded-2xl border border-emerald-100/70 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-950">{alt.title}</span>
                  <span className="text-[10px] text-slate-400">{alt.timestamp}</span>
                </div>
                <p className="text-[11px] text-emerald-800/70 mt-1 line-clamp-1">{alt.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Android Native Kotlin Codebase Inspector Card */}
        <div className="bg-emerald-950 rounded-3xl p-5 text-white shadow-md border border-emerald-900 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-300">
                Android Jetpack Compose Codebase
              </h3>
            </div>
            <p className="text-xs text-emerald-100/70 leading-relaxed">
              Clean MVVM • Repository Pattern • Firebase Realtime Database • Scoped Storage PDF
            </p>
          </div>

          <button
            onClick={onOpenCodeExplorer}
            className="mt-4 py-2.5 px-4 bg-emerald-800/80 hover:bg-emerald-700 text-white border border-emerald-700 font-bold text-xs rounded-xl transition-all flex items-center justify-between"
          >
            <span>Inspect Kotlin Project Files</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
