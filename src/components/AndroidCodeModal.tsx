import React, { useState } from 'react';
import { FileCode, Copy, Check, X, Folder, FileText, Download } from 'lucide-react';

interface AndroidCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ANDROID_FILES: { path: string; language: string; content: string }[] = [
  {
    path: 'app/src/main/AndroidManifest.xml',
    language: 'xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.isea.app">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

    <application
        android:name=".IseaApplication"
        android:allowBackup="true"
        android:label="@string/app_name"
        android:theme="@style/Theme.ISEA">

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.ISEA">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <provider
            android:name="androidx.core.content.FileProvider"
            android:authorities="\${applicationId}.fileprovider"
            android:exported="false"
            android:grantUriPermissions="true">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/file_paths" />
        </provider>

        <service
            android:name=".data.firebase.IseaFirebaseMessagingService"
            android:exported="false">
            <intent-filter>
                <action android:name="com.google.firebase.MESSAGING_EVENT" />
            </intent-filter>
        </service>
    </application>
</manifest>`
  },
  {
    path: 'app/src/main/java/com/isea/app/data/model/Models.kt',
    language: 'kotlin',
    content: `package com.isea.app.data.model

import com.google.firebase.database.IgnoreExtraProperties

enum class UserRole { ADMIN, OPERATOR, USER }
enum class HealthStatus { NORMAL, WARNING, CRITICAL, OFFLINE }
enum class WasteCategory { PLASTIC, PAPER, METAL, GLASS, ORGANIC, E_WASTE, HAZARD_REJECT }

@IgnoreExtraProperties
data class Machine(
    val id: String = "",
    val name: String = "",
    val eventId: String = "",
    val eventName: String = "",
    val lat: Double = 0.0,
    val lng: Double = 0.0,
    val isOnline: Boolean = true,
    val totalWasteKg: Double = 0.0,
    val plasticCollectedKg: Double = 0.0,
    val plasticShreddedKg: Double = 0.0,
    val recoveredLiquidL: Double = 0.0,
    val liquidTankCapacityL: Double = 10.0,
    val liquidTankStatus: String = "NORMAL",
    val bottlesCount: Int = 0,
    val cupsCount: Int = 0
)

/**
 * CRITICAL ENGINEERING RULE:
 * Free liquid is separated FIRST into Recovered/Event Liquid Tank.
 * Plastic is then dewatered, dried, shredded, weighed, and stored.
 */
@IgnoreExtraProperties
data class PlasticProcessing(
    val machineId: String = "",
    val liquidSeparation: String = "COMPLETE",
    val dewatering: String = "COMPLETE",
    val drying: String = "RUNNING",
    val shredding: String = "WAITING",
    val weighing: String = "WAITING",
    val storage: String = "READY",
    val inputPlasticWeightKg: Double = 0.0,
    val liquidRemovedLiters: Double = 0.0,
    val shreddedOutputWeightKg: Double = 0.0
)

@IgnoreExtraProperties
data class LiquidRecovery(
    val machineId: String = "",
    val currentVolumeL: Double = 0.0,
    val capacityL: Double = 10.0,
    val fillPercentage: Int = 0,
    val status: String = "NORMAL", // 0-70% NORMAL, 70-90% WARNING, 90%+ CRITICAL
    val overflowDetected: Boolean = false
)`
  },
  {
    path: 'app/src/main/java/com/isea/app/data/firebase/FirebaseManager.kt',
    language: 'kotlin',
    content: `package com.isea.app.data.firebase

import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.database.*
import com.isea.app.data.model.*
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow

class FirebaseManager {
    private val auth: FirebaseAuth by lazy { FirebaseAuth.getInstance() }
    private val database: FirebaseDatabase by lazy {
        FirebaseDatabase.getInstance().apply { setPersistenceEnabled(true) }
    }

    fun getMachineFlow(machineId: String): Flow<Machine?> = callbackFlow {
        val ref = database.getReference("machines").child(machineId)
        val listener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                trySend(snapshot.getValue(Machine::class.java))
            }
            override fun onCancelled(error: DatabaseError) { close(error.toException()) }
        }
        ref.addValueEventListener(listener)
        awaitClose { ref.removeEventListener(listener) }
    }
}`
  },
  {
    path: 'app/src/main/java/com/isea/app/utils/pdf/ReportPdfGenerator.kt',
    language: 'kotlin',
    content: `package com.isea.app.utils.pdf

import android.content.Context
import android.graphics.*
import android.graphics.pdf.PdfDocument
import com.isea.app.data.model.Report
import java.io.File
import java.io.FileOutputStream

object ReportPdfGenerator {
    fun generateReportPdf(context: Context, report: Report): File {
        val pdfDocument = PdfDocument()
        val pageInfo = PdfDocument.PageInfo.Builder(595, 842, 1).create()
        val page = pdfDocument.startPage(pageInfo)
        val canvas: Canvas = page.canvas
        val paint = Paint().apply { isAntiAlias = true }

        // Draw emerald banner
        paint.color = Color.rgb(16, 149, 106)
        canvas.drawRect(0f, 0f, 595f, 90f, paint)

        // Title
        paint.color = Color.WHITE
        paint.textSize = 22f
        canvas.drawText("ISEA", 40f, 45f, paint)
        paint.textSize = 12f
        canvas.drawText("Smart AI-IoT Waste Recycling & Event Sustainability System", 40f, 65f, paint)

        // Critical rule verification
        paint.color = Color.rgb(30, 41, 59)
        paint.textSize = 11f
        canvas.drawText("CRITICAL RULE: Liquid separated first into Event Liquid Tank.", 40f, 180f, paint)
        canvas.drawText("Plastic Dewatered & Dried before Conventional Shredder contact.", 40f, 200f, paint)

        pdfDocument.finishPage(page)
        val outputFile = File(context.cacheDir, "\${report.id}.pdf")
        val fos = FileOutputStream(outputFile)
        pdfDocument.writeTo(fos)
        fos.close()
        pdfDocument.close()
        return outputFile
    }
}`
  },
  {
    path: 'app/build.gradle.kts',
    language: 'kotlin',
    content: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.google.gms.google.services)
}

android {
    namespace = "com.isea.app"
    compileSdk = 35
    defaultConfig {
        applicationId = "com.isea.app"
        minSdk = 26
        targetSdk = 35
    }
}

dependencies {
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.material3)
    implementation(platform("com.google.firebase:firebase-bom:33.4.0"))
    implementation("com.google.firebase:firebase-auth-ktx")
    implementation("com.google.firebase:firebase-database-ktx")
    implementation("com.google.maps.android:maps-compose:4.4.1")
}`
  },
  {
    path: '.github/workflows/build-apk.yml',
    language: 'yaml',
    content: `name: Build Android APK

on:
  push:
    branches: [ "**" ]
    tags: [ "v*" ]
  pull_request:
    branches: [ "**" ]
  workflow_dispatch:

jobs:
  build-apk:
    name: Build Android Debug & Release APK
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'
          cache: 'gradle'

      - name: Ensure Gradle Wrapper Exists
        run: |
          mkdir -p gradle/wrapper
          curl -fsSL https://raw.githubusercontent.com/gradle/gradle/v8.9.0/gradle/wrapper/gradle-wrapper.jar -o gradle/wrapper/gradle-wrapper.jar
          chmod +x gradlew
          ls -lh gradle/wrapper/gradle-wrapper.jar

      - name: Setup Gradle
        uses: gradle/actions/setup-gradle@v4
        with:
          gradle-version: '8.9'

      - name: Build Debug APK
        run: |
          if command -v gradle &> /dev/null; then
            gradle assembleDebug --stacktrace --no-daemon
          else
            ./gradlew assembleDebug --stacktrace --no-daemon
          fi

      - name: Upload APK as GitHub Download Artifact
        uses: actions/upload-artifact@v4
        with:
          name: ISEA-v1.0.0-debug-apk
          path: app/build/outputs/apk/debug/app-debug.apk
          retention-days: 30`
  },
  {
    path: 'README_APK.md',
    language: 'markdown',
    content: `# ISEA - Android APK Build & GitHub Automated Deployment Guide

### Automatic APK Build on GitHub:
1. Push this repository to GitHub (Settings > Export to GitHub).
2. Go to your GitHub Repository > **Actions** tab.
3. The "Build Android APK" workflow runs automatically.
4. Click on the completed run, and under **Artifacts**, download **ISEA-v1.0.0-debug-apk**!
5. Install directly on your Android phone!`
  }
];

export const AndroidCodeModal: React.FC<AndroidCodeModalProps> = ({ isOpen, onClose }) => {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentFile = ANDROID_FILES[activeFileIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-950 text-slate-100 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col h-[85vh]">
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-600/20 text-emerald-400 rounded-lg">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Native Android Kotlin Architecture &amp; APK Builder</h3>
              <p className="text-[11px] text-slate-400">
                com.isea.app • Jetpack Compose • Material 3 • Automated GitHub APK CI/CD
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/ISEA-Android-Project.zip"
              download="ISEA-Android-Project.zip"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
              title="Download full Android project to build in Android Studio or Gradle"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Project .ZIP</span>
            </a>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* GitHub APK Builder Banner */}
        <div className="bg-emerald-950/60 border-b border-emerald-800/40 px-5 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="text-emerald-300 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              <strong>Automatic APK Build on GitHub:</strong> Push this repo to GitHub &rarr; check the <strong>Actions</strong> tab &rarr; download <strong>ISEA-v1.0.0-debug-apk</strong>!
            </span>
          </div>
          <div className="text-[11px] text-emerald-400/80 shrink-0">
            Workflows: <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-300">.github/workflows/build-apk.yml</code>
          </div>
        </div>

        {/* Body Split */}
        <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
          {/* File Tree Sidebar */}
          <div className="w-full sm:w-64 bg-slate-900/50 border-r border-slate-800 p-2 overflow-y-auto space-y-1">
            <div className="text-[11px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">
              Project Structure
            </div>
            {ANDROID_FILES.map((file, idx) => {
              const isSelected = idx === activeFileIndex;
              const fileName = file.path.split('/').pop();
              return (
                <button
                  key={idx}
                  onClick={() => setActiveFileIndex(idx)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center gap-2 ${
                    isSelected
                      ? 'bg-emerald-600/20 text-emerald-400 font-bold border border-emerald-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{fileName}</span>
                </button>
              );
            })}
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
            <div className="px-4 py-2 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="truncate">{currentFile.path}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-sans text-xs transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="flex-1 p-4 overflow-auto font-mono text-xs text-emerald-300 leading-relaxed bg-slate-950/90">
              <code>{currentFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
