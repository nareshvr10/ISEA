import React, { useState } from 'react';
import { BinItem, WasteDetection, Language, WasteCategory } from '../types';
import { getTranslation } from '../utils/translations';
import { 
  Trash2, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  Filter, 
  CheckCircle2, 
  AlertTriangle,
  Scale,
  Clock,
  Compass
} from 'lucide-react';

interface WasteScreenProps {
  bins: BinItem[];
  recentDetections: WasteDetection[];
  lang: Language;
  onOpenUniversalInput: () => void;
}

export const WasteScreen: React.FC<WasteScreenProps> = ({
  bins,
  recentDetections,
  lang,
  onOpenUniversalInput
}) => {
  const [activeTab, setActiveTab] = useState<'BINS' | 'LOGS'>('BINS');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const filteredDetections = recentDetections.filter((d) => {
    if (categoryFilter === 'ALL') return true;
    return d.category === categoryFilter;
  });

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            {getTranslation(lang, 'binMonitoring')} &amp; AI Segregation
          </h2>
          <p className="text-xs text-slate-500">
            7 Event Waste Streams • Ultrasonic fill sensing • Optical vision logs
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('BINS')}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeTab === 'BINS' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Smart Bins (7)
          </button>
          <button
            onClick={() => setActiveTab('LOGS')}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeTab === 'LOGS' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            AI Logs
          </button>
        </div>
      </div>

      {/* Universal Input Simulator CTA */}
      <div className="p-3.5 bg-gradient-to-r from-emerald-700 to-teal-800 rounded-2xl text-white flex items-center justify-between shadow-sm">
        <div>
          <span className="font-bold text-xs block">Universal Chute Insertion</span>
          <span className="text-[11px] text-emerald-100/90">
            Simulate dropping items at different orientations with residual liquids
          </span>
        </div>
        <button
          onClick={onOpenUniversalInput}
          className="px-3.5 py-1.5 bg-white text-emerald-900 font-bold text-xs rounded-xl shadow-xs hover:bg-emerald-50 transition-colors shrink-0"
        >
          Drop Item
        </button>
      </div>

      {/* 1. BINS TAB */}
      {activeTab === 'BINS' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {bins.map((bin) => {
            const isFull = bin.fillPercentage >= 85;
            const isMedium = bin.fillPercentage >= 65;

            return (
              <div
                key={bin.id}
                className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-slate-200 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{bin.category} Bin</h3>
                    <span className="text-[11px] text-slate-500 font-mono">ID: {bin.id}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isFull ? 'bg-rose-100 text-rose-800' : isMedium ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {bin.status}
                  </span>
                </div>

                {/* Fill Progress Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>Fill Level</span>
                    <span>{bin.fillPercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isFull ? 'bg-rose-500' : isMedium ? 'bg-amber-500' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${bin.fillPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Weight Stats */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <div className="bg-slate-50 p-2 rounded-xl text-center">
                    <span className="text-[10px] text-slate-400 block font-medium">Current Weight</span>
                    <span className="font-bold text-slate-800">{bin.weightKg} kg</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl text-center">
                    <span className="text-[10px] text-slate-400 block font-medium">Capacity</span>
                    <span className="font-bold text-slate-800">{bin.capacityKg} kg</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. LOGS TAB */}
      {activeTab === 'LOGS' && (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
              AI Vision Segregation Stream
            </h3>
            {/* Filter Category */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs font-semibold bg-slate-100 border border-slate-200 rounded-lg px-2 py-1 outline-none"
            >
              <option value="ALL">All Categories</option>
              <option value="Plastic">Plastic Only</option>
              <option value="Paper">Paper</option>
              <option value="Metal">Metal</option>
              <option value="Glass">Glass</option>
              <option value="Organic">Organic</option>
              <option value="E-waste">E-waste</option>
            </select>
          </div>

          <div className="space-y-2">
            {filteredDetections.map((det) => (
              <div
                key={det.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{det.objectName}</span>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                      {det.category}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-mono font-bold">
                      {det.confidence}% Conf.
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Scale className="w-3 h-3 text-slate-400" />
                      {det.weightGrams}g
                    </span>
                    <span className="flex items-center gap-1 text-teal-700 font-semibold">
                      Liquid: {det.residualLiquidMl}ml
                    </span>
                    <span className="flex items-center gap-1">
                      <Compass className="w-3 h-3 text-slate-400" />
                      Orientation: {det.orientation}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {det.timestamp}
                    </span>
                  </div>
                </div>

                <div className="text-right sm:self-center">
                  <span className="text-[10px] font-mono text-slate-500 block">Destination:</span>
                  <span className="font-bold text-emerald-800 text-[11px] block">{det.destination}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
