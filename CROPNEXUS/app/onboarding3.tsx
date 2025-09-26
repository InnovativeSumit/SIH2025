import { router } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import permissionService, { LocationData } from "./services/permissionService";

export default function OnboardingScreen3() {
  const [isLoading, setIsLoading] = useState(false);
  const [locationGranted, setLocationGranted] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);

  const handleLocationPermission = async () => {
    setIsLoading(true);
    try {
      const granted = await permissionService.requestLocationPermission();
      
      if (granted) {
        const location = await permissionService.getCurrentLocation();
        if (location) {
          setCurrentLocation(location);
          setLocationGranted(true);
          Alert.alert(
            "Location Access Granted",
            `We found you in ${location.city || 'your area'}! This will help us provide personalized farming advice.`,
            [{ text: "Great!" }]
          );
        }
      }
    } catch (error) {
      console.error('Error handling location permission:', error);
      Alert.alert("Error", "Failed to get location. You can continue without location access.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    router.push("/onboarding4");
  };

  const handleNext = () => {
    router.push("/onboarding4");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="location" size={120} color="#4CAF50" />
        </View>
        
        <Text style={styles.title}>Enable Location Access</Text>
        <Text style={styles.description}>
          Allow CropNexus to access your location to provide:
        </Text>
        
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <Ionicons name="partly-sunny" size={24} color="#4CAF50" />
            <Text style={styles.featureText}>Local weather updates</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="leaf" size={24} color="#4CAF50" />
            <Text style={styles.featureText}>Region-specific crop advice</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="trending-up" size={24} color="#4CAF50" />
            <Text style={styles.featureText}>Local market prices</Text>
          </View>
        </View>

        {currentLocation && (
          <View style={styles.locationInfo}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <Text style={styles.locationText}>
              Location detected: {currentLocation.city}, {currentLocation.region}
            </Text>
          </View>
        )}

        {!locationGranted && (
          <TouchableOpacity 
            style={[styles.enableButton, isLoading && styles.disabledButton]} 
            onPress={handleLocationPermission}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Ionicons name="location" size={20} color="white" />
                <Text style={styles.enableButtonText}>Enable Location</Text>
              </>
            )}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navButton1} onPress={handleSkip}>
          <Text style={styles.buttonText1}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton2} onPress={handleNext}>
          <Text style={styles.buttonText2}>Next</Text>
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
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f5e9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  locationText: {
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
     bottom:20,
    width: 150,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#4CAF50",
  },
  buttonText1: { fontSize: 18, color: "#000" },
  buttonText2: { fontSize: 18, color: "#fff", fontWeight: "bold" },
});
