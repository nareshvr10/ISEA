package com.isea.app.data.model

import com.google.firebase.database.IgnoreExtraProperties

enum class UserRole {
    ADMIN,
    OPERATOR,
    USER
}

enum class HealthStatus {
    NORMAL,
    WARNING,
    CRITICAL,
    OFFLINE
}

enum class WasteCategory {
    PLASTIC,
    PAPER,
    METAL,
    GLASS,
    ORGANIC,
    E_WASTE,
    HAZARD_REJECT
}

@IgnoreExtraProperties
data class User(
    val id: String = "",
    val name: String = "",
    val email: String = "",
    val role: String = UserRole.USER.name,
    val phone: String = "",
    val assignedEventId: String? = null,
    val assignedMachineId: String? = null,
    val points: Int = 0,
    val createdAt: Long = System.currentTimeMillis()
)

@IgnoreExtraProperties
data class Event(
    val id: String = "",
    val name: String = "",
    val type: String = "Wedding", // Wedding, Reception, Festival, College Event, Function, Public Event
    val date: String = "",
    val startTime: String = "",
    val endTime: String = "",
    val location: String = "",
    val organizer: String = "",
    val assignedMachineId: String = "",
    val status: String = "ACTIVE",
    val totalAttendees: Int = 0
)

@IgnoreExtraProperties
data class Machine(
    val id: String = "",
    val name: String = "",
    val eventId: String = "",
    val eventName: String = "",
    val lat: Double = 0.0,
    val lng: Double = 0.0,
    val address: String = "",
    val isOnline: Boolean = true,
    val status: String = HealthStatus.NORMAL.name,
    val lastCommunication: String = "",
    val powerStatus: String = "ON",
    val cameraStatus: String = "ACTIVE",
    val sensorStatus: String = "OK",
    val conveyorStatus: String = "IDLE",
    val shredderStatus: String = "IDLE",
    val motorStatus: String = "NORMAL",
    val networkStatus: String = "4G_ONLINE",
    val temperatureC: Double = 32.0,
    val totalWasteKg: Double = 0.0,
    val plasticCollectedKg: Double = 0.0,
    val plasticShreddedKg: Double = 0.0,
    val recoveredLiquidL: Double = 0.0,
    val liquidTankCapacityL: Double = 10.0,
    val liquidTankStatus: String = "NORMAL",
    val bottlesCount: Int = 0,
    val cupsCount: Int = 0,
    val containersCount: Int = 0
)

@IgnoreExtraProperties
data class Bin(
    val id: String = "",
    val machineId: String = "",
    val category: String = WasteCategory.PLASTIC.name,
    val fillPercentage: Int = 0,
    val weightKg: Double = 0.0,
    val capacityKg: Double = 20.0,
    val status: String = "NORMAL" // NORMAL, ALMOST FULL, FULL
)

/**
 * CRITICAL ENGINEERING RULE:
 * Free liquid is separated FIRST into Recovered/Event Liquid Tank.
 * Plastic is then dewatered, dried, shredded, weighed, and stored.
 */
@IgnoreExtraProperties
data class PlasticProcessing(
    val machineId: String = "",
    val liquidSeparation: String = "COMPLETE", // COMPLETE, RUNNING, IDLE
    val dewatering: String = "COMPLETE",       // COMPLETE, RUNNING, IDLE
    val drying: String = "RUNNING",            // COMPLETE, RUNNING, WAITING
    val shredding: String = "WAITING",         // COMPLETE, RUNNING, WAITING
    val weighing: String = "WAITING",          // COMPLETE, RUNNING, WAITING
    val storage: String = "READY",             // READY, STORING, FULL
    val inputPlasticWeightKg: Double = 0.0,
    val liquidRemovedLiters: Double = 0.0,
    val shreddedOutputWeightKg: Double = 0.0,
    val shredderRpm: Int = 140,
    val bladeTempC: Double = 35.0,
    val storageCapacityUsedPercent: Int = 0
)

@IgnoreExtraProperties
data class LiquidRecovery(
    val machineId: String = "",
    val currentVolumeL: Double = 0.0,
    val capacityL: Double = 10.0,
    val fillPercentage: Int = 0,
    val status: String = "NORMAL", // 0-70% NORMAL, 70-90% WARNING, 90%+ CRITICAL
    val overflowDetected: Boolean = false,
    val sensorState: String = "HEALTHY"
)

@IgnoreExtraProperties
data class WasteDetection(
    val id: String = "",
    val machineId: String = "",
    val objectName: String = "",
    val category: String = WasteCategory.PLASTIC.name,
    val confidence: Double = 95.0,
    val weightGrams: Int = 0,
    val residualLiquidMl: Int = 0,
    val timestamp: String = "",
    val destination: String = "",
    val status: String = "Dewatered",
    val orientation: String = "Horizontal"
)

@IgnoreExtraProperties
data class Report(
    val id: String = "",
    val type: String = "DAILY", // DAILY, WEEKLY, MONTHLY, CUSTOM
    val periodLabel: String = "",
    val eventId: String = "",
    val eventName: String = "",
    val machineId: String = "",
    val generatedTime: String = "",
    val totalWasteKg: Double = 0.0,
    val plasticCollectedKg: Double = 0.0,
    val plasticShreddedKg: Double = 0.0,
    val recoveredLiquidL: Double = 0.0,
    val bottleCount: Int = 0,
    val cupCount: Int = 0,
    val containerCount: Int = 0,
    val aiAccuracyPercent: Double = 97.0,
    val sustainabilityScore: Int = 94,
    val machineUptimePercent: Double = 99.0
)

@IgnoreExtraProperties
data class EnvironmentalImpact(
    val plasticDivertedKg: Double = 0.0,
    val totalWasteSegregatedKg: Double = 0.0,
    val bottlesProcessed: Int = 0,
    val cupsProcessed: Int = 0,
    val containersProcessed: Int = 0,
    val recoveredLiquidL: Double = 0.0,
    val shreddedPlasticStorageKg: Double = 0.0,
    val co2AvoidedKg: Double = 0.0,
    val waterSavedL: Double = 0.0,
    val sustainabilityScore: Int = 95
)

typealias EventItem = Event
typealias PlasticProcessingState = PlasticProcessing
typealias LiquidRecoveryState = LiquidRecovery

@IgnoreExtraProperties
data class AlertItem(
    val id: String = "",
    val machineId: String = "",
    val title: String = "",
    val message: String = "",
    val severity: String = "WARNING", // INFO, WARNING, CRITICAL
    val timestamp: String = "",
    val isResolved: Boolean = false
)
