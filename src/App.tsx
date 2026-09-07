import React, { useState } from 'react';
import { 
  User, 
  UserRole, 
  Language, 
  Machine, 
  EventItem, 
  PlasticProcessingState, 
  LiquidRecoveryState, 
  WasteDetection, 
  AlertItem, 
  EnvironmentalImpact,
  ReportItem
} from './types';
import { 
  mockUsers, 
  allMachines, 
  mockEvents, 
  initialPlasticProcessing, 
  initialLiquidRecovery, 
  sampleDetections, 
  mockAlerts, 
  mockEnvironmentalImpact,
  mockReports
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNavigation, MainTab } from './components/BottomNavigation';
import { UniversalInputSimulatorModal } from './components/UniversalInputSimulatorModal';
import { PdfPreviewModal } from './components/PdfPreviewModal';
import { EventQrModal } from './components/EventQrModal';
import { AndroidCodeModal } from './components/AndroidCodeModal';

import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { MachinesScreen } from './screens/MachinesScreen';
import { WasteScreen } from './screens/WasteScreen';
import { AnalyticsScreen } from './screens/AnalyticsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { PlasticProcessingScreen } from './screens/PlasticProcessingScreen';
import { LiquidRecoveryScreen } from './screens/LiquidRecoveryScreen';
import { CertificateScreen } from './screens/CertificateScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { SplashScreen } from './screens/SplashScreen';

import { Smartphone, Monitor } from 'lucide-react';

export function App() {
  // Authentication & User State
  const [showSplashScreen, setShowSplashScreen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[1]); // Operator
  const [lang, setLang] = useState<Language>('en');
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isMobileFrame, setIsMobileFrame] = useState(false);

  // Navigation State
  const [activeTab, setActiveTab] = useState<MainTab>('HOME');
  const [subScreen, setSubScreen] = useState<
    'PLASTIC_PROCESSING' | 'LIQUID_RECOVERY' | 'CERTIFICATE' | 'NOTIFICATIONS' | null
  >(null);

  // Modals
  const [isUniversalInputOpen, setIsUniversalInputOpen] = useState(false);
  const [activePdfReport, setActivePdfReport] = useState<ReportItem | null>(null);
  const [isEventQrOpen, setIsEventQrOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  // Data & Telemetry State
  const [machines, setMachines] = useState<Machine[]>(allMachines);
  const [selectedMachineId, setSelectedMachineId] = useState<string>(allMachines[0].id);
  const [currentEvent, setCurrentEvent] = useState<EventItem>(mockEvents[0]);
  const [plasticProcessing, setPlasticProcessing] = useState<PlasticProcessingState>(initialPlasticProcessing);
  const [liquidRecovery, setLiquidRecovery] = useState<LiquidRecoveryState>(initialLiquidRecovery);
  const [recentDetections, setRecentDetections] = useState<WasteDetection[]>(sampleDetections);
  const [alerts, setAlerts] = useState<AlertItem[]>(mockAlerts);
  const [impact, setImpact] = useState<EnvironmentalImpact>(mockEnvironmentalImpact);

  const currentMachine = machines.find((m) => m.id === selectedMachineId) || machines[0];

  // Refresh Telemetry Handler
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  // Process Waste from Universal Input
  const handleProcessWaste = (detection: WasteDetection) => {
    setRecentDetections((prev) => [detection, ...prev]);

    // Update machine and liquid stats
    const addedKg = Number((detection.weightGrams / 1000).toFixed(2));
    const addedLiquidL = Number((detection.residualLiquidMl / 1000).toFixed(3));

    setMachines((prev) =>
      prev.map((m) => {
        if (m.id === selectedMachineId) {
          const newWasteKg = Number((m.totalWasteKg + addedKg).toFixed(2));
          const newPlasticKg = detection.category === 'Plastic' ? Number((m.plasticCollectedKg + addedKg).toFixed(2)) : m.plasticCollectedKg;
          const newShreddedKg = detection.category === 'Plastic' ? Number((m.plasticShreddedKg + (addedKg * 0.9)).toFixed(2)) : m.plasticShreddedKg;
          const newLiquidL = Number((m.recoveredLiquidL + addedLiquidL).toFixed(2));

          return {
            ...m,
            totalWasteKg: newWasteKg,
            plasticCollectedKg: newPlasticKg,
            plasticShreddedKg: newShreddedKg,
            recoveredLiquidL: newLiquidL,
            bottlesCount: detection.objectName.toLowerCase().includes('bottle') ? m.bottlesCount + 1 : m.bottlesCount,
            cupsCount: detection.objectName.toLowerCase().includes('cup') ? m.cupsCount + 1 : m.cupsCount,
            containersCount: detection.objectName.toLowerCase().includes('container') ? m.containersCount + 1 : m.containersCount
          };
        }
        return m;
      })
    );

    // Update liquid tank state
    setLiquidRecovery((prev) => {
      const newVol = Number((prev.currentVolumeL + addedLiquidL).toFixed(2));
      const fillPct = Math.min(100, Math.round((newVol / prev.capacityL) * 100));
      return {
        ...prev,
        currentVolumeL: newVol,
        fillPercentage: fillPct,
        status: fillPct > 90 ? 'CRITICAL' : fillPct >= 70 ? 'WARNING' : 'NORMAL'
      };
    });

    // Update Plastic processing telemetry
    if (detection.category === 'Plastic') {
      setPlasticProcessing((prev) => ({
        ...prev,
        inputPlasticWeightKg: Number((prev.inputPlasticWeightKg + addedKg).toFixed(2)),
        liquidRemovedLiters: Number((prev.liquidRemovedLiters + addedLiquidL).toFixed(2)),
        shreddedOutputWeightKg: Number((prev.shreddedOutputWeightKg + (addedKg * 0.9)).toFixed(2))
      }));

      setImpact((prev) => ({
        ...prev,
        plasticDivertedKg: Number((prev.plasticDivertedKg + addedKg).toFixed(1)),
        co2AvoidedKg: Number((prev.co2AvoidedKg + (addedKg * 1.8)).toFixed(1)),
        recoveredLiquidL: Number((prev.recoveredLiquidL + addedLiquidL).toFixed(1)),
        bottlesProcessed: detection.objectName.toLowerCase().includes('bottle') ? prev.bottlesProcessed + 1 : prev.bottlesProcessed,
        cupsProcessed: detection.objectName.toLowerCase().includes('cup') ? prev.cupsProcessed + 1 : prev.cupsProcessed
      }));
    }
  };

  // Drain tank
  const handleDrainTank = () => {
    setLiquidRecovery((prev) => ({
      ...prev,
      currentVolumeL: 0,
      fillPercentage: 0,
      status: 'NORMAL'
    }));

    setMachines((prev) =>
      prev.map((m) => (m.id === selectedMachineId ? { ...m, recoveredLiquidL: 0 } : m))
    );
  };

  // Open Report Modal
  const handleOpenReport = (type: 'DAILY' | 'WEEKLY' | 'MONTHLY') => {
    const r = mockReports.find((item) => item.type === type) || mockReports[0];
    setActivePdfReport(r);
  };

  if (showSplashScreen) {
    return (
      <SplashScreen
        onFinish={() => setShowSplashScreen(false)}
        onSkip={() => setShowSplashScreen(false)}
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginScreen
        onLoginSuccess={(role, email) => {
          setCurrentUser((prev) => ({
            ...prev,
            role,
            email,
            name: role === 'ADMIN' ? 'Fleet Administrator' : role === 'OPERATOR' ? 'Kalyana Mandapam Operator' : 'Event Guest'
          }));
          setIsAuthenticated(true);
        }}
        lang={lang}
      />
    );
  }

  return (
    <div className="min-h-screen text-[#2D3436] flex flex-col items-center justify-start relative overflow-x-hidden">
      {/* PRIMARY AND FIXED BACKGROUND IMAGE - ISEA ECO-TECH BRAND IDENTITY */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none select-none"
        style={{ backgroundImage: "url('/ecotech_bg.jpg')" }}
      >
        {/* Subtle, translucent wash strictly preserving the original visual elements:
            - Leaves (top-left)
            - Eco-tech network icons (top-right)
            - Recycling symbol (mid-right)
            - Event / Wedding venue visual (bottom-left)
            - Green/teal wave design & sustainability globe (bottom-right)
        */}
        <div className="absolute inset-0 bg-white/15 backdrop-blur-[0.5px]" />
      </div>

      {/* Frame View Toggle Floating Button (Top-Right) */}
      <div className="fixed top-2 right-2 z-40 hidden md:flex items-center gap-1 bg-white/80 backdrop-blur-md p-1 rounded-2xl shadow-sm border border-emerald-100 text-xs">
        <button
          onClick={() => setIsMobileFrame(false)}
          className={`flex items-center gap-1 px-3 py-1 rounded-xl font-bold transition-all ${
            !isMobileFrame ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-emerald-900'
          }`}
          title="Wide Responsive Dashboard Mode"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Full Dashboard</span>
        </button>
        <button
          onClick={() => setIsMobileFrame(true)}
          className={`flex items-center gap-1 px-3 py-1 rounded-xl font-bold transition-all ${
            isMobileFrame ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-emerald-900'
          }`}
          title="Mobile Android Kiosk Phone View"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile Phone</span>
        </button>
      </div>

      {/* Main Container */}
      <div
        className={`relative z-10 w-full transition-all duration-300 ${
          isMobileFrame
            ? 'max-w-md my-4 min-h-[840px] rounded-[2.5rem] shadow-2xl border-[8px] border-slate-800 bg-transparent overflow-hidden flex flex-col'
            : 'max-w-5xl min-h-screen flex flex-col'
        }`}
      >
        {/* In Mobile Frame mode: duplicate the eco-tech fixed background directly inside the frame */}
        {isMobileFrame && (
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
            style={{ backgroundImage: "url('/ecotech_bg.jpg')" }}
          >
            <div className="absolute inset-0 bg-white/15 backdrop-blur-[0.5px]" />
          </div>
        )}

        {/* Mobile Camera Notch (only in mobile frame mode) */}
        {isMobileFrame && (
          <div className="w-full bg-slate-900 h-6 flex items-center justify-center shrink-0 z-20">
            <div className="w-20 h-3 bg-black rounded-full" />
          </div>
        )}

        {/* Global Header */}
        <Header
          currentUser={currentUser}
          currentMachine={currentMachine}
          lang={lang}
          onLanguageChange={setLang}
          isDemoMode={isDemoMode}
          onToggleDemoMode={() => setIsDemoMode(!isDemoMode)}
          onOpenNotifications={() => setSubScreen('NOTIFICATIONS')}
          unreadAlertCount={alerts.filter((a) => a.severity === 'CRITICAL' || a.severity === 'WARNING').length}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />

        {/* Dynamic Screen View */}
        <main className="flex-1 p-3 sm:p-5 overflow-y-auto">
          {/* Sub Screens */}
          {subScreen === 'PLASTIC_PROCESSING' ? (
            <div className="space-y-3">
              <button
                onClick={() => setSubScreen(null)}
                className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 mb-2"
              >
                &larr; Back to Main View
              </button>
              <PlasticProcessingScreen
                plasticProcessing={plasticProcessing}
                lang={lang}
                onOpenUniversalInput={() => setIsUniversalInputOpen(true)}
              />
            </div>
          ) : subScreen === 'LIQUID_RECOVERY' ? (
            <div className="space-y-3">
              <button
                onClick={() => setSubScreen(null)}
                className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 mb-2"
              >
                &larr; Back to Main View
              </button>
              <LiquidRecoveryScreen
                liquidRecovery={liquidRecovery}
                lang={lang}
                onDrainTank={handleDrainTank}
              />
            </div>
          ) : subScreen === 'CERTIFICATE' ? (
            <CertificateScreen
              event={currentEvent}
              impact={impact}
              lang={lang}
              onBack={() => setSubScreen(null)}
            />
          ) : subScreen === 'NOTIFICATIONS' ? (
            <NotificationsScreen
              alerts={alerts}
              lang={lang}
              onBack={() => setSubScreen(null)}
              onClearAlerts={() => setAlerts([])}
            />
          ) : (
            <>
              {/* Primary 5 Tabs */}
              {activeTab === 'HOME' && (
                <HomeScreen
                  currentMachine={currentMachine}
                  currentEvent={currentEvent}
                  plasticProcessing={plasticProcessing}
                  liquidRecovery={liquidRecovery}
                  alerts={alerts}
                  lang={lang}
                  onOpenUniversalInput={() => setIsUniversalInputOpen(true)}
                  onOpenPlasticProcessing={() => setSubScreen('PLASTIC_PROCESSING')}
                  onOpenLiquidRecovery={() => setSubScreen('LIQUID_RECOVERY')}
                  onOpenReport={handleOpenReport}
                  onOpenCertificate={() => setSubScreen('CERTIFICATE')}
                  onOpenQrModal={() => setIsEventQrOpen(true)}
                  onNavigateToTab={(t) => setActiveTab(t)}
                  onOpenCodeExplorer={() => setIsCodeModalOpen(true)}
                />
              )}

              {activeTab === 'MACHINES' && (
                <MachinesScreen
                  machines={machines}
                  selectedMachineId={selectedMachineId}
                  onSelectMachine={setSelectedMachineId}
                  lang={lang}
                  onOpenUniversalInput={() => setIsUniversalInputOpen(true)}
                />
              )}

              {activeTab === 'WASTE' && (
                <WasteScreen
                  bins={currentMachine.bins}
                  recentDetections={recentDetections}
                  lang={lang}
                  onOpenUniversalInput={() => setIsUniversalInputOpen(true)}
                />
              )}

              {activeTab === 'ANALYTICS' && (
                <AnalyticsScreen
                  impact={impact}
                  lang={lang}
                  onOpenReport={handleOpenReport}
                  onOpenCertificate={() => setSubScreen('CERTIFICATE')}
                />
              )}

              {activeTab === 'PROFILE' && (
                <ProfileScreen
                  currentUser={currentUser}
                  onRoleChange={(role) => setCurrentUser((prev) => ({ ...prev, role }))}
                  lang={lang}
                  onLanguageChange={setLang}
                  isDemoMode={isDemoMode}
                  onToggleDemoMode={() => setIsDemoMode(!isDemoMode)}
                  onLogout={() => setIsAuthenticated(false)}
                  onOpenCodeExplorer={() => setIsCodeModalOpen(true)}
                  onShowSplash={() => setShowSplashScreen(true)}
                />
              )}
            </>
          )}
        </main>

        {/* Global Bottom Navigation (Material 3) */}
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={(tab) => {
            setSubScreen(null);
            setActiveTab(tab);
          }}
          lang={lang}
        />
      </div>

      {/* Geometric Balance Floating Machine Telemetry Badge */}
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-8 z-30 pointer-events-auto">
        <div className="bg-emerald-600 text-white px-4 py-2 rounded-full font-bold text-xs shadow-lg flex items-center gap-2 border border-emerald-400/30 tracking-tight backdrop-blur-xs">
          <div className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>MACHINE {currentMachine.id} | {currentMachine.isOnline ? 'ONLINE' : 'STANDBY'}</span>
        </div>
      </div>

      {/* Universal Waste Input Chute Simulator Modal */}
      <UniversalInputSimulatorModal
        isOpen={isUniversalInputOpen}
        onClose={() => setIsUniversalInputOpen(false)}
        onProcessWaste={handleProcessWaste}
      />

      {/* PDF View / Download / Share Modal */}
      <PdfPreviewModal
        isOpen={activePdfReport !== null}
        onClose={() => setActivePdfReport(null)}
        report={activePdfReport}
      />

      {/* Event QR Modal */}
      <EventQrModal
        isOpen={isEventQrOpen}
        onClose={() => setIsEventQrOpen(false)}
        event={currentEvent}
        machine={currentMachine}
        currentUser={currentUser}
      />

      {/* Android Kotlin Code Explorer Modal */}
      <AndroidCodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />

      {/* Geometric Balance Machine Status Floating Badge */}
      <div className="fixed bottom-20 right-6 z-30 hidden lg:flex pointer-events-none">
        <div className="bg-emerald-600 text-white px-3.5 py-1.5 rounded-full font-bold text-xs shadow-lg flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span className="font-mono uppercase tracking-tight">
            {currentMachine.id} | {currentMachine.isOnline ? 'ONLINE' : 'STANDBY'}
          </span>
        </div>
      </div>
    </div>
  );
}
export default App;
