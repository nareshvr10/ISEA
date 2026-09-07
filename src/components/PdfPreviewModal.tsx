import React, { useEffect, useState } from 'react';
import { ReportItem } from '../types';
import { ReportPdfGenerator } from '../utils/pdfGenerator';
import { Download, Share2, Eye, X, Check, Copy, FileText } from 'lucide-react';

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ReportItem | null;
}

export const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
  isOpen,
  onClose,
  report
}) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && report) {
      const doc = ReportPdfGenerator.generateReportPdf(report);
      const url = ReportPdfGenerator.getPdfBlobUrl(doc);
      setBlobUrl(url);

      return () => {
        URL.revokeObjectURL(url);
        setBlobUrl(null);
      };
    }
  }, [isOpen, report]);

  if (!isOpen || !report) return null;

  const handleDownload = () => {
    const doc = ReportPdfGenerator.generateReportPdf(report);
    ReportPdfGenerator.downloadPdf(doc, `${report.id}.pdf`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const doc = ReportPdfGenerator.generateReportPdf(report);
        const blob = doc.output('blob');
        const file = new File([blob], `${report.id}.pdf`, { type: 'application/pdf' });
        await navigator.share({
          title: `ISEA Sustainability Report - ${report.eventName}`,
          text: `ISEA Smart AI-IoT Waste Recycling & Event Sustainability Audit (${report.type} Report). Score: ${report.sustainabilityScore}/100.`,
          files: [file]
        });
      } catch (err) {
        // Fallback
        handleCopyShare();
      }
    } else {
      handleCopyShare();
    }
  };

  const handleCopyShare = () => {
    const shareText = `ISEA Event Sustainability Report: ${report.eventName}\nTotal Waste: ${report.totalWasteKg}kg | Plastic: ${report.plasticCollectedKg}kg | Shredded: ${report.plasticShreddedKg}kg | Recovered Liquid: ${report.recoveredLiquidL}L\nSustainability Score: ${report.sustainabilityScore}/100`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col h-[90vh]">
        {/* Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-300" />
            <div>
              <h3 className="font-bold text-sm leading-tight">
                ISEA Official Report: {report.type} Audit
              </h3>
              <p className="text-[11px] text-emerald-100/80">
                ID: {report.id} • {report.eventName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-emerald-900 font-bold text-xs rounded-lg hover:bg-emerald-50 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/60 hover:bg-emerald-600 text-white font-bold text-xs rounded-lg transition-colors border border-emerald-400/40"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied Summary' : 'Share'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer Frame */}
        <div className="flex-1 bg-slate-100 p-2 overflow-hidden flex flex-col items-center justify-center">
          {blobUrl ? (
            <iframe
              src={`${blobUrl}#toolbar=0&navpanes=0`}
              title="ISEA PDF Report"
              className="w-full h-full rounded-xl border border-slate-300 shadow-inner bg-white"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-500">
              <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs">Generating verified ISEA PDF...</span>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Sustainability Score: <strong className="text-emerald-700">{report.sustainabilityScore}/100</strong></span>
          <span>Verified Zero-Direct-Liquid Shredding Protocol</span>
        </div>
      </div>
    </div>
  );
};
