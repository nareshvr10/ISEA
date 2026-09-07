# Add project specific ProGuard rules here.
-keepattributes *Annotation*
-keepclassmembers class * {
    @com.google.firebase.database.IgnoreExtraProperties <fields>;
}
-keep class com.isea.app.data.model.** { *; }
