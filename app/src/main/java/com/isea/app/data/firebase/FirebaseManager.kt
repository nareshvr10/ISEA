package com.isea.app.data.firebase

import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.database.*
import com.isea.app.data.model.*
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.tasks.await

/**
 * Firebase Realtime Database and Auth Manager for ISEA.
 * Structure:
 * /users/{uid}
 * /machines/{machineId}
 * /events/{eventId}
 * /wasteDetections/{detectionId}
 * /plasticProcessing/{machineId}
 * /liquidRecovery/{machineId}
 * /reports/{reportId}
 */
class FirebaseManager {
    private val auth: FirebaseAuth by lazy { FirebaseAuth.getInstance() }
    private val database: FirebaseDatabase by lazy {
        FirebaseDatabase.getInstance().apply {
            // Enable offline persistence for uninterrupted event operation
            setPersistenceEnabled(true)
        }
    }

    val currentUserId: String?
        get() = auth.currentUser?.uid

    suspend fun login(email: String, pass: String): String {
        val result = auth.signInWithEmailAndPassword(email, pass).await()
        return result.user?.uid ?: throw IllegalStateException("User null after login")
    }

    fun logout() {
        auth.signOut()
    }

    fun getMachineFlow(machineId: String): Flow<Machine?> = callbackFlow {
        val ref = database.getReference("machines").child(machineId)
        val listener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val machine = snapshot.getValue(Machine::class.java)
                trySend(machine)
            }

            override fun onCancelled(error: DatabaseError) {
                close(error.toException())
            }
        }
        ref.addValueEventListener(listener)
        awaitClose { ref.removeEventListener(listener) }
    }

    fun getPlasticProcessingFlow(machineId: String): Flow<PlasticProcessing?> = callbackFlow {
        val ref = database.getReference("plasticProcessing").child(machineId)
        val listener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                trySend(snapshot.getValue(PlasticProcessing::class.java))
            }
            override fun onCancelled(error: DatabaseError) {
                close(error.toException())
            }
        }
        ref.addValueEventListener(listener)
        awaitClose { ref.removeEventListener(listener) }
    }

    fun getLiquidRecoveryFlow(machineId: String): Flow<LiquidRecovery?> = callbackFlow {
        val ref = database.getReference("liquidRecovery").child(machineId)
        val listener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                trySend(snapshot.getValue(LiquidRecovery::class.java))
            }
            override fun onCancelled(error: DatabaseError) {
                close(error.toException())
            }
        }
        ref.addValueEventListener(listener)
        awaitClose { ref.removeEventListener(listener) }
    }

    suspend fun recordWasteDetection(detection: WasteDetection) {
        val ref = database.getReference("wasteDetections").push()
        val item = detection.copy(id = ref.key ?: System.currentTimeMillis().toString())
        ref.setValue(item).await()
    }

    fun getAllMachinesFlow(): Flow<List<Machine>> = callbackFlow {
        val ref = database.getReference("machines")
        val listener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val list = mutableListOf<Machine>()
                for (child in snapshot.children) {
                    child.getValue(Machine::class.java)?.let { list.add(it) }
                }
                trySend(list)
            }
            override fun onCancelled(error: DatabaseError) { close(error.toException()) }
        }
        ref.addValueEventListener(listener)
        awaitClose { ref.removeEventListener(listener) }
    }

    fun getCurrentEventFlow(): Flow<EventItem?> = callbackFlow {
        val ref = database.getReference("currentEvent")
        val listener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                trySend(snapshot.getValue(EventItem::class.java))
            }
            override fun onCancelled(error: DatabaseError) { close(error.toException()) }
        }
        ref.addValueEventListener(listener)
        awaitClose { ref.removeEventListener(listener) }
    }

    fun getRecentDetectionsFlow(machineId: String): Flow<List<WasteDetection>> = callbackFlow {
        val ref = database.getReference("wasteDetections").orderByChild("machineId").equalTo(machineId).limitToLast(20)
        val listener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val list = mutableListOf<WasteDetection>()
                for (child in snapshot.children) {
                    child.getValue(WasteDetection::class.java)?.let { list.add(it) }
                }
                trySend(list.reversed())
            }
            override fun onCancelled(error: DatabaseError) { close(error.toException()) }
        }
        ref.addValueEventListener(listener)
        awaitClose { ref.removeEventListener(listener) }
    }

    fun getAlertsFlow(machineId: String): Flow<List<AlertItem>> = callbackFlow {
        val ref = database.getReference("alerts").orderByChild("machineId").equalTo(machineId)
        val listener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val list = mutableListOf<AlertItem>()
                for (child in snapshot.children) {
                    child.getValue(AlertItem::class.java)?.let { list.add(it) }
                }
                trySend(list)
            }
            override fun onCancelled(error: DatabaseError) { close(error.toException()) }
        }
        ref.addValueEventListener(listener)
        awaitClose { ref.removeEventListener(listener) }
    }

    companion object {
        @Volatile
        private var INSTANCE: FirebaseManager? = null

        fun getInstance(): FirebaseManager =
            INSTANCE ?: synchronized(this) {
                INSTANCE ?: FirebaseManager().also { INSTANCE = it }
            }
    }
}
