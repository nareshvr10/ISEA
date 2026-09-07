import React from 'react';
import { User, Language, UserRole } from '../types';
import { getTranslation } from '../utils/translations';
import { 
  User as UserIcon, 
  Shield, 
  Globe, 
  Cpu, 
  Wifi, 
  FileCode, 
  LogOut, 
  Check, 
  Award, 
  Database,
  ExternalLink
} from 'lucide-react';

interface ProfileScreenProps {
  currentUser: User;
  onRoleChange: (role: UserRole) => void;
  lang: Language;
  onLanguageChange: (l: Language) => void;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  onLogout: () => void;
  onOpenCodeExplorer: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  currentUser,
  onRoleChange,
  lang,
  onLanguageChange,
  isDemoMode,
  onToggleDemoMode,
  onLogout,
  onOpenCodeExplorer
}) => {
  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-300">
      {/* User Header Profile Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-700 text-white flex items-center justify-center font-black text-xl shadow-md">
          {currentUser.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 truncate">{currentUser.name}</h2>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              {currentUser.role}
            </span>
          </div>
          <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
          <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
            Green Points: {currentUser.points} Pts
          </p>
        </div>
      </div>

      {/* Role Switching for Live Testing */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-slate-200 space-y-2">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-700" />
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
            Switch Access Role
          </h3>
        </div>
        <p className="text-xs text-slate-500">
          Switch role to test Operator kiosk controls, Admin fleet management, or Guest rewards:
        </p>

        <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
          {(['OPERATOR', 'ADMIN', 'USER'] as const).map((r) => {
            const isActive = currentUser.role === r;
            return (
              <button
                key={r}
                onClick={() => onRoleChange(r)}
                className={`py-2 rounded-xl font-bold border transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {r === 'OPERATOR' ? 'Operator' : r === 'ADMIN' ? 'Admin' : 'Guest User'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Language Selector */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-slate-200 space-y-2">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-emerald-700" />
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
            {getTranslation(lang, 'language')} (Multilingual Support)
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
          {[
            { code: 'en' as Language, label: 'English' },
            { code: 'ta' as Language, label: 'தமிழ்' },
            { code: 'hi' as Language, label: 'हिन्दी' },
          ].map((l) => {
            const isActive = lang === l.code;
            return (
              <button
                key={l.code}
                onClick={() => onLanguageChange(l.code)}
                className={`py-2 rounded-xl font-bold border transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {l.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Demo Mode / Firebase Sync */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="font-bold text-xs text-slate-800 block">
            {isDemoMode ? 'Simulated IoT Hardware' : 'Firebase Cloud Realtime DB'}
          </span>
          <p className="text-[11px] text-slate-500">
            {isDemoMode ? 'Using built-in test telemetry' : 'Connected to Firebase Realtime Database'}
          </p>
        </div>

        <button
          onClick={onToggleDemoMode}
          className={`px-3 py-1.5 rounded-xl font-bold text-xs border transition-all ${
            isDemoMode
              ? 'bg-amber-100 text-amber-900 border-amber-300'
              : 'bg-emerald-600 text-white border-emerald-600'
          }`}
        >
          {isDemoMode ? 'Demo Mode Active' : 'Firebase Active'}
        </button>
      </div>

      {/* Android Jetpack Compose Code Inspector */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="font-bold text-xs text-slate-800 block">
            Native Kotlin Android Project Files
          </span>
          <p className="text-[11px] text-slate-500">
            AndroidManifest, Models.kt, FirebaseManager, Native PDF Generator
          </p>
        </div>

        <button
          onClick={onOpenCodeExplorer}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors"
        >
          <FileCode className="w-3.5 h-3.5 text-emerald-400" />
          <span>Inspect Files</span>
        </button>
      </div>

      {/* Logout */}
      <div className="pt-2">
        <button
          onClick={onLogout}
          className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>{getTranslation(lang, 'logout')}</span>
        </button>
      </div>
    </div>
  );
};
