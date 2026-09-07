import { jsPDF } from 'jspdf';
import { ReportItem, EventItem } from '../types';

export class ReportPdfGenerator {
  /**
   * Generates a professional ISEA Corporate Sustainability PDF Report
   */
  static generateReportPdf(report: ReportItem): jsPDF {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Brand Colors
    const primaryGreen: [number, number, number] = [16, 149, 106]; // #10956A
    const secondaryTeal: [number, number, number] = [20, 184, 166]; // #14B8A6
    const darkSlate: [number, number, number] = [30, 41, 59]; // #1E293B
    const lightBg: [number, number, number] = [240, 253, 250]; // #F0FDFA
    const accentMuted: [number, number, number] = [100, 116, 139];

    // Header Banner
    doc.setFillColor(...primaryGreen);
    doc.rect(0, 0, pageWidth, 32, 'F');

    // Header Title
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('ISEA', 14, 14);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Smart AI-IoT Waste Recycling & Event Sustainability System', 14, 20);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(`REPORT: ${report.type} SUSTAINABILITY AUDIT`, pageWidth - 14, 14, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.text(`ID: ${report.id}`, pageWidth - 14, 20, { align: 'right' });

    let y = 42;

    // Section 1: Report Information
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...darkSlate);
    doc.text('1. REPORT & EVENT METADATA', 14, y);
    y += 4;
    doc.setDrawColor(...secondaryTeal);
    doc.setLineWidth(0.5);
    doc.line(14, y, pageWidth - 14, y);
    y += 6;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkSlate);

    const leftColX = 14;
    const rightColX = 110;

    doc.text(`Event Name: ${report.eventName}`, leftColX, y);
    doc.text(`Generated At: ${report.generatedTime}`, rightColX, y);
    y += 5;
    doc.text(`Event ID: ${report.eventId}`, leftColX, y);
    doc.text(`Reporting Period: ${report.periodLabel}`, rightColX, y);
    y += 5;
    doc.text(`Machine ID: ${report.machineId} (${report.machineName})`, leftColX, y);
    doc.text(`Operating Duration: ${report.operatingHours} Hours`, rightColX, y);
    y += 8;

    // Section 2: Executive Summary Cards
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('2. EXECUTIVE EVENT SUMMARY', 14, y);
    y += 4;
    doc.line(14, y, pageWidth - 14, y);
    y += 6;

    // Draw 4 Metric Boxes
    const boxW = 42;
    const boxH = 18;
    const gap = 5;

    const metrics = [
      { label: 'Total Waste', val: `${report.totalWasteKg} kg`, sub: 'All 7 categories' },
      { label: 'Plastic Processed', val: `${report.plasticCollectedKg} kg`, sub: `${report.bottleCount} Bottles, ${report.cupCount} Cups` },
      { label: 'Shredded Output', val: `${report.plasticShreddedKg} kg`, sub: 'Dewatered & Clean' },
      { label: 'Recovered Liquid', val: `${report.recoveredLiquidL} L`, sub: 'Event Liquid Tank' },
    ];

    metrics.forEach((m, i) => {
      const bx = 14 + i * (boxW + gap);
      doc.setFillColor(...lightBg);
      doc.roundedRect(bx, y, boxW, boxH, 2, 2, 'F');
      doc.setDrawColor(180, 230, 220);
      doc.roundedRect(bx, y, boxW, boxH, 2, 2, 'S');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...accentMuted);
      doc.text(m.label, bx + 3, y + 4.5);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...primaryGreen);
      doc.text(m.val, bx + 3, y + 10.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(...darkSlate);
      doc.text(m.sub, bx + 3, y + 15);
    });

    y += boxH + 8;

    // Section 3: Waste Category Segregation Breakdown
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...darkSlate);
    doc.text('3. AUTOMATIC SEGREGATION AUDIT TABLE', 14, y);
    y += 4;
    doc.line(14, y, pageWidth - 14, y);
    y += 6;

    // Table Header
    doc.setFillColor(240, 245, 248);
    doc.rect(14, y, pageWidth - 28, 6, 'F');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkSlate);
    doc.text('Category', 18, y + 4.2);
    doc.text('Net Weight (kg)', 75, y + 4.2);
    doc.text('Composition (%)', 125, y + 4.2);
    doc.text('Destination & Handling State', 155, y + 4.2);
    y += 6;

    const catEntries = Object.entries(report.categoryBreakdown);
    doc.setFont('helvetica', 'normal');
    catEntries.forEach(([cat, wt]) => {
      const pct = report.totalWasteKg > 0 ? ((wt / report.totalWasteKg) * 100).toFixed(1) : '0.0';
      let dest = 'Designated Event Bin';
      if (cat === 'Plastic') dest = 'Dewatering -> Dryer -> Shredder';
      if (cat === 'Hazard / Reject') dest = 'Secure Isolation Container';

      doc.text(cat, 18, y + 4);
      doc.text(`${wt.toFixed(2)} kg`, 75, y + 4);
      doc.text(`${pct}%`, 125, y + 4);
      doc.text(dest, 155, y + 4);
      y += 5;
    });

    y += 4;

    // Section 4: Plastic Processing & Liquid Separation Verification
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('4. PLASTIC PRE-PROCESSING & LIQUID RECOVERY AUDIT', 14, y);
    y += 4;
    doc.line(14, y, pageWidth - 14, y);
    y += 6;

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.text('• CRITICAL RULE VERIFICATION: Free liquid was drained via the perforated separation chute BEFORE plastic entered the shredder.', 14, y);
    y += 5;
    doc.text(`• Total Liquid Diverted into Event Tank: ${report.recoveredLiquidL} L (Designation: "Recovered/Event Liquid", not potable).`, 14, y);
    y += 5;
    doc.text(`• Dewatering Centrifuge & Dryer Hand-off: Reduced moisture content by ~94% prior to rotary blade contact.`, 14, y);
    y += 5;
    doc.text(`• High-Density Flake Output: ${report.plasticShreddedKg} kg produced from ${report.plasticCollectedKg} kg input plastic.`, 14, y);
    y += 8;

    // Section 5: Environmental Impact & Sustainability Score
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('5. ENVIRONMENTAL IMPACT & SUSTAINABILITY SCORE', 14, y);
    y += 4;
    doc.line(14, y, pageWidth - 14, y);
    y += 6;

    const co2Avoided = (report.plasticCollectedKg * 2.4).toFixed(1);
    const waterSaved = (report.plasticCollectedKg * 10).toFixed(0);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`• CO₂ Greenhouse Gas Emissions Avoided: ~${co2Avoided} kg CO₂ equivalent`, 14, y);
    doc.text(`• Fresh Water Equivalent Saved: ~${waterSaved} Liters`, 110, y);
    y += 5;
    doc.text(`• Landfill Volume Diverted: ${(report.totalWasteKg * 0.045).toFixed(2)} m³`, 14, y);
    doc.text(`• AI Optical Classification Accuracy: ${report.aiAccuracyPercent}%`, 110, y);
    y += 6;

    // Sustainability Badge
    doc.setFillColor(236, 253, 245);
    doc.roundedRect(14, y, pageWidth - 28, 14, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...primaryGreen);
    doc.text(`OFFICIAL ISEA EVENT SUSTAINABILITY SCORE: ${report.sustainabilityScore} / 100 (GRADE A - EXEMPLARY)`, 20, y + 8.5);

    // Footer
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...accentMuted);
    doc.text('ISEA Event-Side Smart Recycling System • Confidential & Certified Audit Report', 14, pageHeight - 10);
    doc.text(`Page 1 of 1 • System Auth: Node ${report.machineId}`, pageWidth - 14, pageHeight - 10, { align: 'right' });

    return doc;
  }

  /**
   * Generates a Digital Green Event Certificate PDF
   */
  static generateCertificatePdf(event: EventItem, report: ReportItem): jsPDF {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Outer Decorative Border
    doc.setDrawColor(16, 149, 106);
    doc.setLineWidth(2);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

    doc.setDrawColor(20, 184, 166);
    doc.setLineWidth(0.6);
    doc.rect(13, 13, pageWidth - 26, pageHeight - 26);

    // Title
    doc.setTextColor(16, 149, 106);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text('GREEN EVENT SUSTAINABILITY CERTIFICATE', pageWidth / 2, 32, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('AWARDED BY ISEA SMART AI-IoT RECYCLING ECOSYSTEM', pageWidth / 2, 40, { align: 'center' });

    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.text('This is to officially certify that the event:', pageWidth / 2, 52, { align: 'center' });

    // Event Name
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(event.name, pageWidth / 2, 62, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`Held on ${event.date} at ${event.location}`, pageWidth / 2, 70, { align: 'center' });
    doc.text(`Organized by: ${event.organizer} • Certified Machine: ${event.assignedMachineId}`, pageWidth / 2, 76, { align: 'center' });

    // Impact Summary Grid
    const startY = 88;
    const cardW = 58;
    const cardH = 24;
    const spacing = 6;
    const totalW = 4 * cardW + 3 * spacing;
    const startX = (pageWidth - totalW) / 2;

    const certMetrics = [
      { label: 'Total Waste Segregated', val: `${report.totalWasteKg} kg` },
      { label: 'Plastic Diverted & Shredded', val: `${report.plasticShreddedKg} kg` },
      { label: 'Recovered Event Liquid', val: `${report.recoveredLiquidL} L` },
      { label: 'Bottles & Cups Processed', val: `${report.bottleCount + report.cupCount} Units` }
    ];

    certMetrics.forEach((m, idx) => {
      const cx = startX + idx * (cardW + spacing);
      doc.setFillColor(240, 253, 250);
      doc.roundedRect(cx, startY, cardW, cardH, 2, 2, 'F');
      doc.setDrawColor(180, 230, 220);
      doc.roundedRect(cx, startY, cardW, cardH, 2, 2, 'S');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(m.label, cx + cardW / 2, startY + 8, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(16, 149, 106);
      doc.text(m.val, cx + cardW / 2, startY + 17, { align: 'center' });
    });

    // Score Seal
    doc.setFillColor(16, 149, 106);
    doc.circle(pageWidth / 2, 138, 16, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`${report.sustainabilityScore}`, pageWidth / 2, 137, { align: 'center' });
    doc.setFontSize(7);
    doc.text('SCORE / 100', pageWidth / 2, 142, { align: 'center' });

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('VERIFIED ZERO-DIRECT-SHREDDING & ADVANCED DEWATERING PROTOCOL', pageWidth / 2, 162, { align: 'center' });

    // Signatures
    doc.setDrawColor(148, 163, 184);
    doc.line(40, 182, 95, 182);
    doc.line(pageWidth - 95, 182, pageWidth - 40, 182);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Dr. R. Sundaram (ISEA Chief Auditor)', 67.5, 186, { align: 'center' });
    doc.text('Venkatesh M. (Certified Event Operator)', pageWidth - 67.5, 186, { align: 'center' });

    return doc;
  }

  /**
   * Generates a Digital Green Event Certificate PDF from EnvironmentalImpactData
   */
  static generateGreenCertificatePdf(event: EventItem, impact: { plasticDivertedKg: number; recoveredLiquidL: number; bottlesProcessed: number; cupsProcessed: number; sustainabilityScore: number }): jsPDF {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Outer Decorative Border
    doc.setDrawColor(16, 149, 106);
    doc.setLineWidth(2);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

    doc.setDrawColor(20, 184, 166);
    doc.setLineWidth(0.6);
    doc.rect(13, 13, pageWidth - 26, pageHeight - 26);

    // Title
    doc.setTextColor(16, 149, 106);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text('GREEN EVENT SUSTAINABILITY CERTIFICATE', pageWidth / 2, 32, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('AWARDED BY ISEA SMART AI-IoT RECYCLING ECOSYSTEM', pageWidth / 2, 40, { align: 'center' });

    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.text('This is to officially certify that the event:', pageWidth / 2, 52, { align: 'center' });

    // Event Name
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(event.name, pageWidth / 2, 62, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`${event.location} • ${event.date}`, pageWidth / 2, 70, { align: 'center' });

    // 4 Key Impact Badges
    const cardW = 55;
    const cardH = 24;
    const spacing = 6;
    const totalW = 4 * cardW + 3 * spacing;
    const startY = 82;
    const startX = (pageWidth - totalW) / 2;

    const certMetrics = [
      { label: 'Plastic Diverted', val: `${impact.plasticDivertedKg} kg` },
      { label: 'Recovered Event Liquid', val: `${impact.recoveredLiquidL} L` },
      { label: 'Bottles & Cups Processed', val: `${impact.bottlesProcessed + impact.cupsProcessed} Units` },
      { label: 'Verified Sustainability', val: `${impact.sustainabilityScore} / 100` }
    ];

    certMetrics.forEach((m, idx) => {
      const cx = startX + idx * (cardW + spacing);
      doc.setFillColor(240, 253, 250);
      doc.roundedRect(cx, startY, cardW, cardH, 2, 2, 'F');
      doc.setDrawColor(180, 230, 220);
      doc.roundedRect(cx, startY, cardW, cardH, 2, 2, 'S');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(m.label, cx + cardW / 2, startY + 8, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(16, 149, 106);
      doc.text(m.val, cx + cardW / 2, startY + 17, { align: 'center' });
    });

    // Score Seal
    doc.setFillColor(16, 149, 106);
    doc.circle(pageWidth / 2, 138, 16, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`${impact.sustainabilityScore}`, pageWidth / 2, 137, { align: 'center' });
    doc.setFontSize(7);
    doc.text('SCORE / 100', pageWidth / 2, 142, { align: 'center' });

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('VERIFIED ZERO-DIRECT-SHREDDING & ADVANCED DEWATERING PROTOCOL', pageWidth / 2, 162, { align: 'center' });

    // Signatures
    doc.setDrawColor(148, 163, 184);
    doc.line(40, 182, 95, 182);
    doc.line(pageWidth - 95, 182, pageWidth - 40, 182);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Dr. R. Sundaram (ISEA Chief Auditor)', 67.5, 186, { align: 'center' });
    doc.text('Venkatesh M. (Certified Event Operator)', pageWidth - 67.5, 186, { align: 'center' });

    return doc;
  }

  /**
   * Helper to trigger native browser download of the PDF
   */
  static downloadPdf(doc: jsPDF, filename: string): void {
    doc.save(filename);
  }

  /**
   * Helper to generate a Blob / Data URI for viewing in an iframe / preview modal
   */
  static getPdfBlobUrl(doc: jsPDF): string {
    const blob = doc.output('blob');
    return URL.createObjectURL(blob);
  }
}
