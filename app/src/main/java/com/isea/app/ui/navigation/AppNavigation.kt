package com.isea.app.ui.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.isea.app.ui.viewmodel.IseaViewModel

sealed class Screen(val route: String) {
    object Login : Screen("login")
    object Home : Screen("home")
    object Machines : Screen("machines")
    object Waste : Screen("waste")
    object Analytics : Screen("analytics")
    object Profile : Screen("profile")
    
    // Sub-screens
    object PlasticProcessing : Screen("plastic_processing")
    object LiquidRecovery : Screen("liquid_recovery")
    object GreenCertificate : Screen("green_certificate")
    object Notifications : Screen("notifications")
    object UniversalInput : Screen("universal_input")
}

@Composable
fun AppNavigation(
    viewModel: IseaViewModel,
    navController: NavHostController = rememberNavController()
) {
    NavHost(
        navController = navController,
        startDestination = Screen.Home.route
    ) {
        composable(Screen.Login.route) {
            // LoginScreen composable
        }
        composable(Screen.Home.route) {
            // HomeScreen composable
        }
        composable(Screen.Machines.route) {
            // MachinesScreen composable
        }
        composable(Screen.Waste.route) {
            // WasteScreen composable
        }
        composable(Screen.Analytics.route) {
            // AnalyticsScreen composable
        }
        composable(Screen.Profile.route) {
            // ProfileScreen composable
        }
        composable(Screen.PlasticProcessing.route) {
            // PlasticProcessingScreen composable
        }
        composable(Screen.LiquidRecovery.route) {
            // LiquidRecoveryScreen composable
        }
        composable(Screen.GreenCertificate.route) {
            // GreenCertificateScreen composable
        }
        composable(Screen.Notifications.route) {
            // NotificationsScreen composable
        }
    }
}
