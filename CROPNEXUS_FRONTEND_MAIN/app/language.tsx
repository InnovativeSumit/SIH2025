import Checkbox from "expo-checkbox";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const LanguageCard = ({
  name,
  desc,
  isSelected,
  onPress,
}: {
  name: string;
  desc: string;
  isSelected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[styles.languageCard, isSelected && styles.selectedCard]}
    onPress={onPress}
  >
    <Text style={styles.languageName}>{name}</Text>
    <Text style={styles.languageDesc}>{desc}</Text>
  </TouchableOpacity>
);

export default function LanguageScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (!selectedLanguage) {
      Alert.alert("Selection Required", "Please select a language to continue.");
      return;
    }
    if (!accepted) {
      Alert.alert("Terms Required", "You must accept the terms to continue.");
      return;
    }
    router.push("/login");
  };

  return (
    <LinearGradient
      colors={["#e8f5e9", "#c8e6c9", "#a5d6a7"]}
      style={styles.body}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.cardContainer}>
          <LinearGradient colors={["#2e7d32", "#4caf50"]} style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={{
                  uri: "https://i.ibb.co/ksJ9p602/Screenshot-2025-09-12-095804.png",
                }}
                style={styles.logo}
              />
              <Text style={styles.appName}>CROPNEXUS</Text>
            </View>
          </LinearGradient>
          <View style={styles.content}>
            <Text style={styles.title}>Select your language</Text>
            <LanguageCard
              name="বাংলা (Bengali)"
              desc="আপনার ভাষায় কৃষি"
              isSelected={selectedLanguage === "bengali"}
              onPress={() => setSelectedLanguage("bengali")}
            />
            <View style={styles.divider} />
            <LanguageCard
              name="English"
              desc="Farming in your language"
              isSelected={selectedLanguage === "english"}
              onPress={() => setSelectedLanguage("english")}
            />
            <View style={styles.divider} />
            <LanguageCard
              name="हिंदी (Hindi)"
              desc="आपकी भाषा में কৃষি"
              isSelected={selectedLanguage === "hindi"}
              onPress={() => setSelectedLanguage("hindi")}
            />
          </View>
          <View style={styles.footer}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={accepted}
                onValueChange={setAccepted}
                color={accepted ? "#4caf50" : undefined}
              />
              <Text style={styles.terms}>
                I read and accept the terms of use and the privacy policy.
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.acceptButton,
                !accepted && { opacity: 0.6 }, // disable look
              ]}
              onPress={handleAccept}
            >
              <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: { flex: 1, width: "100%", justifyContent: "center" },
  cardContainer: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 10,
  },
  header: {
    padding: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: { flexDirection: "row", alignItems: "center", gap: 15 },
  logo: { width: 50, height: 50, borderRadius: 25 },
  appName: {
    color: "white",
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 1,
  },
  content: { padding: 30 },
  title: {
    textAlign: "center",
    color: "#2e7d32",
    marginBottom: 25,
    fontSize: 22,
    fontWeight: "600",
  },
  languageCard: {
    backgroundColor: "#f1f8e9",
    borderRadius: 15,
    padding: 20,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedCard: {
    borderColor: "#4caf50",
    transform: [{ translateY: -5 }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  languageName: {
    color: "#2e7d32",
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 5,
  },
  languageDesc: { color: "#689f38", fontSize: 14 },
  footer: { padding: 25, backgroundColor: "#f1f8e9", alignItems: "center" },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  terms: {
    marginLeft: 10,
    color: "#388e3c",
    fontSize: 14,
    flex: 1,
    textAlign: "left",
  },
  acceptButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 50,
    shadowColor: "#1b5e20",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  acceptButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  divider: { height: 1, backgroundColor: "#c8e6c9", marginVertical: 10 },
});
