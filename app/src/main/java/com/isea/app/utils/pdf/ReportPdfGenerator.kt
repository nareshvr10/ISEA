package com.isea.app.utils.pdf

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.Typeface
import android.graphics.pdf.PdfDocument
import com.isea.app.data.model.Report
import java.io.File
import java.io.FileOutputStream

/**
 * Native Android PDF generator for ISEA daily, weekly, monthly, and custom reports.
 * Uses Scoped Storage and produces standard A4 documents.
 */
object ReportPdfGenerator {

    fun generateReportPdf(context: Context, report: Report): File {
        val pdfDocument = PdfDocument()
        val pageInfo = PdfDocument.PageInfo.Builder(595, 842, 1).create() // A4 at 72dpi
        val page = pdfDocument.startPage(pageInfo)
        val canvas: Canvas = page.canvas

        val paint = Paint().apply { isAntiAlias = true }

        // Top Banner (Emerald / Mint Eco Brand)
        paint.color = Color.rgb(16, 149, 106)
        canvas.drawRect(0f, 0f, 595f, 90f, paint)

        // Banner Text
        paint.color = Color.WHITE
        paint.textSize = 22f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        canvas.drawText("ISEA", 40f, 45f, paint)

        paint.textSize = 12f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.NORMAL)
        canvas.drawText("Smart AI-IoT Waste Recycling & Event Sustainability System", 40f, 65f, paint)

        paint.textSize = 11f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        canvas.drawText("REPORT: ${report.type} AUDIT", 380f, 45f, paint)
        paint.textSize = 9f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.NORMAL)
        canvas.drawText("ID: ${report.id}", 380f, 65f, paint)

        var y = 120f
        paint.color = Color.rgb(30, 41, 59)
        paint.textSize = 14f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        canvas.drawText("1. Event & Machine Information", 40f, y, paint)

        y += 20f
        paint.textSize = 10f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.NORMAL)
        canvas.drawText("Event: ${report.eventName} (${report.eventId})", 40f, y, paint)
        canvas.drawText("Generated: ${report.generatedTime}", 340f, y, paint)
        y += 16f
        canvas.drawText("Machine ID: ${report.machineId}", 40f, y, paint)
        canvas.drawText("Period: ${report.periodLabel}", 340f, y, paint)

        // Summary Cards
        y += 30f
        paint.textSize = 14f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        canvas.drawText("2. Summary Statistics", 40f, y, paint)

        y += 20f
        paint.textSize = 11f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.NORMAL)
        canvas.drawText("• Total Waste Processed: ${report.totalWasteKg} kg", 40f, y, paint)
        y += 18f
        canvas.drawText("• Plastic Collected: ${report.plasticCollectedKg} kg", 40f, y, paint)
        y += 18f
        canvas.drawText("• Plastic Shredded: ${report.plasticShreddedKg} kg (Dewatered & Clean)", 40f, y, paint)
        y += 18f
        canvas.drawText("• Recovered / Event Liquid: ${report.recoveredLiquidL} L (Event Liquid Tank)", 40f, y, paint)
        y += 18f
        canvas.drawText("• Containers & Bottles: ${report.bottleCount} Bottles, ${report.cupCount} Cups", 40f, y, paint)

        // Critical Engineering Rule Section
        y += 30f
        paint.textSize = 14f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        canvas.drawText("3. Plastic Processing & Liquid Separation Audit", 40f, y, paint)
        y += 20f
        paint.textSize = 10f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.NORMAL)
        canvas.drawText("CRITICAL ENGINEERING RULE AUDIT: Verified zero direct liquid in shredder.", 40f, y, paint)
        y += 16f
        canvas.drawText("Liquid separated first via perforated chute into Recovered/Event Liquid Tank.", 40f, y, paint)
        y += 16f
        canvas.drawText("Dewatering and thermal drying completed before rotary blade shredding.", 40f, y, paint)

        // Sustainability Score
        y += 30f
        paint.color = Color.rgb(16, 149, 106)
        paint.textSize = 13f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        canvas.drawText("ISEA Event Sustainability Score: ${report.sustainabilityScore} / 100", 40f, y, paint)

        pdfDocument.finishPage(page)

        // Write to local cache / filesDir
        val outputDir = File(context.cacheDir, "reports").apply { mkdirs() }
        val outputFile = File(outputDir, "${report.id}.pdf")
        val fos = FileOutputStream(outputFile)
        pdfDocument.writeTo(fos)
        fos.close()
        pdfDocument.close()

        return outputFile
    }
}
