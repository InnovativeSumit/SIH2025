import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const featuresData = [
 {
  icon: "seedling",
  title: "AI Crop Prediction",
  desc: "AI-powered crop recommendations based on soil type, climate conditions, and market demand.",
},
{
  icon: "leaf",
  title: "AI Plant Leaf Disease Detection",
  desc: "Detect plant diseases, pests, and nutrient deficiencies using AI image recognition.",
},
{
  icon: "vial",
  title: "AI Soil Health",
  desc: "Analyze soil nutrients, pH, and moisture to provide actionable improvement strategies.",
},
{
  icon: "chart-line",
  title: "AI Crop Yield Prediction",
  desc: "Forecast crop yields using weather data, historical trends, and farming practices.",
},
{
  icon: "tint",
  title: "AI Water Management",
  desc: "Optimize irrigation by predicting water needs with weather and soil data.",
},
{
  icon: "robot",
  title: "AI Chatbot",
  desc: "24/7 virtual farming assistant for answering queries, guidance, and recommendations.",
},
{
  icon: "calendar-alt",
  title: "Crop Management To-Do-List",
  desc: "Organize farming activities with a personalized crop calendar and daily task manager.",
},
{
  icon: "calendar-alt",
  title: "Live Weather",
  desc: "Organize farming activities with a personalized crop calendar and daily task manager.",
},
{
  icon: "store",
  title: "Live Market",
  desc: "Access real-time market prices, demand trends, and trading options for crops.",
},
{
  icon: "hand-holding-usd",
  title: "Gov. Subsidy & Loan",
  desc: "Get updates on government schemes, subsidies, and easy loan application processes.",
},
{
  icon: "book-open",
  title: "Farming Resources",
  desc: "Educational guides, tutorials, and best practices for modern farming techniques.",
},
{
  icon: "shopping-basket",
  title: "Products",
  desc: "Buy and sell farming products, seeds, fertilizers, and equipment directly.",
},
{
  icon: "users",
  title: "Community",
  desc: "Connect with fellow farmers, share experiences, and discuss agricultural practices.",
},

];

const FeatureCard = ({
  icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) => (
  <View style={styles.featureCard}>
    <View style={styles.featureHeader}>
      <FontAwesome5 name={icon} size={24} color="white" />
      <Text style={styles.featureTitle}>{title}</Text>
    </View>
    <View style={styles.featureContent}>
      <Text style={styles.featureDesc}>{desc}</Text>
    </View>
  </View>
);

export default function FeaturesScreen() {
  return (
    <LinearGradient colors={["#183912", "#010f05"]} style={styles.body}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.logo}>CROPNEXUS</Text>
            <Text style={styles.logo1}>Features</Text>
            <Text style={styles.tagline}>
              Comprehensive Agricultural Solutions Platform
            </Text>
          </View>

          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              desc={feature.desc}
            />
          ))}

          <View style={styles.getStartedContainer}>
            <TouchableOpacity
              style={styles.getStartedBtn}
              onPress={() => router.push("/dashboard")}
            >
              <Text style={styles.getStartedBtnText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1 },
  container: { flex: 1 },
  scrollContainer: { padding: 20 },
  header: { alignItems: "center", marginBottom: 40 },
  logo: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 10,
  },
  logo1: { color: "white", fontSize: 24, marginTop: -10, marginBottom: 10 },
  tagline: { fontSize: 16, color: "#d0e8bb" },
  featureCard: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
    marginBottom: 25,
  },
  featureHeader: {
    padding: 20,
    backgroundColor: "#1f6a23",
    flexDirection: "row",
    alignItems: "center",
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginLeft: 15,
    flex: 1,
  },
  featureContent: { padding: 20 },
  featureDesc: { color: "#555", fontSize: 15 },
  getStartedContainer: { alignItems: "center", marginTop: 30, padding: 10 },
  getStartedBtn: {
    backgroundColor: "#22c55e",
    paddingVertical: 18,
    paddingHorizontal: 45,
    borderRadius: 50,
    shadowColor: "rgb(64, 255, 6)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  getStartedBtnText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
