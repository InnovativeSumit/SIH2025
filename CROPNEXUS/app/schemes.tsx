import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, Stack } from "expo-router";
import React from "react";
import {
  Alert,
  FlatList,
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// --- Mock Data for Government Schemes ---
const governmentSchemes = [
  { 
    id: "s1", 
    head: "PM-KISAN Scheme", 
    description: "A central sector scheme with 100% funding from the Government of India to supplement the financial needs of farmers.",
    url: "https://pmkisan.gov.in/" 
  },
  { 
    id: "s2", 
    head: "Kisan Credit Card (KCC)", 
    description: "Provides farmers with timely access to credit for their cultivation and other needs in a simple and hassle-free manner.",
    url: "https://www.sbi.co.in/web/agri-rural/agriculture-banking/crop-finance/kisan-credit-card" 
  },
  { 
    id: "s3", 
    head: "Pradhan Mantri Fasal Bima Yojana", 
    description: "An insurance service for farmers for their yields. It aims to provide a comprehensive insurance cover against failure of the crop.",
    url: "https://pmfby.gov.in/" 
  },
  // Add more schemes here
];

// --- Scheme Card Component (based on your sketch) ---
interface Scheme {
    id: string;
    head: string;
    description: string;
    url: string;
}

const SchemeCard = ({ item }: { item: Scheme }) => {
    const handlePress = async () => {
        const supported = await Linking.canOpenURL(item.url);
        if (supported) {
            await Linking.openURL(item.url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${item.url}`);
        }
    };

    return (
        <View style={styles.card}>
            <Text style={styles.cardHead}>{item.head}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            <TouchableOpacity style={styles.cardButton} onPress={handlePress}>
                <Text style={styles.cardButtonText}>CLICK TO LEARN MORE</Text>
            </TouchableOpacity>
        </View>
    );
};

// --- Main Schemes Screen ---
export default function SchemesScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#2e7d32", "#43a047"]} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <FontAwesome5 name="chevron-left" size={22} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Govt. Schemes</Text>
        <View style={{width: 40}} /> 
      </LinearGradient>

      {/* Schemes List */}
      <FlatList
        data={governmentSchemes}
        renderItem={({ item }) => <SchemeCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#f0f0f0" },
    header: { height: 70, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20 },
    backButton: { padding: 10 },
    headerTitle: { color: "white", fontSize: 22, fontWeight: "bold" },
    
    // List and Card Styles (from your sketch)
    list: { padding: 15 },
    card: {
        backgroundColor: "white",
        borderRadius: 16,
        padding: 20,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000', 
        shadowOpacity: 0.1, 
        shadowRadius: 5,
        borderWidth: 2,
        borderColor: '#1c1c1c'
    },
    cardHead: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#1c1c1c',
        marginBottom: 10,
    },
    cardDescription: {
        fontSize: 15,
        color: "#555",
        lineHeight: 22,
        marginBottom: 15,
    },
    cardButton: {
        backgroundColor: "white",
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
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