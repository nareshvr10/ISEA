import React, { useState } from 'react';
import { 
  Smartphone, 
  Download, 
  X, 
  CheckCircle2, 
  ExternalLink, 
  Layers, 
  Terminal, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  FileCode,
  GitBranch,
  ArrowDownToLine
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface AndroidAppHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCodeExplorer: () => void;
}

export const AndroidAppHubModal: React.FC<AndroidAppHubModalProps> = ({
  isOpen,
  onClose,
  onOpenCodeExplorer
}) => {
  const { isInstallable, isInstalled, install, isAndroid } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'install' | 'apk' | 'architecture'>('install');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 text-white rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-950">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-base text-white">ISEA Android Application</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-400/30">
                  v1.0.0
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Native Jetpack Compose APK &amp; Instant Android PWA WebAPK
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-900/80 px-5 pt-2 gap-2 text-xs">
          <button
            onClick={() => setActiveTab('install')}
            className={`pb-2.5 px-3 font-semibold transition-all border-b-2 ${
              activeTab === 'install'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            📱 Instant Android Install
          </button>
          <button
            onClick={() => setActiveTab('apk')}
            className={`pb-2.5 px-3 font-semibold transition-all border-b-2 ${
              activeTab === 'apk'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            🤖 Build &amp; Download APK
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`pb-2.5 px-3 font-semibold transition-all border-b-2 ${
              activeTab === 'architecture'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚙️ Native Kotlin Architecture
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          
          {/* TAB 1: Instant Android Install (PWA / WebAPK) */}
          {activeTab === 'install' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-800/40 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-sm text-emerald-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>Zero-Compilation Android App Installation</span>
                    </h3>
                    <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                      Install ISEA directly on your Android phone or tablet as a standalone, fullscreen application with push alerts and offline cached operation.
                    </p>
                  </div>
                  {isInstalled && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold shrink-0">
                      ✓ Installed
                    </span>
                  )}
                </div>

                <div className="pt-2 flex flex-wrap gap-2.5">
                  {isInstallable ? (
                    <button
                      onClick={install}
                      className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-md transition-all text-xs"
                    >
                      <Download className="w-4 h-4" />
                      <span>Tap to Install to Android Home Screen</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/90 text-slate-300 rounded-xl border border-slate-700/80">
                      <Smartphone className="w-4 h-4 text-emerald-400" />
                      <span>Open on Android Chrome or Edge &rarr; tap menu (&vellip;) &rarr; <strong>Add to Home Screen / Install app</strong></span>
                    </div>
                  )}

                  <a
                    href="/ISEA-Android-Project.zip"
                    download="ISEA-Android-Project.zip"
                    className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl border border-slate-700 transition-colors"
                  >
                    <ArrowDownToLine className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Download Project .ZIP</span>
                  </a>
                </div>
              </div>

              {/* Android Installation Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-300 text-[11px]">
                    1
                  </div>
                  <h4 className="font-bold text-slate-200">Open in Chrome</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Open this app link in Google Chrome, Edge, or Samsung Internet on your Android device.
                  </p>
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-300 text-[11px]">
                    2
                  </div>
                  <h4 className="font-bold text-slate-200">Tap Install</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Tap the banner at the top, or tap the three dots (&vellip;) &rarr; select <strong>"Install app"</strong>.
                  </p>
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-300 text-[11px]">
                    3
                  </div>
                  <h4 className="font-bold text-slate-200">Launch App</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    The app launches from your home screen with its custom green icon, splash screen, and full-screen view.
                  </p>
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="p-3.5 bg-slate-800/40 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-slate-300 block">Native App Features Enabled:</span>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Background Machine Sync</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Real-time Waste Segregation</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Offline Metrics &amp; Persistence</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>PDF ESG Report Generation</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Build & Download Native APK */}
          {activeTab === 'apk' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-emerald-300 flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-emerald-400" />
                    <span>GitHub Automated APK Compiler (CI/CD)</span>
                  </h3>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-700/50 rounded-md text-[10px] font-mono">
                    .github/workflows/build-apk.yml
                  </span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  The repository includes a ready-to-use GitHub Actions workflow configured with OpenJDK 17 and Android Gradle Plugin 8.7.3. It compiles <strong>app-debug.apk</strong> automatically upon push!
                </p>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-slate-400 text-[11px] font-mono flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Automated Workflow Steps:</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-slate-300 text-[11px]">
                    <li><strong>Push to GitHub:</strong> In AI Studio, click <strong>Settings &rarr; Export to GitHub</strong>.</li>
                    <li><strong>Automatic Build:</strong> Go to your GitHub repo &rarr; <strong>Actions</strong> tab.</li>
                    <li><strong>Download APK:</strong> Click the completed run &rarr; under <strong>Artifacts</strong>, download <strong>ISEA-v1.0.0-debug-apk</strong>.</li>
                    <li><strong>Install on Android:</strong> Transfer to phone or download directly and tap <strong>Install</strong>!</li>
                  </ol>
                </div>
              </div>

              {/* Direct Project Download */}
              <div className="p-4 bg-emerald-950/40 border border-emerald-800/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-sm text-slate-100">Android Studio Ready Project</h4>
                  <p className="text-[11px] text-slate-400">
                    Includes Kotlin 2.0.21, Jetpack Compose Material 3, gradle.properties with AndroidX, and wrapper.
                  </p>
                </div>
                <a
                  href="/ISEA-Android-Project.zip"
                  download="ISEA-Android-Project.zip"
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-sm shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download ISEA Project .ZIP</span>
                </a>
              </div>

              <div className="text-center pt-1">
                <button
                  onClick={onOpenCodeExplorer}
                  className="text-emerald-400 hover:text-emerald-300 underline font-medium text-xs inline-flex items-center gap-1"
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Inspect Android Manifest, Gradle &amp; Kotlin Source Code</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Architecture Explorer */}
          {activeTab === 'architecture' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Package Structure</span>
                  </span>
                  <p className="text-[11px] text-slate-400 font-mono">
                    com.isea.app<br />
                    ├── MainActivity.kt<br />
                    ├── ui/ (Compose Screens &amp; Theme)<br />
                    ├── data/ (Firebase Realtime DB)<br />
                    └── pdf/ (Android FileProvider PDF)
                  </p>
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-teal-400" />
                    <span>Key Libraries</span>
                  </span>
                  <ul className="text-[11px] text-slate-400 space-y-0.5">
                    <li>• Jetpack Compose BOM 2024.11.00</li>
                    <li>• Material 3 (Dynamic Color &amp; Dark Mode)</li>
                    <li>• Firebase Realtime Database &amp; Cloud Messaging</li>
                    <li>• Google Maps Compose (Machine Map)</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-200 block">Want to edit Kotlin code?</span>
                  <span className="text-[11px] text-slate-400">View and copy the full native Android Kotlin source files.</span>
                </div>
                <button
                  onClick={onOpenCodeExplorer}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold rounded-lg border border-emerald-700/60 transition-colors text-xs"
                >
                  Open Code Inspector
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between text-slate-400 text-xs">
          <span>Target SDK: 35 (Android 15) • Min SDK: 24 (Android 7.0)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
