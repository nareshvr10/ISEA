package com.isea.app

import android.app.Application
import com.google.firebase.FirebaseApp
import com.isea.app.data.firebase.FirebaseManager
import com.isea.app.data.repository.IseaRepository

/**
 * ISEA Application class
 * Initializes Firebase with offline persistence and dependency singletons.
 */
class IseaApplication : Application() {

    lateinit var firebaseManager: FirebaseManager
        private set

    lateinit var repository: IseaRepository
        private set

    override fun onCreate() {
        super.onCreate()
        instance = this

        // Initialize Firebase
        FirebaseApp.initializeApp(this)

        // Initialize Data Layer Singletons
        firebaseManager = FirebaseManager.getInstance()
        repository = IseaRepository.getInstance(firebaseManager)
    }

    companion object {
        lateinit var instance: IseaApplication
            private set
    }
}
