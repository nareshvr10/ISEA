import React from 'react';
import { User, Language, Machine } from '../types';
import { getTranslation } from '../utils/translations';
import { Bell, Cloud, Cpu, Globe, Shield, RefreshCw } from 'lucide-react';

interface HeaderProps {
  currentUser: User;
  currentMachine: Machine;
  lang: Language;
  onLanguageChange: (l: Language) => void;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  onOpenNotifications: () => void;
  unreadAlertCount: number;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  currentMachine,
  lang,
  onLanguageChange,
  isDemoMode,
  onToggleDemoMode,
  onOpenNotifications,
  unreadAlertCount,
  onRefresh,
  isRefreshing
}) => {
  return (
    <header className="sticky top-0 z-30 px-4 sm:px-6 py-3.5 bg-white/85 backdrop-blur-md border-b border-emerald-100/70 shadow-xs">
      <div className="flex items-center justify-between gap-3 max-w-5xl mx-auto">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center font-bold text-white shadow-sm shrink-0">
            I
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-emerald-900 leading-tight">
                ISEA <span className="font-light text-teal-600">| Smart AI-IoT</span>
              </h1>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                currentMachine.isOnline 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300/60' 
                  : 'bg-rose-100 text-rose-800 border border-rose-300/60'
              }`}>
                {currentMachine.isOnline ? getTranslation(lang, 'online') : getTranslation(lang, 'offline')}
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-emerald-800/60 font-bold truncate max-w-[200px] sm:max-w-xs">
              Event Sustainability System
            </p>
          </div>
        </div>

        {/* User Info & Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* User Details (Desktop) */}
          <div className="text-right hidden md:block">
            <p className="text-xs font-bold text-slate-800 leading-tight">{currentUser.name}</p>
            <p className="text-[10px] text-teal-600 font-medium">{currentUser.role === 'ADMIN' ? 'Event Admin' : 'Event Operator'} | {currentMachine.name}</p>
          </div>

          {/* Demo Mode / Cloud Indicator Pill */}
          <button
            onClick={onToggleDemoMode}
            title="Toggle between Simulated IoT Hardware and Firebase Cloud"
            className={`flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold px-3 py-1.5 rounded-full transition-all border shadow-xs ${
              isDemoMode
                ? 'bg-amber-500/15 border-amber-500/30 text-amber-900 hover:bg-amber-500/25'
                : 'bg-emerald-700 text-white border-emerald-700 hover:bg-emerald-800'
            }`}
          >
            {isDemoMode ? <Cpu className="w-3.5 h-3.5 text-amber-700" /> : <Cloud className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isDemoMode ? getTranslation(lang, 'demoMode') : getTranslation(lang, 'liveFirebase')}</span>
            <span className="sm:hidden">{isDemoMode ? 'Demo' : 'Live'}</span>
          </button>

          {/* Language Switcher */}
          <div className="relative flex items-center bg-white rounded-2xl px-2 py-1 border border-emerald-100 shadow-xs">
            <Globe className="w-3.5 h-3.5 text-emerald-700 mr-1" />
            <select
              value={lang}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="bg-transparent text-[11px] font-bold text-emerald-900 py-0.5 pr-1 outline-none cursor-pointer"
            >
              <option value="en">EN</option>
              <option value="ta">தமிழ்</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            title="Poll fresh ESP32 telemetry"
            className="w-9 h-9 rounded-2xl bg-white border border-emerald-100 flex items-center justify-center text-emerald-800 hover:bg-emerald-50 transition-all shadow-xs"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
          </button>

          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative w-9 h-9 rounded-2xl bg-white border border-emerald-100 flex items-center justify-center text-emerald-800 hover:bg-emerald-50 transition-all shadow-xs shrink-0"
          >
            <Bell className="w-4 h-4" />
            {unreadAlertCount > 0 && (
              <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white"></div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
