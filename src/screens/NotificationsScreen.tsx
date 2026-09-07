import React, { useState } from 'react';
import { AlertItem, Language } from '../types';
import { getTranslation } from '../utils/translations';
import { Bell, ShieldAlert, CheckCircle2, AlertTriangle, ArrowLeft, Trash2 } from 'lucide-react';

interface NotificationsScreenProps {
  alerts: AlertItem[];
  lang: Language;
  onBack: () => void;
  onClearAlerts: () => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  alerts,
  lang,
  onBack,
  onClearAlerts
}) => {
  const [filter, setFilter] = useState<'ALL' | 'CRITICAL' | 'WARNING'>('ALL');

  const filteredAlerts = alerts.filter((a) => {
    if (filter === 'CRITICAL') return a.severity === 'CRITICAL';
    if (filter === 'WARNING') return a.severity === 'WARNING';
    return true;
  });

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={onClearAlerts}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-600 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Notifications</span>
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            Notifications &amp; IoT Alerts
          </h2>
          <p className="text-xs text-slate-500">
            Realtime Machine Sump, Bin Fill &amp; Motor Safety Telemetry
          </p>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 text-xs">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-3 py-1 rounded-full border transition-all ${
            filter === 'ALL' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200'
          }`}
        >
          All ({alerts.length})
        </button>
        <button
          onClick={() => setFilter('WARNING')}
          className={`px-3 py-1 rounded-full border transition-all ${
            filter === 'WARNING' ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-slate-600 border-slate-200'
          }`}
        >
          Warnings Only
        </button>
        <button
          onClick={() => setFilter('CRITICAL')}
          className={`px-3 py-1 rounded-full border transition-all ${
            filter === 'CRITICAL' ? 'bg-rose-600 text-white border-rose-600' : 'bg-white text-slate-600 border-slate-200'
          }`}
        >
          Critical
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-2.5">
        {filteredAlerts.length === 0 ? (
          <div className="p-8 text-center bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 text-slate-400 text-xs">
            No active alerts at this time. All systems operating normally.
          </div>
        ) : (
          filteredAlerts.map((alt) => {
            const isCritical = alt.severity === 'CRITICAL';
            const isWarning = alt.severity === 'WARNING';

            return (
              <div
                key={alt.id}
                className={`p-4 rounded-2xl border bg-white/95 backdrop-blur-md shadow-xs flex items-start gap-3 transition-all ${
                  isCritical
                    ? 'border-rose-300'
                    : isWarning
                    ? 'border-amber-300'
                    : 'border-slate-200'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                  isCritical ? 'bg-rose-100 text-rose-700' : isWarning ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {isCritical ? <ShieldAlert className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{alt.title}</h4>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">{alt.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{alt.message}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
