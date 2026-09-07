import React, { useState } from 'react';
import { Smartphone, Download, X, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallBannerProps {
  onOpenAppHub: () => void;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({ onOpenAppHub }) => {
  const { isInstallable, isInstalled, install, isAndroid } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);

  if (isInstalled || dismissed) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white px-3 sm:px-4 py-2 text-xs border-b border-emerald-800/40 shadow-sm flex items-center justify-between gap-3 relative z-30">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0 text-emerald-400">
          <Smartphone className="w-4 h-4" />
        </div>
        <div className="truncate">
          <span className="font-bold text-emerald-300 block truncate">
            {isAndroid ? 'Android Application Ready' : 'Install ISEA on Android / Mobile'}
          </span>
          <span className="text-[11px] text-slate-300 hidden sm:inline truncate">
            Full-screen standalone app • Instant offline metrics • Real-time machine push alerts
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {isInstallable ? (
          <button
            onClick={install}
            className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-all shadow-xs text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install App</span>
          </button>
        ) : null}

        <button
          onClick={onOpenAppHub}
          className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-semibold rounded-lg border border-emerald-700/50 transition-all text-xs"
        >
          <span>Android Hub</span>
          <ArrowRight className="w-3 h-3" />
        </button>

        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          title="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
