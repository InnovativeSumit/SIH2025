import { router } from "expo-router";
import React, { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import permissionService from "./services/permissionService";
import authService from "./services/authService";

export default function OnboardingScreen4() {
  const [isLoading, setIsLoading] = useState(false);
  const [notificationGranted, setNotificationGranted] = useState(false);

  const handleNotificationPermission = async () => {
    setIsLoading(true);
    try {
      const granted = await permissionService.requestNotificationPermission();
      
      if (granted) {
        setNotificationGranted(true);
        Alert.alert(
          "Notifications Enabled",
          "Great! You'll now receive important farming tips, weather alerts, and crop reminders.",
          [{ text: "Awesome!" }]
        );
      }
    } catch (error) {
      console.error('Error handling notification permission:', error);
      Alert.alert("Error", "Failed to enable notifications. You can continue without notifications.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = async () => {
    await completeOnboarding();
  };

  const handleFinish = async () => {
    await completeOnboarding();
  };

  const completeOnboarding = async () => {
    try {
      await authService.setOnboardingCompleted();
      router.replace("/dashboard");
    } catch (error) {
      console.error('Error completing onboarding:', error);
      Alert.alert("Error", "Failed to complete setup. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="notifications" size={120} color="#4CAF50" />
        </View>
        
        <Text style={styles.title}>Enable Notifications</Text>
        <Text style={styles.description}>
          Stay updated with important farming information:
        </Text>
        
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <Ionicons name="alarm" size={24} color="#4CAF50" />
            <Text style={styles.featureText}>Crop care reminders</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="warning" size={24} color="#4CAF50" />
            <Text style={styles.featureText}>Weather alerts</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="trending-up" size={24} color="#4CAF50" />
            <Text style={styles.featureText}>Market price updates</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="bulb" size={24} color="#4CAF50" />
            <Text style={styles.featureText}>Farming tips & advice</Text>
          </View>
        </View>

        {notificationGranted && (
          <View style={styles.successInfo}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <Text style={styles.successText}>
              Notifications enabled successfully!
            </Text>
          </View>
        )}

        {!notificationGranted && (
          <TouchableOpacity 
            style={[styles.enableButton, isLoading && styles.disabledButton]} 
            onPress={handleNotificationPermission}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Ionicons name="notifications" size={20} color="white" />
                <Text style={styles.enableButtonText}>Enable Notifications</Text>
              </>
            )}
          </TouchableOpacity>
        )}

        <Text style={styles.note}>
          You can always change notification settings later in your profile.
        </Text>
      </View>

      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navButton1} onPress={handleSkip}>
          <Text style={styles.buttonText1}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton2} onPress={handleFinish}>
          <Text style={styles.buttonText2}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 50,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  iconContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  featuresList: {
    width: "100%",
    marginBottom: 30,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  featureText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 15,
    flex: 1,
  },
  successInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f5e9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  successText: {
    fontSize: 14,
    color: "#2e7d32",
    marginLeft: 10,
    flex: 1,
  },
  enableButton: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#999",
  },
  enableButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  note: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    fontStyle: "italic",
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 40,
  },
  navButton1: {
    padding: 12,
    width: 150,
     bottom:20,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#eee",
  },
  navButton2: {
    padding: 12,
    width: 150,
     bottom:20,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#4CAF50",
  },
  buttonText1: { fontSize: 18, color: "#000" },
  buttonText2: { fontSize: 18, color: "#fff", fontWeight: "bold" },
});
