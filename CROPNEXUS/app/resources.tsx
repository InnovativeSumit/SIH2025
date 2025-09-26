import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, Stack } from "expo-router";
import React from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// --- Mock Data for Farming Resources ---
const farmingResources = [
  { id: "r1", name: "Soil Health 101", description: "Learn the basics of maintaining healthy soil.", image: { uri: "https://i.ibb.co/8xVNpQm/pesticide1.jpg"}},
  { id: "r2", name: "Water Management", description: "Efficient irrigation techniques for modern farms.", image: { uri: "https://i.ibb.co/8xVNpQm/pesticide1.jpg"}},
  { id: "r3", name: "Pest Identification", description: "A visual guide to common agricultural pests.", image: { uri: "https://i.ibb.co/8xVNpQm/pesticide1.jpg"} },
  { id: "r4", name: "Crop Rotation", description: "The benefits and methods of crop rotation.", image: { uri: "https://i.ibb.co/8xVNpQm/pesticide1.jpg"} },
  // Add more resources here
];

// --- Resource Card Component (based on your sketch) ---
type ResourceItem = {
  id: string;
  name: string;
  description: string;
  image: any;
};

const ResourceCard = ({ item }: { item: ResourceItem }) => (
  <View style={styles.card}>
    <Image source={item.image} style={styles.cardImage} />
    <Text style={styles.cardName}>{item.name}</Text>
    <Text style={styles.cardDescription}>{item.description}</Text>
    <TouchableOpacity 
        style={styles.cardButton}
        onPress={() => Alert.alert("Read Now", `Opening article: ${item.name}`)}
    >
      <Text style={styles.cardButtonText}>READ NOW</Text>
    </TouchableOpacity>
  </View>
);

// --- Main Resources Screen ---
export default function ResourcesScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#2e7d32", "#43a047"]} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <FontAwesome5 name="chevron-left" size={22} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Farming Resources</Text>
        <View style={{width: 50}} /> 
      </LinearGradient>

      {/* Resources Grid */}
      <FlatList
        data={farmingResources}
        renderItem={({ item }) => <ResourceCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#f0f0f0" },
    header: { height: 100, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20 },
    backButton: { padding: 20 },
    headerTitle: { color: "white", fontSize: 22, fontWeight: "bold" },
    
    // Grid and Card Styles (from your sketch)
    grid: { padding: 15 },
    card: {
        width: '48%',
        backgroundColor: "white",
        borderRadius: 16,
        padding: 12,
        marginBottom: 15,
        alignItems: "center",
        elevation: 3,
        shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5,
        borderWidth: 2,
        borderColor: '#1c1c1c'
    },
    cardImage: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#1c1c1c'
    },
    cardName: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    cardDescription: {
        fontSize: 13,
        color: "#666",
        textAlign: "center",
        marginVertical: 5,
        height: 40, // Set a fixed height to align buttons
    },
    cardButton: {
        backgroundColor: "white",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#1c1c1c'
    },
    cardButtonText: {
        color: "#1c1c1c",
        fontWeight: "bold",
        fontSize: 14,
    },
});