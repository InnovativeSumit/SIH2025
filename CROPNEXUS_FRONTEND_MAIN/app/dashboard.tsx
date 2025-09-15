import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, Stack } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated, // Import Animated
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SIDEBAR_WIDTH = Dimensions.get("window").width * 0.75; // Sidebar will be 75% of screen width

// --- Data for mapping (remains the same) ---
const sidebarLinks = [
  { name: "Dashboard", icon: "home", section: "dashboard" },
  { name: "AI Crop Prediction", icon: "seedling", section: "crop-prediction" },
  { name: "Disease Detection", icon: "leaf", section: "disease-detection" },
  { name: "Yield Prediction", icon: "chart-line", section: "yield-prediction" },
  { name: "Soil Health", icon: "vial", section: "soil-health" },
  { name: "Water Management", icon: "tint", section: "water-management" },
  { name: "Crop Calendar", icon: "calendar-alt", section: "crop-calendar" },
  { name: "Live Market", icon: "store", section: "live-market" },
  { name: "Farming Resources", icon: "book", section: "farming-resources" },
  { name: "Community", icon: "users", section: "community" },
  { name: "About Us", icon: "info-circle", section: "about" },
  { name: "Contact Us", icon: "phone-alt", section: "contact" },
];
const statCards = [
  {
    icon: "tint",
    value: "68%",
    label: "Soil Moisture",
    color: "#2e7d32",
    bgColor: "rgba(46, 125, 50, 0.1)",
  },
  {
    icon: "thermometer-half",
    value: "24°C",
    label: "Temperature",
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.1)",
  },
  {
    icon: "cloud-rain",
    value: "30%",
    label: "Rain Chance",
    color: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.1)",
  },
  {
    icon: "ruler-combined",
    value: "6.8",
    label: "Soil pH Level",
    color: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.1)",
  },
];
const teamMembers = [
  {
    img: "https://i.ibb.co/60n8dhQj/Screenshot-2025-09-12-103352.png",
    name: "SUMIT",
    role: "AIML DEVELOPER ",
  },
  {
    img: "https://i.ibb.co/QvNN5LD1/Screenshot-2025-09-12-170747.png",
    name: "SNEHA",
    role: "DATABASE DEVELOPER",
  },
  {
    img: "https://i.ibb.co/sdVwk4pL/Screenshot-2025-09-12-170759.png",
    name: "MRITIKA",
    role: "AIML DEVELOPER",
  },
  {
    img: "https://i.ibb.co/rRZCHcjQ/Screenshot-2025-09-12-110113.png",
    name: "MANAB",
    role: "CYBERSECURITY EXPERT",
  },
  {
    img: "https://i.ibb.co/JwsPTNFs/Screenshot-2025-09-12-103551.png",
    name: "DEBASHIS",
    role: "BACKEND DEVELOPER",
  },
  
  {
    img: "https://i.ibb.co/wFZfS38f/Screenshot-2025-09-12-171412.png",
    name: "SUBHADIP",
    role: "UI/UX DESIGNER",
  },
];

// --- Sub-components for better organization ---

interface HeaderProps {
  onMenuPress: () => void;
  onProfilePress: () => void;
}

const Header = ({ onMenuPress, onProfilePress }: HeaderProps) => (
  <LinearGradient colors={["#2e7d32", "#43a047"]} style={styles.header}>
    <TouchableOpacity onPress={onMenuPress} style={styles.mobileMenuBtn}>
      <FontAwesome5 name="bars" size={22} color="white" />
    </TouchableOpacity>
    <TouchableOpacity onPress={onProfilePress} style={styles.userProfile}>
      <View style={styles.userAvatar}>
        <Text style={styles.avatarText}>JS</Text>
      </View>
      <View>
        <Text style={styles.userName}>John Smith</Text>
        <Text style={styles.userRole}>Farmer</Text>
      </View>
    </TouchableOpacity>
  </LinearGradient>
);

interface ProfileDropdownProps {
  visible: boolean;
  onClose: () => void;
}

const ProfileDropdown = ({ visible, onClose }: ProfileDropdownProps) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="fade"
    onRequestClose={onClose}
  >
    <TouchableOpacity
      style={styles.modalOverlay}
      activeOpacity={1}
      onPress={onClose}
    >
      <View style={styles.dropdownContainer}>
        <View style={styles.dropdownHeader}>
          <View style={styles.headerAvatar}>
            <Text style={styles.avatarTextLg}>JS</Text>
          </View>
          <View>
            <Text style={styles.userNameLg}>John Smith</Text>
            <Text style={styles.userRoleLg}>Farmer</Text>
          </View>
        </View>
        <View style={styles.dropdownBody}>
          <View style={styles.infoItem}>
            <FontAwesome5 name="user" style={styles.infoIcon} />
            <Text style={styles.infoValue}>John Smith</Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome5 name="at" style={styles.infoIcon} />
            <Text style={styles.infoValue}>johnsmith_farmer</Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome5 name="envelope" style={styles.infoIcon} />
            <Text style={styles.infoValue}>john@example.com</Text>
          </View>
        </View>
        <View style={styles.dropdownFooter}>
          <TouchableOpacity
            style={styles.btnEdit}
            onPress={() => {
              onClose();
              router.push("/account");
            }}
          >
            <FontAwesome5 name="edit" size={14} color="#4a6fa5" />
            <Text style={styles.btnEditText}> Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnLogout}
            onPress={() => {
              onClose();
              router.replace("/login");
            }}
          >
            <FontAwesome5 name="sign-out-alt" size={14} color="#d9544f" />
            <Text style={styles.btnLogoutText}> Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  </Modal>
);

interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar = ({ isVisible, onClose, activeSection, setActiveSection }: SidebarProps) => {
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -SIDEBAR_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  interface HandleLinkPressProps {
    section: string;
  }

  const handleLinkPress = (section: HandleLinkPressProps["section"]) => {
    setActiveSection(section);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.sidebarOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <Animated.View
          style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
        >
          {sidebarLinks.map((link) => (
            <TouchableOpacity
              key={link.section}
              style={[
                styles.sidebarLink,
                activeSection === link.section && styles.activeLink,
              ]}
              onPress={() => handleLinkPress(link.section)}
            >
              <FontAwesome5
                name={link.icon as any}
                size={18}
                color={activeSection === link.section ? "#2e7d32" : "#333"}
                style={styles.sidebarIcon}
              />
              <Text
                style={[
                  styles.sidebarLinkText,
                  activeSection === link.section && styles.activeLinkText,
                ]}
              >
                {link.name}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.sidebarLink}
            onPress={() => {
              onClose();
              router.replace("/login");
            }}
          >
            <FontAwesome5
              name="sign-out-alt"
              size={18}
              color="#333"
              style={styles.sidebarIcon}
            />
            <Text style={styles.sidebarLinkText}>Log Out</Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

// ... other content components (DashboardContent, AboutContent, etc.) remain the same ...
const DashboardContent = () => (
  <>
    <Text style={styles.pageTitle}>Farm Dashboard</Text>
    <View style={styles.statsCards}>
      {statCards.map((card, index) => (
        <View key={index} style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: card.bgColor }]}>
            <FontAwesome5
              name={card.icon as any}
              size={24}
              color={card.color}
            />
          </View>
          <View>
            <Text style={styles.statValue}>{card.value}</Text>
            <Text style={styles.statLabel}>{card.label}</Text>
          </View>
        </View>
      ))}
    </View>
    <View style={styles.card}>
      <Text style={styles.chartTitle}>Soil Health Overview</Text>
      <View style={styles.chartPlaceholder}>
        <Text>Chart Area</Text>
      </View>
    </View>
  </>
);
const AboutContent = () => (
  <>
    <Text style={styles.pageTitle}>About Us</Text>
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Welcome to CROPNEXUS</Text>
      <Text style={styles.cardText}>An innovative crop management system.</Text>
    </View>
    <View style={styles.teamCards}>
      {teamMembers.map((member, index) => (
        <View key={index} style={styles.teamCard}>
          <Image source={{ uri: member.img }} style={styles.teamImg} />
          <Text style={styles.teamName}>{member.name}</Text>
          <Text style={styles.teamRole}>{member.role}</Text>
        </View>
      ))}
    </View>
  </>
);
const ContactContent = () => (
  <>
    <Text style={styles.pageTitle}>Contact Us</Text>
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Send Us a Message</Text>
      <TextInput style={styles.input} placeholder="Your Name" />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Your Message"
        multiline
      />
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Send Message</Text>
      </TouchableOpacity>
    </View>
  </>
);
const AIChatWidget = () => {
  /* ... AI Chat Widget code remains the same ... */
  const [isChatVisible, setChatVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={styles.aiButton}
        onPress={() => setChatVisible(true)}
      >
        <FontAwesome5 name="robot" size={24} color="white" />
      </TouchableOpacity>
      <Modal
        visible={isChatVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setChatVisible(false)}
      >
        <View style={styles.chatOverlay}>
          <View style={styles.chatContainer}>
            <View style={styles.chatHeader}>
              <Text style={styles.chatTitle}>AI Assistant</Text>
              <TouchableOpacity onPress={() => setChatVisible(false)}>
                <FontAwesome5 name="times" size={20} color="#22c55e" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.chatMessages}>
              <View style={styles.aiMessage}>
                <Text style={styles.aiMessageText}>
                  Hello! How can I help you today?
                </Text>
              </View>
            </ScrollView>
            <View style={styles.chatInputContainer}>
              <TextInput
                style={styles.chatInput}
                placeholder="Type your message..."
              />
              <TouchableOpacity style={styles.chatSendBtn}>
                <FontAwesome5 name="paper-plane" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

// --- Main Screen Component ---
export default function DashboardScreen() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const renderContent = () => {
    // You can add all the other "if" statements here for your new sections
    if (activeSection === "about") return <AboutContent />;
    if (activeSection === "contact") return <ContactContent />;
    return <DashboardContent />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />

      <Header
        onMenuPress={() => setSidebarVisible(true)}
        onProfilePress={() => setDropdownVisible(true)}
      />
      <ProfileDropdown
        visible={isDropdownVisible}
        onClose={() => setDropdownVisible(false)}
      />
      <Sidebar
        isVisible={isSidebarVisible}
        onClose={() => setSidebarVisible(false)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <ScrollView style={styles.mainContent}>{renderContent()}</ScrollView>

      <AIChatWidget />
    </SafeAreaView>
  );
}

// --- Stylesheet ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f0f0f0" },
  header: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    elevation: 4,
  },
  mobileMenuBtn: { padding: 10 },
  userProfile: { flexDirection: "row", alignItems: "center", gap: 10 },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffeb3b",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { fontWeight: "bold", color: "#2e7d32", fontSize: 16 },
  userName: { color: "white", fontWeight: "600" },
  userRole: { color: "white", fontSize: 12, opacity: 0.8 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", padding: 20 },
  dropdownContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 75,
    alignSelf: "flex-end",
    width: "90%",
    maxWidth: 320,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
  },
  dropdownHeader: {
    backgroundColor: "#4aa550",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  headerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarTextLg: { fontWeight: "bold", color: "#4aa550", fontSize: 24 },
  userNameLg: { color: "white", fontWeight: "bold", fontSize: 18 },
  userRoleLg: { color: "white", fontSize: 14, opacity: 0.9 },
  dropdownBody: { padding: 20 },
  infoItem: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  infoIcon: { width: 30, color: "#0c7d0a", fontSize: 16, textAlign: "center" },
  infoValue: { fontSize: 15, color: "#333", fontWeight: "500" },
  dropdownFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    padding: 15,
  },
  btnEdit: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e9f0f8",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  btnEditText: { color: "#4a6fa5", fontWeight: "500" },
  btnLogout: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8e9e9",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  btnLogoutText: { color: "#d9544f", fontWeight: "500" },
  mainContent: { flex: 1, padding: 20 },
  pageTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 20,
  },
  statsCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: -5,
  },
  statCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  statValue: { fontSize: 22, fontWeight: "bold", color: "#333" },
  statLabel: { fontSize: 14, color: "#666" },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  chartTitle: { fontSize: 18, fontWeight: "600", marginBottom: 15 },
  chartPlaceholder: {
    height: 200,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 10,
  },
  cardText: { fontSize: 15, color: "#555", lineHeight: 22 },
  teamCards: { marginTop: 10 },
  teamCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  teamImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 4,
    borderColor: "#66bb6a",
  },
  teamName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  teamRole: { fontSize: 14, color: "#66bb6a", marginTop: 2 },
  input: {
    backgroundColor: "#f7f7f7",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: "#2e7d32",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  aiButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2e7d32",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
  chatOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  chatContainer: {
    height: "60%",
    backgroundColor: "#0a1a1a",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(46, 139, 87, 0.3)",
  },
  chatTitle: { color: "#22c55e", fontSize: 18, fontWeight: "bold" },
  chatMessages: { flex: 1, padding: 15 },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(34, 197, 94, 0.15)",
    padding: 10,
    borderRadius: 15,
    borderBottomLeftRadius: 3,
    marginBottom: 10,
  },
  aiMessageText: { color: "#c6f6d5" },
  chatInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(46, 139, 87, 0.3)",
  },
  chatInput: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#f0fff0",
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  chatSendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#22c55e",
    justifyContent: "center",
    alignItems: "center",
  },

  // --- New Styles for Slide-in Sidebar ---
  sidebarOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    height: "100%",
    backgroundColor: "white",
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sidebarLink: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderLeftWidth: 4,
    borderLeftColor: "transparent",
  },
  activeLink: {
    backgroundColor: "rgba(46, 125, 50, 0.1)",
    borderLeftColor: "#2e7d32",
  },
  sidebarIcon: { width: 24, textAlign: "center" },
  sidebarLinkText: {
    marginLeft: 15,
    fontWeight: "500",
    fontSize: 16,
    color: "#333",
  },
  activeLinkText: { color: "#2e7d32" },
});
