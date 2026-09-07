package com.isea.app.data.repository

import com.isea.app.data.firebase.FirebaseManager
import com.isea.app.data.model.*
import kotlinx.coroutines.flow.Flow

/**
 * Repository pattern providing single source of truth with Firebase & Offline Cache.
 */
class IseaRepository(private val firebase: FirebaseManager) {

    fun observeMachine(machineId: String): Flow<Machine?> {
        return firebase.getMachineFlow(machineId)
    }

    fun observePlasticProcessing(machineId: String): Flow<PlasticProcessing?> {
        return firebase.getPlasticProcessingFlow(machineId)
    }

    fun observeLiquidRecovery(machineId: String): Flow<LiquidRecovery?> {
        return firebase.getLiquidRecoveryFlow(machineId)
    }

    suspend fun saveDetection(detection: WasteDetection) {
        firebase.recordWasteDetection(detection)
    }
}
