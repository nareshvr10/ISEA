import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';
import { Home, Server, Trash2, BarChart3, UserCheck } from 'lucide-react';

export type MainTab = 'HOME' | 'MACHINES' | 'WASTE' | 'ANALYTICS' | 'PROFILE';

interface BottomNavProps {
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
  lang: Language;
}

export const BottomNavigation: React.FC<BottomNavProps> = ({ activeTab, onTabChange, lang }) => {
  const tabs: { id: MainTab; labelKey: 'home' | 'machines' | 'waste' | 'analytics' | 'profile'; icon: React.ReactNode }[] = [
    { id: 'HOME', labelKey: 'home', icon: <Home className="w-5 h-5" /> },
    { id: 'MACHINES', labelKey: 'machines', icon: <Server className="w-5 h-5" /> },
    { id: 'WASTE', labelKey: 'waste', icon: <Trash2 className="w-5 h-5" /> },
    { id: 'ANALYTICS', labelKey: 'analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'PROFILE', labelKey: 'profile', icon: <UserCheck className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-xl border-t border-white/50 shadow-sm px-4 py-2 max-w-lg mx-auto md:max-w-2xl lg:max-w-4xl">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center flex-1 py-1 focus:outline-none transition-all group cursor-pointer"
            >
              <div
                className={`flex items-center justify-center p-2 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-100 text-emerald-600 shadow-xs'
                    : 'text-slate-400 hover:text-emerald-500 hover:bg-emerald-50/40'
                }`}
              >
                {tab.icon}
              </div>
              <span
                className={`text-[10px] uppercase tracking-tighter mt-1 transition-colors ${
                  isActive ? 'text-emerald-600 font-bold' : 'text-slate-400 group-hover:text-emerald-500'
                }`}
              >
                {getTranslation(lang, tab.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
