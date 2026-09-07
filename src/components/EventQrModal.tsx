import React, { useState } from 'react';
import { EventItem, Machine, User } from '../types';
import { QrCode, Award, Trophy, Users, X, Check, Gift } from 'lucide-react';

interface EventQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem;
  machine: Machine;
  currentUser: User;
}

export const EventQrModal: React.FC<EventQrModalProps> = ({
  isOpen,
  onClose,
  event,
  machine,
  currentUser
}) => {
  const [pointsClaimed, setPointsClaimed] = useState(false);
  const [userPoints, setUserPoints] = useState(currentUser.points || 65);

  if (!isOpen) return null;

  const handleClaimDemoPoints = () => {
    setUserPoints((prev) => prev + 25);
    setPointsClaimed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-emerald-100 flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-emerald-700 to-teal-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-emerald-300" />
            <div>
              <h3 className="font-bold text-sm">Event Sustainability QR</h3>
              <p className="text-[11px] text-emerald-100">Scan at Kiosk for Guest Contribution Points</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col items-center text-center space-y-4">
          <div className="bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-emerald-300 inline-block shadow-inner">
            {/* SVG Visual QR Representation */}
            <div className="w-44 h-44 bg-white p-2 rounded-xl flex flex-col items-center justify-center shadow-xs">
              <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                <rect width="100" height="100" fill="white" />
                {/* Corner markers */}
                <rect x="10" y="10" width="24" height="24" rx="4" fill="#047857" />
                <rect x="14" y="14" width="16" height="16" rx="2" fill="white" />
                <rect x="18" y="18" width="8" height="8" fill="#047857" />

                <rect x="66" y="10" width="24" height="24" rx="4" fill="#047857" />
                <rect x="70" y="14" width="16" height="16" rx="2" fill="white" />
                <rect x="74" y="18" width="8" height="8" fill="#047857" />

                <rect x="10" y="66" width="24" height="24" rx="4" fill="#047857" />
                <rect x="14" y="70" width="16" height="16" rx="2" fill="white" />
                <rect x="18" y="74" width="8" height="8" fill="#047857" />

                {/* Matrix dots */}
                <rect x="40" y="14" width="6" height="6" fill="#065f46" />
                <rect x="52" y="14" width="6" height="6" fill="#065f46" />
                <rect x="44" y="24" width="12" height="6" fill="#065f46" />
                <rect x="40" y="38" width="8" height="8" fill="#065f46" />
                <rect x="52" y="38" width="8" height="8" fill="#065f46" />
                <rect x="64" y="38" width="8" height="8" fill="#065f46" />
                <rect x="38" y="52" width="24" height="6" fill="#065f46" />
                <rect x="68" y="52" width="6" height="6" fill="#065f46" />
                <rect x="40" y="68" width="6" height="16" fill="#065f46" />
                <rect x="52" y="68" width="16" height="6" fill="#065f46" />
                <rect x="74" y="74" width="12" height="12" fill="#065f46" />
                <rect x="46" y="46" width="8" height="8" fill="#10b981" />
              </svg>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono font-bold tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              ISEA-EVT-2026-001
            </span>
            <h4 className="font-bold text-slate-800 text-sm mt-1">{event.name}</h4>
            <p className="text-xs text-slate-500">Machine: {machine.name} ({machine.id})</p>
          </div>

          {/* Guest Rewards Card */}
          <div className="w-full bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <div>
                  <span className="text-xs font-bold text-emerald-950 block">Your Green Points</span>
                  <span className="text-[11px] text-emerald-700">5 Bottles Processed = 5 Points</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-emerald-700">{userPoints}</span>
                <span className="text-[10px] text-emerald-600 block">Pts (#4 in Hall)</span>
              </div>
            </div>

            <button
              onClick={handleClaimDemoPoints}
              disabled={pointsClaimed}
              className={`w-full mt-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                pointsClaimed
                  ? 'bg-emerald-200 text-emerald-800 cursor-default'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>{pointsClaimed ? 'Points Claimed (+25 Pts)' : 'Claim Simulated Contribution (+25 Pts)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
