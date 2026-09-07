import React, { useState } from 'react';
import { EnvironmentalImpact, Language, ReportItem } from '../types';
import { getTranslation } from '../utils/translations';
import { 
  BarChart3, 
  TrendingUp, 
  Leaf, 
  Droplet, 
  FileText, 
  Download, 
  Share2, 
  Award, 
  Layers, 
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface AnalyticsScreenProps {
  impact: EnvironmentalImpact;
  lang: Language;
  onOpenReport: (type: 'DAILY' | 'WEEKLY' | 'MONTHLY') => void;
  onOpenCertificate: () => void;
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({
  impact,
  lang,
  onOpenReport,
  onOpenCertificate
}) => {
  const [timeFilter, setTimeFilter] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM'>('DAILY');

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            {getTranslation(lang, 'analytics')} &amp; ESG Reports
          </h2>
          <p className="text-xs text-slate-500">
            ESG Event Sustainability Metrics • Real-time Diverted Mass
          </p>
        </div>

        {/* Certificate Button */}
        <button
          onClick={onOpenCertificate}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
        >
          <Award className="w-3.5 h-3.5" />
          <span>Green Certificate</span>
        </button>
      </div>

      {/* Time Range Filter Bar */}
      <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
        {(['DAILY', 'WEEKLY', 'MONTHLY', 'CUSTOM'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTimeFilter(t)}
            className={`flex-1 py-1 rounded-lg transition-all ${
              timeFilter === t ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Sustainability Score Hero Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white p-5 shadow-md flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 bg-emerald-900/40 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
            Event Eco Score
          </span>
          <h3 className="text-lg font-black tracking-tight">
            ISEA Green Hall Certification Grade: A+
          </h3>
          <p className="text-xs text-emerald-100/90 max-w-sm">
            Zero direct liquid in shredder protocol verified. High segregation purity achieved.
          </p>
        </div>

        <div className="text-center pl-4 border-l border-emerald-600/40 shrink-0">
          <div className="text-3xl sm:text-4xl font-black text-emerald-300 font-mono">
            {impact.sustainabilityScore}
          </div>
          <span className="text-[10px] uppercase font-bold text-emerald-200">Out of 100</span>
        </div>
      </div>

      {/* Environmental Impact Quadrant */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-emerald-700 mb-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Plastic Diverted</span>
            <Layers className="w-4 h-4" />
          </div>
          <span className="text-xl font-black text-slate-900 block font-mono">
            {impact.plasticDivertedKg} kg
          </span>
          <span className="text-[10px] text-slate-500">From municipal landfills</span>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-teal-700 mb-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">CO₂ Avoided</span>
            <Leaf className="w-4 h-4" />
          </div>
          <span className="text-xl font-black text-slate-900 block font-mono">
            {impact.co2AvoidedKg} kg
          </span>
          <span className="text-[10px] text-slate-500">Equivalent greenhouse gas</span>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-teal-700 mb-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Liquid Saved</span>
            <Droplet className="w-4 h-4" />
          </div>
          <span className="text-xl font-black text-teal-800 block font-mono">
            {impact.recoveredLiquidL} L
          </span>
          <span className="text-[10px] text-slate-500">Event greywater harvested</span>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-emerald-700 mb-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Bottles &amp; Cups</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xl font-black text-slate-900 block font-mono">
            {impact.bottlesProcessed + impact.cupsProcessed}
          </span>
          <span className="text-[10px] text-slate-500">Items processed &amp; shredded</span>
        </div>
      </div>

      {/* Reports Actions Bar (View, Download, Share) */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
          Official Audit Reports (PDF)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <button
            onClick={() => onOpenReport('DAILY')}
            className="p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 text-left transition-all flex items-center justify-between"
          >
            <div>
              <span className="font-bold text-emerald-900 block">Daily Report PDF</span>
              <span className="text-[10px] text-emerald-700">Single event day summary</span>
            </div>
            <FileText className="w-4 h-4 text-emerald-700" />
          </button>

          <button
            onClick={() => onOpenReport('WEEKLY')}
            className="p-3 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200/80 text-left transition-all flex items-center justify-between"
          >
            <div>
              <span className="font-bold text-teal-900 block">Weekly Report PDF</span>
              <span className="text-[10px] text-teal-700">Multi-day wedding/function</span>
            </div>
            <FileText className="w-4 h-4 text-teal-700" />
          </button>

          <button
            onClick={() => onOpenReport('MONTHLY')}
            className="p-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200/80 text-left transition-all flex items-center justify-between"
          >
            <div>
              <span className="font-bold text-blue-900 block">Monthly Audit PDF</span>
              <span className="text-[10px] text-blue-700">Full mandapam ESG audit</span>
            </div>
            <FileText className="w-4 h-4 text-blue-700" />
          </button>
        </div>
      </div>

      {/* Waste Category Distribution */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
          Event Waste Breakdown Distribution
        </h3>

        <div className="space-y-2 text-xs">
          <div>
            <div className="flex items-center justify-between mb-1 font-semibold text-slate-700">
              <span>Plastic (Bottles, Cups, Cutlery)</span>
              <span>63.5% (9.4 kg)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full" style={{ width: '63.5%' }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1 font-semibold text-slate-700">
              <span>Paper (Cups, Plates, Napkins)</span>
              <span>18.2% (2.7 kg)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '18.2%' }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1 font-semibold text-slate-700">
              <span>Organic (Food residues)</span>
              <span>10.1% (1.5 kg)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '10.1%' }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1 font-semibold text-slate-700">
              <span>Metal &amp; Aluminium Cans</span>
              <span>5.4% (0.8 kg)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-slate-600 rounded-full" style={{ width: '5.4%' }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1 font-semibold text-slate-700">
              <span>Glass &amp; E-waste</span>
              <span>2.8% (0.4 kg)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: '2.8%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
