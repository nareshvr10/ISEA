import React from 'react';
import { PlasticProcessingState, Language } from '../types';
import { getTranslation } from '../utils/translations';
import { 
  Wind, 
  Droplet, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCw, 
  Layers, 
  Scale, 
  Box, 
  Gauge, 
  Thermometer, 
  ShieldCheck,
  Flame
} from 'lucide-react';

interface PlasticProcessingScreenProps {
  plasticProcessing: PlasticProcessingState;
  lang: Language;
  onOpenUniversalInput: () => void;
}

export const PlasticProcessingScreen: React.FC<PlasticProcessingScreenProps> = ({
  plasticProcessing,
  lang,
  onOpenUniversalInput
}) => {
  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-300">
      {/* Title & Subtitle */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            {getTranslation(lang, 'plasticProcessing')}
          </h2>
          <p className="text-xs text-slate-500">
            Dewatering, thermal drying &amp; twin-shaft rotary shredding
          </p>
        </div>
        <button
          onClick={onOpenUniversalInput}
          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
        >
          Test Batch Run
        </button>
      </div>

      {/* Critical Engineering Rule Banner */}
      <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-2xl p-3.5 flex items-start gap-3 text-amber-950">
        <div className="p-2 bg-amber-500/20 text-amber-800 rounded-xl shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-0.5 text-xs">
          <h4 className="font-bold text-amber-900">
            CRITICAL ENGINEERING PROTOCOL ENFORCED
          </h4>
          <p className="text-amber-800/90 leading-relaxed">
            Free liquid is <strong>STRICTLY SEPARATED FIRST</strong> into the Recovered/Event Liquid Tank. Liquid is never sent directly into the conventional plastic shredder. Plastic undergoes centrifuge dewatering and thermal drying prior to rotary blade contact.
          </p>
        </div>
      </div>

      {/* Stage-by-Stage Live Visual Pipeline */}
      <div className="bg-white/85 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/70 space-y-3 hover:bg-white/95 transition-all">
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
          Sequential Physical Processing Stages
        </h3>

        <div className="space-y-2 text-xs">
          {/* 1. Liquid Separation */}
          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Liquid Separation Sump</span>
                <span className="text-[11px] text-slate-500">
                  Perforated drain chute extracted {plasticProcessing.liquidRemovedLiters}L residual beverage
                </span>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg">
              {plasticProcessing.liquidSeparation}
            </span>
          </div>

          {/* 2. Plastic Dewatering Centrifuge */}
          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Centrifugal Dewatering Unit</span>
                <span className="text-[11px] text-slate-500">
                  High-speed spin reduces surface moisture by ~94%
                </span>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg">
              {plasticProcessing.dewatering}
            </span>
          </div>

          {/* 3. Thermal Air Drying */}
          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Thermal Air Drying Chamber</span>
                <span className="text-[11px] text-slate-500">
                  48°C warm airflow drying cycle: {plasticProcessing.dryingDurationSeconds}s remaining
                </span>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg flex items-center gap-1">
              <RotateCw className="w-3 h-3 animate-spin" />
              <span>{plasticProcessing.drying}</span>
            </span>
          </div>

          {/* 4. Shredding */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Twin-Shaft Blade Shredder</span>
                <span className="text-[11px] text-slate-500">
                  Target speed: 140 RPM • Waiting for dry plastic batch release
                </span>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-slate-600 bg-slate-200 px-2.5 py-1 rounded-lg">
              {plasticProcessing.shredding}
            </span>
          </div>

          {/* 5. Load-cell Weighing */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <span className="font-bold text-slate-900 block">In-line Dynamic Weighing</span>
                <span className="text-[11px] text-slate-500">
                  Precision strain gauges auto-zeroed after liquid discharge
                </span>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-slate-600 bg-slate-200 px-2.5 py-1 rounded-lg">
              {plasticProcessing.weighing}
            </span>
          </div>

          {/* 6. Clean Flake Storage */}
          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                6
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Shredded Flake Storage Vault</span>
                <span className="text-[11px] text-slate-500">
                  Hermetically sealed event storage bin ({plasticProcessing.storageCapacityUsedPercent}% full)
                </span>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg">
              {plasticProcessing.storage}
            </span>
          </div>
        </div>
      </div>

      {/* Mechanical Telemetry Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
        <div className="bg-white/85 backdrop-blur-md rounded-2xl p-3.5 border border-white/70 shadow-xs hover:bg-white/95 transition-all">
          <span className="text-slate-400 block text-[10px] font-bold uppercase">Plastic Input Weight</span>
          <span className="text-xl font-black text-slate-900 mt-1 block">
            {plasticProcessing.inputPlasticWeightKg} kg
          </span>
          <span className="text-[10px] text-slate-500">Raw bottles &amp; cups</span>
        </div>

        <div className="bg-white/85 backdrop-blur-md rounded-2xl p-3.5 border border-teal-200/80 shadow-xs hover:bg-white/95 transition-all">
          <span className="text-teal-700 block text-[10px] font-bold uppercase">Liquid Diverted</span>
          <span className="text-xl font-black text-teal-800 mt-1 block">
            {plasticProcessing.liquidRemovedLiters} L
          </span>
          <span className="text-[10px] text-teal-600">Saved to Event Tank</span>
        </div>

        <div className="bg-white/85 backdrop-blur-md rounded-2xl p-3.5 border border-white/70 shadow-xs hover:bg-white/95 transition-all">
          <span className="text-slate-400 block text-[10px] font-bold uppercase">Flakes Output</span>
          <span className="text-xl font-black text-emerald-800 mt-1 block">
            {plasticProcessing.shreddedOutputWeightKg} kg
          </span>
          <span className="text-[10px] text-emerald-600">Dewatered Flakes</span>
        </div>

        <div className="bg-white/85 backdrop-blur-md rounded-2xl p-3.5 border border-white/70 shadow-xs hover:bg-white/95 transition-all">
          <span className="text-slate-400 block text-[10px] font-bold uppercase">Blade Temperature</span>
          <span className="text-xl font-black text-slate-900 mt-1 block flex items-center gap-1">
            <Thermometer className="w-4 h-4 text-emerald-600" />
            {plasticProcessing.bladeTempC}°C
          </span>
          <span className="text-[10px] text-slate-500">Optimal (Limit 65°C)</span>
        </div>
      </div>
    </div>
  );
};
