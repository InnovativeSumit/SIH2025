import { router } from "expo-router";
import React from "react";
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function OnboardingScreen1() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{
            uri: "https://i.ibb.co/xKQwgj5H/Screenshot-2025-09-12-184510.png",
          }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.para}>
          GROW SMARTLY TOGETHER WITH AI HARVEST MORE PROFIT
        </Text>
      </View>
      <View style={styles.navigation}>
        <TouchableOpacity
          style={styles.navButton1}
          onPress={() => router.push("/onboarding2")}
        >
          <Text style={styles.buttonText1}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton2}
          onPress={() => router.push("/onboarding2")}
        >
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
    paddingHorizontal: 20,
  },
  image: { width: 300, height: 300, borderRadius: 10 },
  para: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 30,
    fontWeight: "bold",
    color: "#333",
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
