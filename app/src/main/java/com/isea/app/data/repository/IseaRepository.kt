package com.isea.app.data.repository

import com.isea.app.data.firebase.FirebaseManager
import com.isea.app.data.model.*
import kotlinx.coroutines.flow.Flow

/**
 * Repository pattern providing single source of truth with Firebase & Offline Cache.
 */
class IseaRepository(private val firebase: FirebaseManager) {

    fun getMachineFlow(machineId: String): Flow<Machine?> {
        return firebase.getMachineFlow(machineId)
    }

    fun getAllMachinesFlow(): Flow<List<Machine>> {
        return firebase.getAllMachinesFlow()
    }

    fun getCurrentEventFlow(): Flow<EventItem?> {
        return firebase.getCurrentEventFlow()
    }

    fun getPlasticProcessingFlow(machineId: String): Flow<PlasticProcessingState?> {
        return firebase.getPlasticProcessingFlow(machineId)
    }

    fun getLiquidRecoveryFlow(machineId: String): Flow<LiquidRecoveryState?> {
        return firebase.getLiquidRecoveryFlow(machineId)
    }

    fun getRecentDetectionsFlow(machineId: String): Flow<List<WasteDetection>> {
        return firebase.getRecentDetectionsFlow(machineId)
    }

    fun getAlertsFlow(machineId: String): Flow<List<AlertItem>> {
        return firebase.getAlertsFlow(machineId)
    }

    suspend fun saveDetection(detection: WasteDetection) {
        firebase.recordWasteDetection(detection)
    }

    companion object {
        @Volatile
        private var INSTANCE: IseaRepository? = null

        fun getInstance(firebase: FirebaseManager): IseaRepository =
            INSTANCE ?: synchronized(this) {
                INSTANCE ?: IseaRepository(firebase).also { INSTANCE = it }
            }
    }
}
