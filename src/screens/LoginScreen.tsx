import React, { useState } from 'react';
import { UserRole, Language } from '../types';
import { getTranslation } from '../utils/translations';
import { Eye, EyeOff, Lock, Mail, ShieldCheck, Sparkles, User, ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (role: UserRole, email: string) => void;
  lang: Language;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, lang }) => {
  const [email, setEmail] = useState('operator@mandapam.com');
  const [password, setPassword] = useState('isea2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberLogin, setRememberLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>('OPERATOR');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(selectedRole, email);
    }, 600);
  };

  const handleQuickDemoRole = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'ADMIN') setEmail('admin@isea-recycle.io');
    else if (role === 'OPERATOR') setEmail('operator@mandapam.com');
    else setEmail('guest@event.com');
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-slate-900">
      {/* Primary Eco-Tech Vertical Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-700 scale-100"
        style={{ backgroundImage: "url('/ecotech_bg.jpg')" }}
      >
        {/* Soft translucent gradient overlay preserving the background composition while ensuring contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-emerald-950/30 to-slate-950/80 backdrop-blur-[1px]" />
      </div>

      {/* Main Glassmorphic Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/60 text-slate-800 animate-in fade-in zoom-in-95 duration-500">
        {/* Top Eco Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-600 text-white font-black text-xl shadow-lg shadow-emerald-600/30 mb-3 ring-4 ring-emerald-50">
            ISEA
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {getTranslation(lang, 'appName')}
          </h1>
          <p className="text-xs text-emerald-800/90 font-medium max-w-xs mx-auto mt-1 leading-snug">
            {getTranslation(lang, 'appSubtitle')}
          </p>
          <div className="mt-2 inline-flex items-center gap-1 bg-emerald-100/80 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            <span>Event Kiosk System Portal</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selector Tabs */}
          <div>
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
              Select User Role
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100/90 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => handleQuickDemoRole('OPERATOR')}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                  selectedRole === 'OPERATOR'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Operator
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoRole('ADMIN')}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                  selectedRole === 'ADMIN'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoRole('USER')}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                  selectedRole === 'USER'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                User / Guest
              </button>
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              {getTranslation(lang, 'email')}
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@organization.com"
                className="w-full pl-9 pr-3 py-2.5 bg-white/80 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-xs"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">
                {getTranslation(lang, 'password')}
              </label>
              <button
                type="button"
                className="text-[11px] font-semibold text-emerald-700 hover:underline"
              >
                {getTranslation(lang, 'forgotPassword')}
              </button>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-white/80 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Login checkbox */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberLogin}
                onChange={(e) => setRememberLogin(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 border-slate-300"
              />
              <span className="text-xs text-slate-600">{getTranslation(lang, 'rememberMe')}</span>
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{getTranslation(lang, 'loginBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Mode Quick Access Footnote */}
        <div className="mt-5 pt-4 border-t border-slate-200/80 text-center">
          <p className="text-[11px] text-slate-500">
            Smart AI-IoT Waste Recycling Machine • Kalyana Mandapams &amp; Events
          </p>
        </div>
      </div>
    </div>
  );
};
