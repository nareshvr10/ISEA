package com.isea.app.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.isea.app.data.model.*
import com.isea.app.data.repository.IseaRepository
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

/**
 * Main ViewModel for ISEA Android Application
 * Exposes StateFlow observables to Jetpack Compose UI
 */
class IseaViewModel(
    private val repository: IseaRepository
) : ViewModel() {

    private val _currentMachineId = MutableStateFlow("ISEA-MC-001")
    val currentMachineId: StateFlow<String> = _currentMachineId.asStateFlow()

    private val _currentLanguage = MutableStateFlow("en")
    val currentLanguage: StateFlow<String> = _currentLanguage.asStateFlow()

    private val _isDemoMode = MutableStateFlow(true)
    val isDemoMode: StateFlow<Boolean> = _isDemoMode.asStateFlow()

    // Machine Streams
    val currentMachine: StateFlow<Machine?> = _currentMachineId
        .flatMapLatest { id -> repository.getMachineFlow(id) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), null)

    val allMachines: StateFlow<List<Machine>> = repository.getAllMachinesFlow()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    // Event Stream
    val currentEvent: StateFlow<EventItem?> = repository.getCurrentEventFlow()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), null)

    // Critical Plastic Processing Pipeline Stream
    val plasticProcessing: StateFlow<PlasticProcessingState?> = _currentMachineId
        .flatMapLatest { id -> repository.getPlasticProcessingFlow(id) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), null)

    // Liquid Recovery Tank Stream
    val liquidRecovery: StateFlow<LiquidRecoveryState?> = _currentMachineId
        .flatMapLatest { id -> repository.getLiquidRecoveryFlow(id) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), null)

    // Waste Segregation Detections
    val recentDetections: StateFlow<List<WasteDetection>> = _currentMachineId
        .flatMapLatest { id -> repository.getRecentDetectionsFlow(id) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    // Alerts
    val alerts: StateFlow<List<AlertItem>> = _currentMachineId
        .flatMapLatest { id -> repository.getAlertsFlow(id) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    fun selectMachine(machineId: String) {
        _currentMachineId.value = machineId
    }

    fun setLanguage(lang: String) {
        _currentLanguage.value = lang
    }

    fun toggleDemoMode() {
        _isDemoMode.value = !_isDemoMode.value
    }

    /**
     * Process Waste through the Universal Input Chute
     * Critical: Separates liquid into Recovered Liquid Tank FIRST, then dewaters and shreds plastic
     */
    fun processUniversalWaste(detection: WasteDetection) {
        viewModelScope.launch {
            repository.recordWasteDetection(_currentMachineId.value, detection)
        }
    }

    /**
     * Drain the Recovered Liquid Tank
     */
    fun drainLiquidTank() {
        viewModelScope.launch {
            repository.drainLiquidTank(_currentMachineId.value)
        }
    }
}
