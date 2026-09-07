export type UserRole = 'ADMIN' | 'OPERATOR' | 'USER';

export type Language = 'en' | 'ta' | 'hi';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  assignedEventId?: string;
  assignedMachineId?: string;
  avatar?: string;
  points?: number;
}

export type EventType = 
  | 'Wedding'
  | 'Reception'
  | 'Festival'
  | 'College Event'
  | 'Function'
  | 'Public Event'
  | 'Other';

export interface EventItem {
  id: string;
  name: string;
  type: EventType;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  organizer: string;
  assignedMachineId: string;
  status: 'ACTIVE' | 'UPCOMING' | 'COMPLETED';
  totalAttendees?: number;
}

export type HealthStatus = 'NORMAL' | 'WARNING' | 'CRITICAL' | 'OFFLINE';

export interface ComponentHealth {
  id: string;
  name: string;
  status: HealthStatus;
  metrics: string;
  lastChecked: string;
}

export type WasteCategory = 
  | 'Plastic'
  | 'Paper'
  | 'Metal'
  | 'Glass'
  | 'Organic'
  | 'E-waste'
  | 'Hazard / Reject';

export interface BinInfo {
  id: string;
  category: WasteCategory;
  fillPercentage: number;
  weightKg: number;
  capacityKg: number;
  status: 'NORMAL' | 'ALMOST FULL' | 'FULL';
  color: string;
}

export interface Machine {
  id: string;
  name: string;
  eventId: string;
  eventName: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  isOnline: boolean;
  status: HealthStatus;
  lastCommunication: string;
  powerStatus: 'ON' | 'BATTERY' | 'OFF';
  cameraStatus: 'ACTIVE' | 'ERROR' | 'STANDBY';
  sensorStatus: 'OK' | 'CALIBRATING' | 'ERROR';
  conveyorStatus: 'IDLE' | 'RUNNING' | 'JAMMED';
  shredderStatus: 'IDLE' | 'RUNNING' | 'WAITING' | 'OVERLOAD';
  motorStatus: 'NORMAL' | 'HIGH_TEMP' | 'FAULT';
  networkStatus: '4G_ONLINE' | 'WIFI_ONLINE' | 'DISCONNECTED';
  temperatureC: number;
  totalWasteKg: number;
  plasticCollectedKg: number;
  plasticShreddedKg: number;
  recoveredLiquidL: number;
  liquidTankCapacityL: number;
  liquidTankStatus: 'NORMAL' | 'WARNING' | 'CRITICAL';
  bottlesCount: number;
  cupsCount: number;
  containersCount: number;
  bins: BinInfo[];
  components: ComponentHealth[];
}

export interface WasteDetection {
  id: string;
  objectName: string;
  category: WasteCategory;
  confidence: number; // 0 to 100
  weightGrams: number;
  residualLiquidMl: number;
  timestamp: string;
  destination: string;
  status: 'Detected' | 'Liquid Drained' | 'Segregated' | 'Dewatered' | 'Drying' | 'Shredded' | 'Stored';
  imageUrl?: string;
  orientation: 'Vertical' | 'Horizontal' | 'Angled' | 'Inverted';
}

export interface PlasticProcessingState {
  liquidSeparation: 'COMPLETE' | 'RUNNING' | 'IDLE';
  dewatering: 'COMPLETE' | 'RUNNING' | 'IDLE';
  drying: 'COMPLETE' | 'RUNNING' | 'WAITING' | 'IDLE';
  shredding: 'COMPLETE' | 'RUNNING' | 'WAITING' | 'IDLE';
  weighing: 'COMPLETE' | 'RUNNING' | 'WAITING' | 'IDLE';
  storage: 'READY' | 'STORING' | 'FULL';
  inputPlasticWeightKg: number;
  liquidRemovedLiters: number;
  dryingDurationSeconds: number;
  shreddedOutputWeightKg: number;
  shredderRpm: number;
  shredderLoadPercent: number;
  bladeTempC: number;
  storageCapacityUsedPercent: number;
}

export interface LiquidRecoveryState {
  currentVolumeL: number;
  capacityL: number;
  fillPercentage: number;
  status: 'NORMAL' | 'WARNING' | 'CRITICAL';
  phLevel: number;
  turbidityNtu: number;
  inflowRateMlPerSec: number;
  overflowDetected: boolean;
  valveState: 'CLOSED' | 'OPEN';
  sensorState: 'HEALTHY' | 'CLEAN_REQUIRED';
}

export interface AlertItem {
  id: string;
  machineId: string;
  title: string;
  message: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  timestamp: string;
  isRead: boolean;
  category: 'BIN' | 'LIQUID' | 'MECHANICAL' | 'NETWORK' | 'AI';
}

export interface AnomalyItem {
  id: string;
  machineId: string;
  machineName: string;
  title: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  timestamp: string;
  possibleCause: string;
  recommendedAction: string;
  status: 'DETECTED' | 'INVESTIGATING' | 'RESOLVED';
}

export interface MaintenanceItem {
  id: string;
  component: string;
  status: 'NORMAL' | 'WARNING' | 'CRITICAL';
  lastServiced: string;
  nextRecommended: string;
  operatingHours: number;
  recommendation: string;
}

export type PickupStatus = 'REQUESTED' | 'ASSIGNED' | 'IN TRANSIT' | 'COLLECTED' | 'COMPLETED';

export interface PickupRequest {
  id: string;
  machineId: string;
  machineName: string;
  eventId: string;
  eventName: string;
  location: string;
  material: string;
  estimatedWeightKg: number;
  requestedTime: string;
  assignedPerson: string;
  assignedPhone: string;
  status: PickupStatus;
}

export interface EnvironmentalImpactData {
  plasticDivertedKg: number;
  totalWasteSegregatedKg: number;
  bottlesProcessed: number;
  cupsProcessed: number;
  containersProcessed: number;
  recoveredLiquidL: number;
  shreddedPlasticStorageKg: number;
  co2AvoidedKg: number; // Configurable calculation
  waterSavedL: number;
  landfillDivertedM3: number;
  sustainabilityScore: number; // 0-100
}

export type EnvironmentalImpact = EnvironmentalImpactData;
export type BinItem = BinInfo;

export interface ReportItem {
  id: string;
  type: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM';
  periodLabel: string;
  eventId: string;
  eventName: string;
  machineId: string;
  machineName: string;
  generatedTime: string;
  startTime: string;
  endTime: string;
  operatingHours: number;
  totalWasteKg: number;
  plasticCollectedKg: number;
  plasticShreddedKg: number;
  recoveredLiquidL: number;
  bottleCount: number;
  cupCount: number;
  containerCount: number;
  categoryBreakdown: Record<WasteCategory, number>;
  aiAccuracyPercent: number;
  sustainabilityScore: number;
  machineUptimePercent: number;
  alertsCount: number;
}
