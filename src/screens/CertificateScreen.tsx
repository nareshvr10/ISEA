import React, { useState } from 'react';
import { EventItem, EnvironmentalImpact, Language } from '../types';
import { getTranslation } from '../utils/translations';
import { ReportPdfGenerator } from '../utils/pdfGenerator';
import { Award, Download, Share2, CheckCircle2, ShieldCheck, Sparkles, ArrowLeft, QrCode } from 'lucide-react';

interface CertificateScreenProps {
  event: EventItem;
  impact: EnvironmentalImpact;
  lang: Language;
  onBack: () => void;
}

export const CertificateScreen: React.FC<CertificateScreenProps> = ({
  event,
  impact,
  lang,
  onBack
}) => {
  const [downloading, setDownloading] = useState(false);
  const [shared, setShared] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    const doc = ReportPdfGenerator.generateGreenCertificatePdf(event, impact);
    ReportPdfGenerator.downloadPdf(doc, `ISEA-CERT-${event.id}.pdf`);
    setTimeout(() => setDownloading(false), 800);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const doc = ReportPdfGenerator.generateGreenCertificatePdf(event, impact);
        const blob = doc.output('blob');
        const file = new File([blob], `ISEA-Certificate-${event.id}.pdf`, { type: 'application/pdf' });
        await navigator.share({
          title: `ISEA Green Event Certificate: ${event.name}`,
          text: `Official Event Sustainability Certificate for ${event.name}. Score: ${impact.sustainabilityScore}/100. Plastic diverted: ${impact.plasticDivertedKg}kg.`,
          files: [file]
        });
      } catch (e) {
        copyFallback();
      }
    } else {
      copyFallback();
    }
  };

  const copyFallback = () => {
    navigator.clipboard.writeText(
      `ISEA Green Event Certificate\nEvent: ${event.name}\nScore: ${impact.sustainabilityScore}/100\nPlastic Diverted: ${impact.plasticDivertedKg}kg\nRecovered Liquid: ${impact.recoveredLiquidL}L`
    );
    setShared(true);
    setTimeout(() => setShared(false), 2500);
  };

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-300">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloading ? 'Exporting...' : 'Download PDF'}</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{shared ? 'Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Visual Certificate Card Frame */}
      <div className="relative rounded-3xl bg-white p-6 sm:p-8 shadow-xl border-4 border-emerald-600/30 overflow-hidden text-center space-y-4">
        {/* Corner Decorative Elements */}
        <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-emerald-600/20 to-transparent rounded-br-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-emerald-600/20 to-transparent rounded-bl-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-emerald-600/20 to-transparent rounded-tr-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-emerald-600/20 to-transparent rounded-tl-3xl pointer-events-none" />

        {/* Certificate Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-600 text-white shadow-md mb-2">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
            Green Event Certificate
          </h2>
          <p className="text-xs text-emerald-800 font-bold uppercase tracking-wider">
            ISEA Smart AI-IoT Waste Recycling &amp; Event Sustainability System
          </p>
        </div>

        {/* Subtext */}
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          This certifies that the following event adhered to eco-friendly waste management protocols, achieved zero direct liquid shredder contamination, and diverted event plastics into recycling.
        </p>

        {/* Recipient / Event Box */}
        <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-200/80 max-w-lg mx-auto">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Presented to Event:</span>
          <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">{event.name}</h3>
          <p className="text-xs text-emerald-800 font-semibold mt-0.5">{event.location}</p>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-center gap-3">
            <span>Date: {event.date}</span>
            <span>•</span>
            <span>Organizer: {event.organizer}</span>
          </div>
        </div>

        {/* Impact Numbers in Certificate */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-xl mx-auto text-xs">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 block font-semibold">Plastic Diverted</span>
            <span className="text-base font-black text-emerald-800 font-mono">{impact.plasticDivertedKg} kg</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 block font-semibold">CO₂ Offset</span>
            <span className="text-base font-black text-slate-900 font-mono">{impact.co2AvoidedKg} kg</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 block font-semibold">Recovered Liquid</span>
            <span className="text-base font-black text-teal-800 font-mono">{impact.recoveredLiquidL} L</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 block font-semibold">Sustainability Score</span>
            <span className="text-base font-black text-emerald-600 font-mono">{impact.sustainabilityScore}/100</span>
          </div>
        </div>

        {/* Certificate Signature & Verification Footer */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto text-xs text-slate-500">
          <div className="text-left">
            <span className="font-mono text-[10px] font-bold text-slate-400 block">Digital Verification Hash</span>
            <span className="font-mono text-[11px] text-emerald-800 font-bold">ISEA-CERT-{event.id}-VERIFIED</span>
          </div>

          <div className="flex items-center gap-2 text-right">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold text-slate-700">Official ISEA Audit Seal</span>
          </div>
        </div>
      </div>
    </div>
  );
};
