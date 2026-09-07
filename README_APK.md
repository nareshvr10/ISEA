# ISEA - Android APK Build & GitHub Automated Deployment Guide

This repository contains the complete native Android Jetpack Compose codebase for **ISEA (Smart AI-IoT Waste Recycling & Event Sustainability System)** under `/app`.

---

## Method 1: Automatic APK Build on GitHub (Recommended)

This repository includes a pre-configured GitHub Actions workflow:
📁 `.github/workflows/build-apk.yml`

### Steps:
1. **Push this repository to GitHub**:
   - In Google AI Studio, click **Settings > Export to GitHub** (or `git push origin main` from your terminal).
2. **Go to your GitHub Repository**:
   - Click on the **Actions** tab at the top.
   - You will see the **Build Android APK** workflow running automatically.
3. **Download your APK**:
   - Click on the completed workflow run.
   - Under **Artifacts** at the bottom of the summary page, click **`ISEA-v1.0.0-debug-apk`**.
   - Your `ISEA-v1.0.0-debug.apk` file will download directly to your computer or phone!
4. **Install on Android**:
   - Transfer the `.apk` file to your Android phone.
   - Tap to install (enable *"Install unknown apps"* if prompted).

---

## Method 2: Build Locally Using Android Studio

1. Download or clone this repository.
2. Open **Android Studio** (Koala / Ladybug or newer).
3. Select **Open** and choose this project folder.
4. Allow Gradle to sync dependencies.
5. In the top menu, click **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
6. Once compiled, click **locate** in the popup notification to find your `.apk` in:
   `app/build/outputs/apk/debug/app-debug.apk`

---

## Method 3: Build via Command Line (Terminal)

Ensure you have JDK 17 installed:
```bash
./gradlew assembleDebug
```
The resulting APK will be generated at:
```bash
app/build/outputs/apk/debug/app-debug.apk
```

---

## Features Included in the Android Native App
- **Real-time Firebase Sync**: Streams machine telemetry, alerts, and live waste detections.
- **Sequential Physical Processing Stages**: Visualizes liquid separation, dewatering, drying, and shredder states.
- **Event Liquid Recovery Tank**: Ultrasonic fill-gauge telemetry, 12V solenoid drain valve controls.
- **Green Event Sustainability Certificate**: Generates official PDF certificate using Android's native `PdfDocument`.
- **Multilingual Support**: English, Tamil (தமிழ்), and Hindi (हिन्दी).
