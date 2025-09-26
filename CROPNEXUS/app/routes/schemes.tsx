import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, Stack } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

interface GovernmentScheme {
  id: string;
  name: string;
  description: string;
  image: { uri: string };
  type: string;
  ministry: string;
  eligibility: string[];
  benefits: string[];
  applicationProcess: string[];
  documents: string[];
  amount: string;
  duration: string;
  officialLink: string;
  helplineNumber: string;
  status: string;
}

// Mock Data for Government Schemes with URL images
const allSchemes: GovernmentScheme[] = [
  {
    id: "s1",
    name: "PM-KISAN Scheme",
    description: "A central sector scheme with 100% funding from the Government of India to supplement the financial needs of farmers.",
    image: { uri: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400" },
    type: "subsidy",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    eligibility: [
      "All landholding farmers families",
      "Families having cultivable land holding",
      "Both small and marginal farmers eligible",
      "Institutional land holders excluded"
    ],
    benefits: [
      "₹6,000 per year in three equal installments",
      "Direct benefit transfer to bank account",
      "No upper limit on family income",
      "Covers all crops and farming activities"
    ],
    applicationProcess: [
      "Visit PM-KISAN portal or nearest CSC",
      "Fill registration form with Aadhaar details",
      "Upload required documents",
      "Submit application and get acknowledgment",
      "Track application status online"
    ],
    documents: [
      "Aadhaar Card",
      "Bank Account Details",
      "Land Ownership Documents",
      "Mobile Number for OTP verification"
    ],
    amount: "₹6,000 per year",
    duration: "Ongoing (Annual)",
    officialLink: "https://pmkisan.gov.in/",
    helplineNumber: "155261",
    status: "active"
  },
  {
    id: "s2",
    name: "Kisan Credit Card (KCC)",
    description: "Provides farmers with timely access to credit for their cultivation and other needs in a simple and hassle-free manner.",
    image: { uri: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400" },
    type: "loan",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    eligibility: [
      "All farmers - individual/joint borrowers",
      "Tenant farmers, oral lessees, and sharecroppers",
      "Self Help Group members",
      "Joint Liability Group members"
    ],
    benefits: [
      "Credit limit based on cropping pattern and scale of finance",
      "Flexible repayment schedule",
      "Simple documentation and procedures",
      "Insurance coverage for crops and farmers",
      "Interest subvention up to 3% per annum"
    ],
    applicationProcess: [
      "Visit nearest bank branch",
      "Fill KCC application form",
      "Submit required documents",
      "Bank verification and assessment",
      "Credit limit sanctioned and card issued"
    ],
    documents: [
      "Identity Proof (Aadhaar/Voter ID)",
      "Address Proof",
      "Land documents (Patta/Lease deed)",
      "Bank statements (if existing customer)",
      "Crop plan and cost of cultivation"
    ],
    amount: "Based on crop and area (₹3 lakh limit for 5 years)",
    duration: "5 years (renewable)",
    officialLink: "https://www.nabard.org/",
    helplineNumber: "1800-180-1551",
    status: "active"
  },
  {
    id: "s3",
    name: "Pradhan Mantri Fasal Bima Yojana",
    description: "Provides comprehensive insurance coverage against failure of the crop yielding to protect farmers from production risks.",
    image: { uri: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400" },
    type: "insurance",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    eligibility: [
      "All farmers growing notified crops",
      "Compulsory for loanee farmers",
      "Voluntary for non-loanee farmers",
      "Sharecroppers and tenant farmers eligible"
    ],
    benefits: [
      "Low premium rates (2% for Kharif, 1.5% for Rabi)",
      "Coverage from sowing to post-harvest",
      "Use of technology for quick settlement",
      "Coverage against prevented sowing/planting risks"
    ],
    applicationProcess: [
      "Apply through bank, CSC, or insurance company",
      "Fill application form with crop details",
      "Pay premium amount",
      "Get insurance certificate",
      "Report crop loss within 72 hours"
    ],
    documents: [
      "Aadhaar Card",
      "Bank Account Details",
      "Land Records (Khata/Khesra)",
      "Sowing Certificate",
      "Premium Payment Receipt"
    ],
    amount: "Premium: 2% for Kharif, 1.5% for Rabi crops",
    duration: "Seasonal (Kharif/Rabi)",
    officialLink: "https://pmfby.gov.in/",
    helplineNumber: "14447",
    status: "active"
  },
  {
    id: "s4",
    name: "Soil Health Card Scheme",
    description: "Provides soil health cards to farmers which will carry crop-wise recommendations of nutrients and fertilizers required.",
    image: { uri: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400" },
    type: "support",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    eligibility: [
      "All farmers with agricultural land",
      "Individual and institutional farmers",
      "No restriction on land size",
      "Available across all states"
    ],
    benefits: [
      "Free soil testing every 2 years",
      "Customized fertilizer recommendations",
      "Improved soil health and productivity",
      "Reduced input costs",
      "Digital soil health cards"
    ],
    applicationProcess: [
      "Contact local agriculture department",
      "Provide soil samples as per guidelines",
      "Soil testing at designated laboratories",
      "Receive soil health card with recommendations",
      "Follow recommendations for better yields"
    ],
    documents: [
      "Land ownership documents",
      "Aadhaar Card",
      "Mobile number for SMS alerts",
      "Bank details (if applicable)"
    ],
    amount: "Free of cost",
    duration: "Every 2 years",
    officialLink: "https://soilhealth.dac.gov.in/",
    helplineNumber: "011-23382012",
    status: "active"
  },
  {
    id: "s5",
    name: "PM Krishi Sinchai Yojana",
    description: "Aims to achieve convergence of investments in irrigation at the field level, expand cultivable area under assured irrigation.",
    image: { uri: "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deae?w=400" },
    type: "subsidy",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    eligibility: [
      "All categories of farmers",
      "Water User Associations",
      "Cooperatives and FPOs",
      "Self Help Groups",
      "Incorporated companies"
    ],
    benefits: [
      "Financial assistance for drip/sprinkler irrigation",
      "Subsidy up to 55% for small farmers",
      "Water conservation and efficiency",
      "Increased crop productivity",
      "Reduced cultivation costs"
    ],
    applicationProcess: [
      "Apply through state agriculture department",
      "Submit detailed project proposal",
      "Technical approval from competent authority",
      "Implementation with approved vendors",
      "Subsidy released after verification"
    ],
    documents: [
      "Land ownership documents",
      "Aadhaar Card and PAN Card",
      "Bank account details",
      "Caste certificate (if applicable)",
      "Water source availability certificate"
    ],
    amount: "Up to 55% subsidy (varies by category)",
    duration: "Project-based",
    officialLink: "https://pmksy.gov.in/",
    helplineNumber: "011-23388166",
    status: "active"
  },
  {
    id: "s6",
    name: "National Mission for Sustainable Agriculture",
    description: "Promotes sustainable agriculture practices through climate-resilient technologies and practices.",
    image: { uri: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400" },
    type: "support",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    eligibility: [
      "All farmers and farming communities",
      "Agricultural institutions and organizations",
      "State governments and UTs",
      "Research institutions"
    ],
    benefits: [
      "Promotion of climate-resilient practices",
      "Soil health improvement programs",
      "Water conservation techniques",
      "Integrated farming systems",
      "Capacity building and training"
    ],
    applicationProcess: [
      "Contact state nodal agency",
      "Submit project proposal",
      "Technical evaluation and approval",
      "Implementation with monitoring",
      "Regular reporting and evaluation"
    ],
    documents: [
      "Project proposal document",
      "Land details and ownership",
      "Environmental clearances",
      "Technical feasibility report",
      "Budget and implementation plan"
    ],
    amount: "Varies by project component",
    duration: "Multi-year projects",
    officialLink: "https://nmsa.dac.gov.in/",
    helplineNumber: "011-23382651",
    status: "active"
  }
];

const dropdownOptions = [
  { label: "All Schemes", value: "all" },
  { label: "Subsidies", value: "subsidy" },
  { label: "Loans", value: "loan" },
  { label: "Insurance", value: "insurance" },
  { label: "Support Programs", value: "support" },
  { label: "Training", value: "training" },
];

// Scheme Card Component
type SchemeItem = {
  id: string;
  name: string;
  description: string;
  image: { uri: string };
  type: string;
  ministry: string;
  eligibility: string[];
  benefits: string[];
  applicationProcess: string[];
  documents: string[];
  amount: string;
  duration: string;
  officialLink: string;
  helplineNumber: string;
  status: string;
};

const SchemeCard = ({ item }: { item: SchemeItem }) => {
  const handleLearnMore = () => {
    const content = `${item.name}

Ministry: ${item.ministry}
Amount: ${item.amount}
Duration: ${item.duration}

Description: ${item.description}

Eligibility:
${item.eligibility.map(e => `• ${e}`).join('\n')}

Benefits:
${item.benefits.map(b => `• ${b}`).join('\n')}

Application Process:
${item.applicationProcess.map((p, i) => `${i + 1}. ${p}`).join('\n')}

Required Documents:
${item.documents.map(d => `• ${d}`).join('\n')}

Helpline: ${item.helplineNumber}
Official Website: ${item.officialLink}`;

    Alert.alert(
      item.name,
      content,
      [
        { text: "Close", style: "cancel" },
        { 
          text: "Call Helpline", 
          onPress: () => Linking.openURL(`tel:${item.helplineNumber}`)
        },
        { 
          text: "Visit Website", 
          onPress: () => Linking.openURL(item.officialLink)
        },
        { 
          text: "Share", 
          onPress: () => {
            Share.share({
              message: content,
              title: item.name,
            });
          }
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardName}>{item.name}</Text>
      <Text style={styles.cardMinistry}>{item.ministry}</Text>
      <Text style={styles.cardDescription} numberOfLines={3}>{item.description}</Text>
      <View style={styles.cardDetails}>
        <Text style={styles.cardAmount}>{item.amount}</Text>
        <Text style={styles.cardDuration}>{item.duration}</Text>
      </View>
      <TouchableOpacity style={styles.cardButton} onPress={handleLearnMore}>
        <Text style={styles.cardButtonText}>LEARN MORE</Text>
      </TouchableOpacity>
    </View>
  );
};

// Main Schemes Screen
export default function SchemesScreen() {
  const [selectedType, setSelectedType] = useState("all");

  const filteredSchemes = selectedType === "all" 
    ? allSchemes 
    : allSchemes.filter(scheme => scheme.type === selectedType);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#2e7d32", "#43a047"]} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome5 name="chevron-left" size={22} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gov Subsidy & Loan</Text>
        <View style={{width: 40}} />
      </LinearGradient>

      {/* Type Filter Dropdown */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Scheme Type:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedType}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedType(itemValue)}
          >
            {dropdownOptions.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Schemes Grid */}
      <FlatList
        data={filteredSchemes}
        renderItem={({ item }) => <SchemeCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f0f0f0" },
  header: { 
    height: 90, 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    paddingHorizontal: 20,
    paddingTop:20,
  },
  backButton: { padding: 10 },
  headerTitle: { color: "white", fontSize: 22, fontWeight: "bold" },
  
  // Filter Styles
  filterContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginRight: 15,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#d0cfcfff",
  },
  picker: {
    height: 40,
    color: "#333",
  },
  
  // Grid and Card Styles
  grid: { padding: 15 },
  card: {
    width: '48%',
    backgroundColor: "white",
    borderRadius: 16,
    padding: 12,
    marginBottom: 15,
    alignItems: "center",
    elevation: 3,
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 5,
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
    color: "#333",
    marginBottom: 5,
  },
  cardMinistry: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
    marginBottom: 5,
    fontStyle: "italic",
  },
  cardDescription: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginVertical: 5,
    height: 50, // Fixed height to align buttons
    lineHeight: 16,
  },
  cardDetails: {
    alignItems: "center",
    marginVertical: 5,
  },
  cardAmount: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2e7d32",
    textAlign: "center",
  },
  cardDuration: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
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
