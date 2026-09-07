import React, { useEffect, useState } from 'react';
import { Cpu, Wifi, Leaf, Sparkles, ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
  onSkip?: () => void;
}

export function SplashScreen({ onFinish, onSkip }: SplashScreenProps) {
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState('Booting ISEA RTOS Subsystems...');

  useEffect(() => {
    const timers = [
      setTimeout(() => {
        setProgress(45);
        setStatusText('Calibrating Dual-Chute Load Cells & Level Sonar...');
      }, 500),
      setTimeout(() => {
        setProgress(75);
        setStatusText('Loading Edge AI Vision Model (98.4% Accuracy)...');
      }, 1100),
      setTimeout(() => {
        setProgress(95);
        setStatusText('Connecting to Mandapam IoT Telemetry Mesh...');
      }, 1700),
      setTimeout(() => {
        setProgress(100);
        setStatusText('All Systems Nominal. Launching Kiosk Interface...');
      }, 2300),
      setTimeout(() => {
        onFinish();
      }, 2700),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onFinish]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-6 overflow-hidden select-none">
      {/* Primary Fixed Background Image Layer preserving full composition */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700 pointer-events-none"
        style={{ backgroundImage: "url('/ecotech_bg.jpg')" }}
      >
        {/* Soft, minimal translucent overlay keeping original leaves, tech nodes, recycling symbol, wedding venue and globe visible */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.5px]" />
      </div>

      {/* Top Bar Indicator */}
      <div className="relative z-10 w-full max-w-md flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/60 shadow-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[11px] font-bold tracking-wider text-emerald-900 uppercase">
            ISEA Android Kiosk OS
          </span>
        </div>

        <button
          onClick={onSkip || onFinish}
          className="flex items-center gap-1 text-[11px] font-bold text-emerald-950 bg-white/75 hover:bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/60 shadow-xs transition-all"
        >
          <span>Skip</span>
          <ArrowRight className="w-3 h-3 text-emerald-700" />
        </button>
      </div>

      {/* Central Area: Positioned precisely in the open mint/blue sky region for maximum legibility */}
      <div className="relative z-10 w-full max-w-sm my-auto text-center">
        {/* Glassmorphic Brand Card */}
        <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/70 space-y-4">
          {/* Logo Badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-500 text-white font-black text-2xl shadow-lg shadow-emerald-600/30 ring-4 ring-white">
            ISEA
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              ISEA Kiosk
            </h1>
            <p className="text-xs font-semibold text-emerald-800 tracking-wide mt-1">
              Intelligent Smart Eco-Apparatus
            </p>
            <p className="text-[11px] text-slate-600 font-medium mt-1 leading-relaxed">
              Zero-Waste Event Management & On-Site Recycling
            </p>
          </div>

          {/* Feature Micro-Badges */}
          <div className="flex items-center justify-center gap-2 pt-1 text-[10px] font-bold text-slate-700">
            <span className="inline-flex items-center gap-1 bg-emerald-50/80 px-2 py-1 rounded-lg border border-emerald-200/60">
              <Cpu className="w-3 h-3 text-emerald-600" /> Edge AI
            </span>
            <span className="inline-flex items-center gap-1 bg-teal-50/80 px-2 py-1 rounded-lg border border-teal-200/60">
              <Wifi className="w-3 h-3 text-teal-600" /> IoT Mesh
            </span>
            <span className="inline-flex items-center gap-1 bg-sky-50/80 px-2 py-1 rounded-lg border border-sky-200/60">
              <Leaf className="w-3 h-3 text-emerald-700" /> 100% Circular
            </span>
          </div>

          {/* Progress Bar & Subsystem Telemetry */}
          <div className="space-y-2 pt-2">
            <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-medium text-slate-600">
              <span className="truncate max-w-[220px] text-left">{statusText}</span>
              <span className="font-mono font-bold text-emerald-700">{progress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Info Banner */}
      <div className="relative z-10 w-full max-w-md pb-2 text-center">
        <div className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/60 shadow-xs text-[10px] font-semibold text-slate-700">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Kalyana Mandapam Smart Eco-Infrastructure • Clean India Initiative</span>
        </div>
      </div>
    </div>
  );
}
