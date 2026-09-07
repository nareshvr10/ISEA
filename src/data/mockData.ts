import { Machine, EventItem, WasteDetection, PlasticProcessingState, LiquidRecoveryState, AlertItem, AnomalyItem, MaintenanceItem, PickupRequest, ReportItem, EnvironmentalImpactData, User } from '../types';

export const mockUsers: User[] = [
  {
    id: 'usr_admin',
    name: 'Dr. R. Sundaram',
    email: 'admin@isea-recycle.io',
    role: 'ADMIN',
    phone: '+91 98401 23456',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    points: 850
  },
  {
    id: 'usr_operator',
    name: 'Venkatesh Murugan',
    email: 'operator@mandapam.com',
    role: 'OPERATOR',
    phone: '+91 94432 87654',
    assignedEventId: 'evt_001',
    assignedMachineId: 'ISEA-MC-001',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    points: 420
  },
  {
    id: 'usr_guest',
    name: 'Priya Narayanan',
    email: 'priya.n@gmail.com',
    role: 'USER',
    phone: '+91 97910 11223',
    assignedEventId: 'evt_001',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    points: 65
  }
];

export const mockEvents: EventItem[] = [
  {
    id: 'evt_001',
    name: 'Karthik & Ananya Grand Wedding Reception',
    type: 'Wedding',
    date: '2026-09-06',
    startTime: '09:00 AM',
    endTime: '11:00 PM',
    location: 'Sri Radha Kalyana Mandapam, Mylapore, Chennai',
    organizer: 'Venkatesan Celebrations & Catering',
    assignedMachineId: 'ISEA-MC-001',
    status: 'ACTIVE',
    totalAttendees: 1200
  },
  {
    id: 'evt_002',
    name: 'National Clean Energy & Green Tech Fest',
    type: 'College Event',
    date: '2026-09-07',
    startTime: '08:30 AM',
    endTime: '06:00 PM',
    location: 'Anna University Convention Auditorium, Chennai',
    organizer: 'EcoEngineering Council',
    assignedMachineId: 'ISEA-MC-002',
    status: 'UPCOMING',
    totalAttendees: 2400
  },
  {
    id: 'evt_003',
    name: 'South Heritage Music & Food Cultural Festival',
    type: 'Festival',
    date: '2026-09-05',
    startTime: '10:00 AM',
    endTime: '10:00 PM',
    location: 'Madurai Palace Ground, Madurai',
    organizer: 'Tamil Cultural Department',
    assignedMachineId: 'ISEA-MC-003',
    status: 'COMPLETED',
    totalAttendees: 3800
  }
];

export const initialMachine: Machine = {
  id: 'ISEA-MC-001',
  name: 'ISEA Kiosk Mandapam Unit #1',
  eventId: 'evt_001',
  eventName: 'Karthik & Ananya Grand Wedding Reception',
  location: {
    lat: 13.0334,
    lng: 80.2678,
    address: 'Sri Radha Kalyana Mandapam, Mylapore, Chennai'
  },
  isOnline: true,
  status: 'NORMAL',
  lastCommunication: 'Just now (ESP32 via 4G LTE)',
  powerStatus: 'ON',
  cameraStatus: 'ACTIVE',
  sensorStatus: 'OK',
  conveyorStatus: 'RUNNING',
  shredderStatus: 'IDLE',
  motorStatus: 'NORMAL',
  networkStatus: '4G_ONLINE',
  temperatureC: 34.2,
  totalWasteKg: 14.8,
  plasticCollectedKg: 9.4,
  plasticShreddedKg: 6.8,
  recoveredLiquidL: 2.6,
  liquidTankCapacityL: 10.0,
  liquidTankStatus: 'NORMAL',
  bottlesCount: 198,
  cupsCount: 112,
  containersCount: 44,
  bins: [
    { id: 'b_1', category: 'Plastic', fillPercentage: 58, weightKg: 9.4, capacityKg: 20.0, status: 'NORMAL', color: '#10B981' },
    { id: 'b_2', category: 'Paper', fillPercentage: 35, weightKg: 2.1, capacityKg: 15.0, status: 'NORMAL', color: '#3B82F6' },
    { id: 'b_3', category: 'Metal', fillPercentage: 20, weightKg: 1.4, capacityKg: 15.0, status: 'NORMAL', color: '#F59E0B' },
    { id: 'b_4', category: 'Glass', fillPercentage: 12, weightKg: 0.9, capacityKg: 20.0, status: 'NORMAL', color: '#8B5CF6' },
    { id: 'b_5', category: 'Organic', fillPercentage: 42, weightKg: 1.8, capacityKg: 25.0, status: 'NORMAL', color: '#14B8A6' },
    { id: 'b_6', category: 'E-waste', fillPercentage: 5, weightKg: 0.1, capacityKg: 10.0, status: 'NORMAL', color: '#EC4899' },
    { id: 'b_7', category: 'Hazard / Reject', fillPercentage: 8, weightKg: 0.15, capacityKg: 10.0, status: 'NORMAL', color: '#EF4444' },
  ],
  components: [
    { id: 'c1', name: 'AI Optical Vision Camera', status: 'NORMAL', metrics: '1080p 60fps • 96.4% avg conf', lastChecked: '1m ago' },
    { id: 'c2', name: 'Universal Waste Detection AI', status: 'NORMAL', metrics: 'Latency 34ms • Edge TPU', lastChecked: '1m ago' },
    { id: 'c3', name: 'Universal Input Conveyor', status: 'NORMAL', metrics: 'Speed 0.25 m/s • 3.2A', lastChecked: 'Just now' },
    { id: 'c4', name: 'Liquid Separation System', status: 'NORMAL', metrics: 'Perforated drain grid active', lastChecked: 'Just now' },
    { id: 'c5', name: 'Plastic Dewatering Centrifuge', status: 'NORMAL', metrics: 'Moisture red. -94%', lastChecked: '3m ago' },
    { id: 'c6', name: 'Thermal Air Dryer', status: 'NORMAL', metrics: 'Temp 48°C • Airflow 120 CFM', lastChecked: '3m ago' },
    { id: 'c7', name: 'Twin-Shaft Shredder', status: 'NORMAL', metrics: 'Torque 65 Nm • 140 RPM', lastChecked: '5m ago' },
    { id: 'c8', name: 'High-Torque Drive Motor', status: 'NORMAL', metrics: 'Temp 38.6°C • No vibration', lastChecked: '2m ago' },
    { id: 'c9', name: 'Multi-Point Load Cells', status: 'NORMAL', metrics: 'Precision ±1g calibrated', lastChecked: '10m ago' },
    { id: 'c10', name: 'Recovered Liquid Level Sensor', status: 'NORMAL', metrics: 'Ultrasonic 2.6L / 10L', lastChecked: 'Just now' },
    { id: 'c11', name: 'Smart Bin Ultrasonic Sensors', status: 'NORMAL', metrics: '7/7 Bins reporting', lastChecked: 'Just now' },
    { id: 'c12', name: 'IoT Microcontroller (ESP32-S3)', status: 'NORMAL', metrics: 'Uptime 14h 28m • 3.3V', lastChecked: 'Just now' },
    { id: 'c13', name: 'Industrial 4G LTE Gateway', status: 'NORMAL', metrics: 'Signal -68 dBm • Latency 22ms', lastChecked: 'Just now' }
  ]
};

export const allMachines: Machine[] = [
  initialMachine,
  {
    id: 'ISEA-MC-002',
    name: 'ISEA Kiosk Auditorium Unit #2',
    eventId: 'evt_002',
    eventName: 'National Clean Energy & Green Tech Fest',
    location: {
      lat: 13.0118,
      lng: 80.2366,
      address: 'Anna University Convention Auditorium, Chennai'
    },
    isOnline: true,
    status: 'WARNING',
    lastCommunication: '2m ago (ESP32 via WiFi)',
    powerStatus: 'ON',
    cameraStatus: 'ACTIVE',
    sensorStatus: 'OK',
    conveyorStatus: 'IDLE',
    shredderStatus: 'WAITING',
    motorStatus: 'NORMAL',
    networkStatus: 'WIFI_ONLINE',
    temperatureC: 36.8,
    totalWasteKg: 28.4,
    plasticCollectedKg: 18.2,
    plasticShreddedKg: 14.6,
    recoveredLiquidL: 7.8, // 78% -> WARNING!
    liquidTankCapacityL: 10.0,
    liquidTankStatus: 'WARNING',
    bottlesCount: 390,
    cupsCount: 240,
    containersCount: 88,
    bins: [
      { id: 'b_21', category: 'Plastic', fillPercentage: 82, weightKg: 18.2, capacityKg: 20.0, status: 'ALMOST FULL', color: '#10B981' },
      { id: 'b_22', category: 'Paper', fillPercentage: 45, weightKg: 4.8, capacityKg: 15.0, status: 'NORMAL', color: '#3B82F6' },
      { id: 'b_23', category: 'Metal', fillPercentage: 30, weightKg: 2.6, capacityKg: 15.0, status: 'NORMAL', color: '#F59E0B' },
      { id: 'b_24', category: 'Glass', fillPercentage: 15, weightKg: 1.2, capacityKg: 20.0, status: 'NORMAL', color: '#8B5CF6' },
      { id: 'b_25', category: 'Organic', fillPercentage: 55, weightKg: 3.4, capacityKg: 25.0, status: 'NORMAL', color: '#14B8A6' },
      { id: 'b_26', category: 'E-waste', fillPercentage: 10, weightKg: 0.3, capacityKg: 10.0, status: 'NORMAL', color: '#EC4899' },
      { id: 'b_27', category: 'Hazard / Reject', fillPercentage: 12, weightKg: 0.25, capacityKg: 10.0, status: 'NORMAL', color: '#EF4444' },
    ],
    components: [
      { id: 'c21', name: 'AI Optical Vision Camera', status: 'NORMAL', metrics: '1080p 60fps', lastChecked: '1m ago' },
      { id: 'c22', name: 'Liquid Separation System', status: 'WARNING', metrics: 'Recovered Tank at 78%', lastChecked: 'Just now' },
      { id: 'c23', name: 'Twin-Shaft Shredder', status: 'NORMAL', metrics: 'Torque 68 Nm', lastChecked: '3m ago' },
      { id: 'c24', name: 'Plastic Dewatering Centrifuge', status: 'NORMAL', metrics: 'Operating normal', lastChecked: '2m ago' },
      { id: 'c25', name: 'Smart Bin Ultrasonic Sensors', status: 'WARNING', metrics: 'Plastic Bin at 82%', lastChecked: 'Just now' },
    ]
  },
  {
    id: 'ISEA-MC-003',
    name: 'ISEA Kiosk Festival Unit #3',
    eventId: 'evt_003',
    eventName: 'South Heritage Music & Food Cultural Festival',
    location: {
      lat: 9.9195,
      lng: 78.1193,
      address: 'Madurai Palace Ground, Madurai'
    },
    isOnline: false,
    status: 'OFFLINE',
    lastCommunication: '18h ago (Standby)',
    powerStatus: 'OFF',
    cameraStatus: 'STANDBY',
    sensorStatus: 'OK',
    conveyorStatus: 'IDLE',
    shredderStatus: 'IDLE',
    motorStatus: 'NORMAL',
    networkStatus: 'DISCONNECTED',
    temperatureC: 28.0,
    totalWasteKg: 52.6,
    plasticCollectedKg: 34.0,
    plasticShreddedKg: 31.2,
    recoveredLiquidL: 9.2,
    liquidTankCapacityL: 10.0,
    liquidTankStatus: 'NORMAL',
    bottlesCount: 680,
    cupsCount: 420,
    containersCount: 160,
    bins: [
      { id: 'b_31', category: 'Plastic', fillPercentage: 10, weightKg: 1.0, capacityKg: 20.0, status: 'NORMAL', color: '#10B981' },
      { id: 'b_32', category: 'Paper', fillPercentage: 15, weightKg: 1.5, capacityKg: 15.0, status: 'NORMAL', color: '#3B82F6' },
      { id: 'b_33', category: 'Metal', fillPercentage: 10, weightKg: 0.8, capacityKg: 15.0, status: 'NORMAL', color: '#F59E0B' },
      { id: 'b_34', category: 'Glass', fillPercentage: 5, weightKg: 0.4, capacityKg: 20.0, status: 'NORMAL', color: '#8B5CF6' },
      { id: 'b_35', category: 'Organic', fillPercentage: 20, weightKg: 1.6, capacityKg: 25.0, status: 'NORMAL', color: '#14B8A6' },
      { id: 'b_36', category: 'E-waste', fillPercentage: 0, weightKg: 0.0, capacityKg: 10.0, status: 'NORMAL', color: '#EC4899' },
      { id: 'b_37', category: 'Hazard / Reject', fillPercentage: 4, weightKg: 0.1, capacityKg: 10.0, status: 'NORMAL', color: '#EF4444' },
    ],
    components: []
  }
];

export const initialPlasticProcessing: PlasticProcessingState = {
  liquidSeparation: 'COMPLETE',
  dewatering: 'COMPLETE',
  drying: 'RUNNING',
  shredding: 'WAITING',
  weighing: 'WAITING',
  storage: 'READY',
  inputPlasticWeightKg: 9.4,
  liquidRemovedLiters: 2.6,
  dryingDurationSeconds: 45,
  shreddedOutputWeightKg: 6.8,
  shredderRpm: 140,
  shredderLoadPercent: 42,
  bladeTempC: 38.5,
  storageCapacityUsedPercent: 34
};

export const initialLiquidRecovery: LiquidRecoveryState = {
  currentVolumeL: 2.6,
  capacityL: 10.0,
  fillPercentage: 26,
  status: 'NORMAL',
  phLevel: 6.8,
  turbidityNtu: 12.4,
  inflowRateMlPerSec: 15,
  overflowDetected: false,
  valveState: 'CLOSED',
  sensorState: 'HEALTHY'
};

export const sampleDetections: WasteDetection[] = [
  {
    id: 'det_101',
    objectName: 'PET Mineral Water Bottle (500ml)',
    category: 'Plastic',
    confidence: 98.4,
    weightGrams: 18,
    residualLiquidMl: 45,
    timestamp: '11:42:15 AM',
    destination: 'Liquid Drain Grid → Dewaterer → Shredder',
    status: 'Dewatered',
    orientation: 'Angled'
  },
  {
    id: 'det_102',
    objectName: 'Clear Disposable Juice Cup',
    category: 'Plastic',
    confidence: 96.2,
    weightGrams: 12,
    residualLiquidMl: 30,
    timestamp: '11:41:50 AM',
    destination: 'Liquid Drain Grid → Dewaterer → Dryer',
    status: 'Drying',
    orientation: 'Inverted'
  },
  {
    id: 'det_103',
    objectName: 'Biodegradable Paper Tea Cup',
    category: 'Paper',
    confidence: 94.7,
    weightGrams: 9,
    residualLiquidMl: 10,
    timestamp: '11:40:12 AM',
    destination: 'Liquid Drain Grid → Paper Bin',
    status: 'Segregated',
    orientation: 'Vertical'
  },
  {
    id: 'det_104',
    objectName: 'Aluminium Beverage Can (330ml)',
    category: 'Metal',
    confidence: 99.1,
    weightGrams: 15,
    residualLiquidMl: 12,
    timestamp: '11:38:04 AM',
    destination: 'Liquid Drain Grid → Metal Bin',
    status: 'Segregated',
    orientation: 'Horizontal'
  },
  {
    id: 'det_105',
    objectName: 'Rigid PP Food Takeaway Box',
    category: 'Plastic',
    confidence: 95.8,
    weightGrams: 34,
    residualLiquidMl: 18,
    timestamp: '11:36:20 AM',
    destination: 'Liquid Drain Grid → Dewaterer → Shredder',
    status: 'Stored',
    orientation: 'Horizontal'
  },
  {
    id: 'det_106',
    objectName: 'Glass Sauce Miniature Jar',
    category: 'Glass',
    confidence: 97.5,
    weightGrams: 85,
    residualLiquidMl: 8,
    timestamp: '11:32:10 AM',
    destination: 'Liquid Drain Grid → Glass Bin',
    status: 'Segregated',
    orientation: 'Vertical'
  }
];

export const mockAlerts: AlertItem[] = [
  {
    id: 'alt_01',
    machineId: 'ISEA-MC-002',
    title: 'Recovered Liquid Tank Reached 78%',
    message: 'Recovered/Event liquid level in Unit #2 exceeds warning threshold (7.8L / 10L). Emptying required soon.',
    severity: 'WARNING',
    timestamp: '10m ago',
    isRead: false,
    category: 'LIQUID'
  },
  {
    id: 'alt_02',
    machineId: 'ISEA-MC-002',
    title: 'Plastic Shredded Bin Fill Alert',
    message: 'Plastic storage capacity is currently at 82%. Prepare collection pickup.',
    severity: 'WARNING',
    timestamp: '25m ago',
    isRead: false,
    category: 'BIN'
  },
  {
    id: 'alt_03',
    machineId: 'ISEA-MC-001',
    title: 'De-watering Cycle Complete',
    message: 'Plastic batch moisture reduced below 5% prior to dryer conveyor handoff.',
    severity: 'INFO',
    timestamp: '42m ago',
    isRead: true,
    category: 'MECHANICAL'
  }
];

export const mockAnomalies: AnomalyItem[] = [
  {
    id: 'anom_01',
    machineId: 'ISEA-MC-001',
    machineName: 'ISEA Kiosk Mandapam Unit #1',
    title: 'Slight Load-Cell Weight Variance',
    severity: 'LOW',
    timestamp: '11:22 AM',
    possibleCause: 'Heavy residual crushed ice in incoming plastic container causing temporary weight offset.',
    recommendedAction: 'Liquid drain grid successfully removed water; system auto-zeroed load cell.',
    status: 'RESOLVED'
  },
  {
    id: 'anom_02',
    machineId: 'ISEA-MC-002',
    machineName: 'ISEA Kiosk Auditorium Unit #2',
    title: 'Optical Lens Ambient Fogging',
    severity: 'MEDIUM',
    timestamp: '09:15 AM',
    possibleCause: 'High humidity from warm tea cups entered input chute.',
    recommendedAction: 'Automated air purge jet activated to clear camera lens. AI confidence restored to 98%.',
    status: 'RESOLVED'
  }
];

export const mockMaintenance: MaintenanceItem[] = [
  {
    id: 'm1',
    component: 'Twin-Shaft Shredder Blades',
    status: 'NORMAL',
    lastServiced: '2026-08-28',
    nextRecommended: '2026-09-28',
    operatingHours: 64,
    recommendation: 'Blades sharpness optimal; no jams detected.'
  },
  {
    id: 'm2',
    component: 'Thermal Air Dryer Blower & Heating Coil',
    status: 'NORMAL',
    lastServiced: '2026-08-25',
    nextRecommended: '2026-09-25',
    operatingHours: 82,
    recommendation: 'Filter mesh clean, heating elements functioning within ±1°C tolerance.'
  },
  {
    id: 'm3',
    component: 'Liquid Drain Sump & Ultrasonic Sensor',
    status: 'NORMAL',
    lastServiced: '2026-08-30',
    nextRecommended: '2026-09-15',
    operatingHours: 95,
    recommendation: 'Drain perforated screen clear of solids.'
  },
  {
    id: 'm4',
    component: 'AI Vision Enclosure & High-CRI LED Ring',
    status: 'NORMAL',
    lastServiced: '2026-09-01',
    nextRecommended: '2026-10-01',
    operatingHours: 120,
    recommendation: 'Optical chamber clean, zero dust buildup.'
  }
];

export const mockPickups: PickupRequest[] = [
  {
    id: 'PKP-2026-084',
    machineId: 'ISEA-MC-001',
    machineName: 'ISEA Kiosk Mandapam Unit #1',
    eventId: 'evt_001',
    eventName: 'Karthik & Ananya Grand Wedding Reception',
    location: 'Sri Radha Kalyana Mandapam, Mylapore',
    material: 'Dewatered & Shredded Clean PET/PP Plastic',
    estimatedWeightKg: 8.5,
    requestedTime: 'Today, 11:30 AM',
    assignedPerson: 'Ramesh CleanLogistics',
    assignedPhone: '+91 98840 98765',
    status: 'ASSIGNED'
  },
  {
    id: 'PKP-2026-083',
    machineId: 'ISEA-MC-002',
    machineName: 'ISEA Kiosk Auditorium Unit #2',
    eventId: 'evt_002',
    eventName: 'National Clean Energy & Green Tech Fest',
    location: 'Anna University Convention Auditorium',
    material: 'Recovered / Event Liquid Drainage Tank',
    estimatedWeightKg: 8.0,
    requestedTime: 'Today, 10:15 AM',
    assignedPerson: 'Suresh Municipal Liquid Care',
    assignedPhone: '+91 97711 44332',
    status: 'REQUESTED'
  },
  {
    id: 'PKP-2026-080',
    machineId: 'ISEA-MC-003',
    machineName: 'ISEA Kiosk Festival Unit #3',
    eventId: 'evt_003',
    eventName: 'South Heritage Music & Food Cultural Festival',
    location: 'Madurai Palace Ground',
    material: 'Shredded Mixed Polymers & Clean Flakes',
    estimatedWeightKg: 31.2,
    requestedTime: 'Yesterday, 09:00 PM',
    assignedPerson: 'EcoHaul Southern Express',
    assignedPhone: '+91 94441 55667',
    status: 'COMPLETED'
  }
];

export const mockEnvironmentalImpact: EnvironmentalImpactData = {
  plasticDivertedKg: 61.6,
  totalWasteSegregatedKg: 95.8,
  bottlesProcessed: 1268,
  cupsProcessed: 772,
  containersProcessed: 292,
  recoveredLiquidL: 19.6,
  shreddedPlasticStorageKg: 52.6,
  co2AvoidedKg: 147.8, // 1 kg recycled plastic ≈ 2.4 kg CO2 avoided
  waterSavedL: 620.0,
  landfillDivertedM3: 4.8,
  sustainabilityScore: 94
};

export const mockReports: ReportItem[] = [
  {
    id: 'ISEA-RPT-DLY-20260906',
    type: 'DAILY',
    periodLabel: 'Today (September 6, 2026)',
    eventId: 'evt_001',
    eventName: 'Karthik & Ananya Grand Wedding Reception',
    machineId: 'ISEA-MC-001',
    machineName: 'ISEA Kiosk Mandapam Unit #1',
    generatedTime: '2026-09-06 11:45 AM',
    startTime: '08:00 AM',
    endTime: '11:45 AM',
    operatingHours: 3.75,
    totalWasteKg: 14.8,
    plasticCollectedKg: 9.4,
    plasticShreddedKg: 6.8,
    recoveredLiquidL: 2.6,
    bottleCount: 198,
    cupCount: 112,
    containerCount: 44,
    categoryBreakdown: {
      'Plastic': 9.4,
      'Paper': 2.1,
      'Metal': 1.4,
      'Glass': 0.9,
      'Organic': 1.8,
      'E-waste': 0.1,
      'Hazard / Reject': 0.15
    },
    aiAccuracyPercent: 97.2,
    sustainabilityScore: 94,
    machineUptimePercent: 99.8,
    alertsCount: 1
  },
  {
    id: 'ISEA-RPT-WKL-2026W36',
    type: 'WEEKLY',
    periodLabel: 'Week 36 (Aug 31 - Sep 6, 2026)',
    eventId: 'evt_001',
    eventName: 'Multiple Events Summary (Mandapam & Aud)',
    machineId: 'ISEA-MC-001',
    machineName: 'Consolidated Event Fleet',
    generatedTime: '2026-09-06 09:00 AM',
    startTime: '2026-08-31 06:00 AM',
    endTime: '2026-09-06 09:00 AM',
    operatingHours: 68.5,
    totalWasteKg: 95.8,
    plasticCollectedKg: 61.6,
    plasticShreddedKg: 52.6,
    recoveredLiquidL: 19.6,
    bottleCount: 1268,
    cupCount: 772,
    containerCount: 292,
    categoryBreakdown: {
      'Plastic': 61.6,
      'Paper': 14.2,
      'Metal': 8.5,
      'Glass': 4.1,
      'Organic': 8.9,
      'E-waste': 0.8,
      'Hazard / Reject': 0.7
    },
    aiAccuracyPercent: 96.8,
    sustainabilityScore: 92,
    machineUptimePercent: 98.9,
    alertsCount: 5
  },
  {
    id: 'ISEA-RPT-MTH-202608',
    type: 'MONTHLY',
    periodLabel: 'Month of August 2026',
    eventId: 'evt_fleet',
    eventName: 'All Event Hall Deployments (12 Events)',
    machineId: 'ISEA-FLEET',
    machineName: 'ISEA Complete Event Fleet',
    generatedTime: '2026-09-01 12:00 AM',
    startTime: '2026-08-01 00:00 AM',
    endTime: '2026-08-31 11:59 PM',
    operatingHours: 312.0,
    totalWasteKg: 428.5,
    plasticCollectedKg: 284.2,
    plasticShreddedKg: 248.6,
    recoveredLiquidL: 82.4,
    bottleCount: 5410,
    cupCount: 3180,
    containerCount: 1140,
    categoryBreakdown: {
      'Plastic': 284.2,
      'Paper': 64.0,
      'Metal': 32.5,
      'Glass': 18.2,
      'Organic': 44.8,
      'E-waste': 3.2,
      'Hazard / Reject': 2.6
    },
    aiAccuracyPercent: 97.4,
    sustainabilityScore: 95,
    machineUptimePercent: 99.4,
    alertsCount: 14
  }
];
