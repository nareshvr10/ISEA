import React, { useState } from 'react';
import { WasteCategory, WasteDetection } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Droplet, Wind, Zap, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, X } from 'lucide-react';

interface UniversalInputSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProcessWaste: (detection: WasteDetection) => void;
}

export const UniversalInputSimulatorModal: React.FC<UniversalInputSimulatorModalProps> = ({
  isOpen,
  onClose,
  onProcessWaste
}) => {
  const [selectedItem, setSelectedItem] = useState<{
    name: string;
    category: WasteCategory;
    weightGrams: number;
    liquidMl: number;
    orientation: 'Vertical' | 'Horizontal' | 'Angled' | 'Inverted';
    confidence: number;
  }>({
    name: 'PET Mineral Water Bottle (500ml)',
    category: 'Plastic',
    weightGrams: 18,
    liquidMl: 45,
    orientation: 'Angled',
    confidence: 98.4
  });

  const [step, setStep] = useState<'IDLE' | 'LIQUID_DRAIN' | 'AI_CLASSIFY' | 'DEWATERING' | 'DRYING' | 'SHREDDING' | 'COMPLETE'>('IDLE');
  const [drainedLiquid, setDrainedLiquid] = useState(0);

  const samplePresets = [
    {
      name: 'PET Mineral Water Bottle (500ml)',
      category: 'Plastic' as WasteCategory,
      weightGrams: 18,
      liquidMl: 45,
      orientation: 'Angled' as const,
      confidence: 98.4
    },
    {
      name: 'Clear Disposable Juice Cup',
      category: 'Plastic' as WasteCategory,
      weightGrams: 12,
      liquidMl: 35,
      orientation: 'Inverted' as const,
      confidence: 96.2
    },
    {
      name: 'PP Catering Food Container',
      category: 'Plastic' as WasteCategory,
      weightGrams: 28,
      liquidMl: 20,
      orientation: 'Horizontal' as const,
      confidence: 95.7
    },
    {
      name: 'Aluminium Cold Drink Can',
      category: 'Metal' as WasteCategory,
      weightGrams: 15,
      liquidMl: 12,
      orientation: 'Horizontal' as const,
      confidence: 99.1
    },
    {
      name: 'Paper Coffee/Tea Cup',
      category: 'Paper' as WasteCategory,
      weightGrams: 9,
      liquidMl: 15,
      orientation: 'Vertical' as const,
      confidence: 94.3
    },
    {
      name: 'Mini Glass Condiment Bottle',
      category: 'Glass' as WasteCategory,
      weightGrams: 90,
      liquidMl: 8,
      orientation: 'Vertical' as const,
      confidence: 97.6
    },
    {
      name: 'Leftover Buffet Banana Leaf & Organic',
      category: 'Organic' as WasteCategory,
      weightGrams: 65,
      liquidMl: 5,
      orientation: 'Horizontal' as const,
      confidence: 92.5
    },
    {
      name: 'Broken Electronic Event Badge (E-waste)',
      category: 'E-waste' as WasteCategory,
      weightGrams: 22,
      liquidMl: 0,
      orientation: 'Horizontal' as const,
      confidence: 96.0
    }
  ];

  const handleStartProcess = async () => {
    setStep('LIQUID_DRAIN');
    setDrainedLiquid(0);

    // Step 1: Drain liquid first (CRITICAL RULE)
    await new Promise((r) => setTimeout(r, 1400));
    setDrainedLiquid(selectedItem.liquidMl);

    // Step 2: AI Vision Classification
    setStep('AI_CLASSIFY');
    await new Promise((r) => setTimeout(r, 1100));

    // If plastic: proceed to dewatering, drying, and shredding
    if (selectedItem.category === 'Plastic') {
      setStep('DEWATERING');
      await new Promise((r) => setTimeout(r, 1200));

      setStep('DRYING');
      await new Promise((r) => setTimeout(r, 1200));

      setStep('SHREDDING');
      await new Promise((r) => setTimeout(r, 1400));
    }

    setStep('COMPLETE');

    const detection: WasteDetection = {
      id: `det_${Date.now()}`,
      objectName: selectedItem.name,
      category: selectedItem.category,
      confidence: selectedItem.confidence,
      weightGrams: selectedItem.weightGrams,
      residualLiquidMl: selectedItem.liquidMl,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      destination: selectedItem.category === 'Plastic' ? 'Dewaterer → Dryer → Shredder Flakes' : `${selectedItem.category} Bin`,
      status: selectedItem.category === 'Plastic' ? 'Stored' : 'Segregated',
      orientation: selectedItem.orientation
    };

    onProcessWaste(detection);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-emerald-100 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-800 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm">Universal Waste Input Simulator</span>
              <span className="text-[10px] bg-emerald-500/40 text-emerald-100 px-2 py-0.5 rounded-full font-mono uppercase">
                IoT Edge Chute
              </span>
            </div>
            <p className="text-[11px] text-emerald-100/90 mt-0.5">
              No bottle holder • Multi-orientation universal input • Liquid separation first
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Critical Engineering Rule Notice */}
        <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-2 flex items-start gap-2 text-amber-900 text-[11px]">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">CRITICAL ENGINEERING PROTOCOL:</span> Free liquid is extracted via perforated drain grid into the{' '}
            <span className="font-semibold text-emerald-800">Recovered/Event Liquid Tank</span> BEFORE plastic enters the conventional shredder.
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {/* Preset Waste Items */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Select Sample Event Waste to Drop into Chute:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {samplePresets.map((preset, idx) => {
                const isSelected = selectedItem.name === preset.name;
                return (
                  <button
                    key={idx}
                    disabled={step !== 'IDLE' && step !== 'COMPLETE'}
                    onClick={() => {
                      setSelectedItem(preset);
                      setStep('IDLE');
                      setDrainedLiquid(0);
                    }}
                    className={`p-2 rounded-xl text-left border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-600'
                        : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="font-bold leading-tight line-clamp-1">{preset.name}</span>
                    <div className="flex items-center justify-between mt-1 text-[10px] text-slate-500">
                      <span className="font-medium text-emerald-700">{preset.category}</span>
                      <span>{preset.liquidMl > 0 ? `${preset.liquidMl}ml liquid` : 'Dry'}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Item Properties Box */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs">
            <div className="flex items-center justify-between text-slate-600 mb-2">
              <span className="font-semibold">Drop Orientation:</span>
              <span className="font-mono bg-white px-2 py-0.5 rounded-md border text-slate-800 font-bold">
                {selectedItem.orientation}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-2 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Dry Weight</span>
                <span className="font-bold text-slate-800">{selectedItem.weightGrams} g</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Residual Liquid</span>
                <span className="font-bold text-teal-700">{selectedItem.liquidMl} ml</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-400 block">AI Accuracy</span>
                <span className="font-bold text-emerald-700">{selectedItem.confidence}%</span>
              </div>
            </div>
          </div>

          {/* Step-by-Step Live Processing Visualization */}
          <div className="border border-slate-200 rounded-xl p-3 bg-white space-y-2.5">
            <span className="text-xs font-bold text-slate-800 block">
              Automated Mechanical &amp; AI Pipeline:
            </span>

            {/* Stage 1: Liquid Separation */}
            <div className={`flex items-center gap-3 p-2.5 rounded-lg text-xs transition-colors ${
              step === 'LIQUID_DRAIN'
                ? 'bg-teal-50 border border-teal-300 text-teal-900 animate-pulse'
                : drainedLiquid > 0
                ? 'bg-emerald-50/60 border border-emerald-200 text-emerald-900'
                : 'bg-slate-50 text-slate-500'
            }`}>
              <div className="p-1.5 rounded-md bg-teal-100 text-teal-800">
                <Droplet className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold">1. Liquid Separation Chute</span>
                  <span className="text-[10px] font-mono font-bold">
                    {drainedLiquid > 0 ? `+${drainedLiquid}ml -> Recovered Liquid Tank` : 'Drain Grid Ready'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Residual beverages drained into Event Liquid Collection Tank (Non-potable)
                </p>
              </div>
            </div>

            {/* Stage 2: AI Optical Classification */}
            <div className={`flex items-center gap-3 p-2.5 rounded-lg text-xs transition-colors ${
              step === 'AI_CLASSIFY'
                ? 'bg-blue-50 border border-blue-300 text-blue-900 animate-pulse'
                : step !== 'IDLE' && step !== 'LIQUID_DRAIN'
                ? 'bg-emerald-50/60 border border-emerald-200 text-emerald-900'
                : 'bg-slate-50 text-slate-500'
            }`}>
              <div className="p-1.5 rounded-md bg-blue-100 text-blue-800">
                <Zap className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold">2. AI Vision &amp; Segregation</span>
                  <span className="text-[10px] font-mono font-bold">
                    {step !== 'IDLE' && step !== 'LIQUID_DRAIN' ? `${selectedItem.category} Confirmed (${selectedItem.confidence}%)` : 'Ready'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Universal classifier identifies material type &amp; routes to designated pathway
                </p>
              </div>
            </div>

            {/* Stage 3: Plastic Dewatering, Drying & Shredding (If Plastic) */}
            {selectedItem.category === 'Plastic' && (
              <div className={`flex items-center gap-3 p-2.5 rounded-lg text-xs transition-colors ${
                step === 'DEWATERING' || step === 'DRYING' || step === 'SHREDDING'
                  ? 'bg-emerald-50 border border-emerald-300 text-emerald-900'
                  : step === 'COMPLETE'
                  ? 'bg-emerald-50/60 border border-emerald-200 text-emerald-900'
                  : 'bg-slate-50 text-slate-500'
              }`}>
                <div className="p-1.5 rounded-md bg-emerald-100 text-emerald-800">
                  <Wind className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">3. Plastic Dewater &rarr; Dry &rarr; Shred</span>
                    <span className="text-[10px] font-mono font-bold text-emerald-700">
                      {step === 'DEWATERING' && 'Centrifuging moisture...'}
                      {step === 'DRYING' && 'Thermal warm air drying...'}
                      {step === 'SHREDDING' && 'Rotary twin-blade shredding...'}
                      {step === 'COMPLETE' && 'Flakes weighed & stored'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Safe shredding of clean, dry plastic flakes into compact event storage
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            {step === 'COMPLETE' ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Successfully Processed!
              </span>
            ) : (
              <span>Ready for universal drop</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Close
            </button>
            <button
              disabled={step !== 'IDLE' && step !== 'COMPLETE'}
              onClick={handleStartProcess}
              className="flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-sm shadow-emerald-600/30 transition-all"
            >
              <span>{step === 'COMPLETE' ? 'Drop Another Waste Item' : 'Simulate Chute Drop'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
