import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
  Dimensions,
  TextInput,
  Modal,
  Animated,
  Easing,
  Platform,
  FlatList,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const CropNexusDashboard = () => {
  const navigation = useNavigation();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [aiChatVisible, setAiChatVisible] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your EcoNexus AI assistant. How can I help you today?", isUser: false }
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [soilImage, setSoilImage] = useState(null);
  const [selectedFaq, setSelectedFaq] = useState('');
  const [cropPredictionData, setCropPredictionData] = useState({
    location: '',
    soilType: '',
    temperature: '',
    rainfall: '',
    phLevel: ''
  });
  const [predictionResult, setPredictionResult] = useState(null);

  const sidebarAnim = useRef(new Animated.Value(-300)).current;
  const profileDropdownAnim = useRef(new Animated.Value(0)).current;

  // Stats data
  const statsData = [
    { id: 1, value: '68%', label: 'Soil Moisture', icon: 'water', color: '#2e7d32' },
    { id: 2, value: '24°C', label: 'Temperature', icon: 'thermometer-half', color: '#f59e0b' },
    { id: 3, value: '30%', label: 'Rain Chance', icon: 'cloud-rain', color: '#10b981' },
    { id: 4, value: '6.8', label: 'Soil pH Level', icon: 'ruler-combined', color: '#ef4444' },
  ];

  // Alert data
  const alertData = [
    { id: 1, type: 'Pest Alert', message: 'Potential aphid infestation detected in northern field', time: '2 hours ago', icon: 'exclamation-triangle' },
    { id: 2, type: 'Weather Update', message: 'Heavy rainfall expected in next 48 hours', time: '5 hours ago', icon: 'cloud-rain' },
    { id: 3, type: 'Irrigation Complete', message: 'Section B irrigation completed successfully', time: '1 day ago', icon: 'seedling' },
  ];

  // Team data
  const teamData = [
    { id: 1, name: 'SUMIT', role: 'AI Expert', experience: '1000+ years of experience', image: 'https://i.ibb.co/60n8dhQj/Screenshot-2025-09-12-103352.png' },
    { id: 2, name: 'MRITIKA', role: 'Dataset Expert', experience: 'AI girl', image: 'https://i.ibb.co/sdVwk4pL/Screenshot-2025-09-12-170759.png' },
    { id: 3, name: 'MANAB', role: 'Agricultural Researcher', experience: 'The cyber king', image: 'https://i.ibb.co/rRZCHcjQ/Screenshot-2025-09-12-110113.png' },
    { id: 4, name: 'DEBASHIS', role: 'Backend King', experience: 'Creating server side applications', image: 'https://i.ibb.co/JwsPTNFs/Screenshot-2025-09-12-103551.png' },
    { id: 5, name: 'SNEHA', role: '', experience: 'Creating server side applications', image: 'https://i.ibb.co/QvNN5LD1/Screenshot-2025-09-12-170747.png' },
    { id: 6, name: 'SUBHADIP', role: 'UI/UX Designer', experience: 'Creating farmer-friendly interfaces', image: 'https://i.ibb.co/wFZfS38f/Screenshot-2025-09-12-171412.png' },
  ];

  // FAQ data
  const faqData = [
    { id: 'faq1', question: 'How accurate are the crop predictions?', answer: 'Our crop prediction algorithm has an accuracy rate of approximately 85-90% based on historical data and field testing. Accuracy may vary based on the quality of input data and local conditions.' },
    { id: 'faq2', question: 'Is my data secure with CROPNEXUS?', answer: 'Yes, we take data security seriously. All your farm data is encrypted and stored securely. We never share your personal information or farm data with third parties without your permission.' },
    { id: 'faq3', question: 'What equipment do I need to use CROPNEXUS?', answer: 'CROPNEXUS works with any internet-connected device. For optimal results, we recommend using our soil sensors which provide real-time data to the platform. Basic functionality is available with just manual input of your farm conditions.' },
    { id: 'faq4', question: 'How often is weather data updated?', answer: 'Weather data is updated every 3 hours from reliable meteorological sources. Severe weather alerts are pushed to users in real-time.' },
    { id: 'faq5', question: 'Can I use CROPNEXUS on my mobile device?', answer: 'Yes, CROPNEXUS is fully responsive and works on smartphones and tablets. We also have mobile apps available for iOS and Android for enhanced functionality.' },
  ];

  useEffect(() => {
    if (sidebarVisible) {
      Animated.timing(sidebarAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(sidebarAnim, {
        toValue: -300,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [sidebarVisible]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownVisible(!profileDropdownVisible);
  };

  const toggleAiChat = () => {
    setAiChatVisible(!aiChatVisible);
  };

  const handleNavigation = (section) => {
    setActiveSection(section);
    setSidebarVisible(false);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => navigation.navigate('Login') }
    ]);
    setProfileDropdownVisible(false);
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = { id: messages.length + 1, text: messageInput, isUser: true };
      setMessages([...messages, newMessage]);
      setMessageInput('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = { id: messages.length + 2, text: "I'm here to help with your farming questions. What would you like to know?", isUser: false };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleCropPrediction = () => {
    // Simple mock prediction
    const { soilType, temperature } = cropPredictionData;
    let crop = "Corn"; // Default
    
    if (soilType === "clay" && temperature > 20) {
      crop = "Rice";
    } else if (soilType === "sandy" && temperature > 25) {
      crop = "Millet";
    } else if (soilType === "loamy") {
      crop = "Wheat";
    }
    
    setPredictionResult(`Based on your farm conditions, we recommend planting ${crop} for optimal yield.`);
  };

  const renderHeader = () => (
    <LinearGradient
      colors={['#2e7d32', '#43a047']}
      style={styles.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <TouchableOpacity style={styles.mobileMenuBtn} onPress={toggleSidebar}>
        <Ionicons name="menu" size={24} color="white" />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.userProfile} onPress={toggleProfileDropdown}>
        <View style={styles.profileAvatar}>
          <Text style={styles.avatarText}>JS</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>John Smith</Text>
          <Text style={styles.userRole}>Farmer</Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );

  const renderSidebar = () => (
    <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarAnim }] }]}>
      <ScrollView style={styles.sidebarScroll}>
        <TouchableOpacity 
          style={[styles.sidebarItem, activeSection === 'dashboard' && styles.sidebarItemActive]}
          onPress={() => handleNavigation('dashboard')}
        >
          <Ionicons name="home" size={20} color={activeSection === 'dashboard' ? '#2e7d32' : '#333'} />
          <Text style={[styles.sidebarText, activeSection === 'dashboard' && styles.sidebarTextActive]}>
            Dashboard
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.sidebarItem, activeSection === 'crop-prediction' && styles.sidebarItemActive]}
          onPress={() => handleNavigation('crop-prediction')}
        >
          <Ionicons name="leaf" size={20} color={activeSection === 'crop-prediction' ? '#2e7d32' : '#333'} />
          <Text style={[styles.sidebarText, activeSection === 'crop-prediction' && styles.sidebarTextActive]}>
            Crop Prediction
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.sidebarItem, activeSection === 'disease-detection' && styles.sidebarItemActive]}
          onPress={() => handleNavigation('disease-detection')}
        >
          <Ionicons name="medkit" size={20} color={activeSection === 'disease-detection' ? '#2e7d32' : '#333'} />
          <Text style={[styles.sidebarText, activeSection === 'disease-detection' && styles.sidebarTextActive]}>
            Plant Disease Detection
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.sidebarItem, activeSection === 'crop-calendar' && styles.sidebarItemActive]}
          onPress={() => handleNavigation('crop-calendar')}
        >
          <Ionicons name="calendar" size={20} color={activeSection === 'crop-calendar' ? '#2e7d32' : '#333'} />
          <Text style={[styles.sidebarText, activeSection === 'crop-calendar' && styles.sidebarTextActive]}>
            Crop Calendar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.sidebarItem, activeSection === 'soil-health' && styles.sidebarItemActive]}
          onPress={() => handleNavigation('soil-health')}
        >
          <Ionicons name="flask" size={20} color={activeSection === 'soil-health' ? '#2e7d32' : '#333'} />
          <Text style={[styles.sidebarText, activeSection === 'soil-health' && styles.sidebarTextActive]}>
            Soil Health
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.sidebarItem, activeSection === 'yield-prediction' && styles.sidebarItemActive]}
          onPress={() => handleNavigation('yield-prediction')}
        >
          <Ionicons name="stats-chart" size={20} color={activeSection === 'yield-prediction' ? '#2e7d32' : '#333'} />
          <Text style={[styles.sidebarText, activeSection === 'yield-prediction' && styles.sidebarTextActive]}>
            Crop Yield Prediction
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.sidebarItem, activeSection === 'pest-detection' && styles.sidebarItemActive]}
          onPress={() => handleNavigation('pest-detection')}
        >
          <Ionicons name="bug" size={20} color={activeSection === 'pest-detection' ? '#2e7d32' : '#333'} />
          <Text style={[styles.sidebarText, activeSection === 'pest-detection' && styles.sidebarTextActive]}>
            Pest & Pesticide Detection
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.sidebarItem, activeSection === 'live-market' && styles.sidebarItemActive]}
          onPress={() => handleNavigation('live-market')}
        >
          <Ionicons name="storefront" size={20} color={activeSection === 'live-market' ? '#2e7d32' : '#333'} />
          <Text style={[styles.sidebarText, activeSection === 'live-market' && styles.sidebarTextActive]}>
            Live Market
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.sidebarItem, activeSection === 'water-management' && styles.sidebarItemActive]}
          onPress={() => handleNavigation('water-management')}
        >
          <Ionicons name="water" size={20} color={activeSection === 'water-management' ? '#2e7d32' : '#333'} />
          <Text style={[styles.sidebarText, activeSection === 'water-management' && styles.sidebarTextActive]}>
            Water Management
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.sidebarItem, activeSection === 'community' && styles.sidebarItemActive]}
          onPress={() => handleNavigation('community')}
        >
          <Ionicons name="people" size={20} color={activeSection === 'community' ? '#2e7d32' : '#333'} />
          <Text style={[styles.sidebarText, activeSection === 'community' && styles.sidebarTextActive]}>
            Community
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.sidebarItem, activeSection === 'about' && styles.sidebarItemActive]}
          onPress={() => handleNavigation('about')}
        >
          <Ionicons name="information-circle" size={20} color={activeSection === 'about' ? '#2e7d32' : '#333'} />
          <Text style={[styles.sidebarText, activeSection === 'about' && styles.sidebarTextActive]}>
            About
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.sidebarItem, activeSection === 'contact' && styles.sidebarItemActive]}
          onPress={() => handleNavigation('contact')}
        >
          <Ionicons name="call" size={20} color={activeSection === 'contact' ? '#2e7d32' : '#333'} />
          <Text style={[styles.sidebarText, activeSection === 'contact' && styles.sidebarTextActive]}>
            Contact us
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarItem} onPress={handleLogout}>
          <Ionicons name="log-out" size={20} color="#333" />
          <Text style={styles.sidebarText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );

  const renderProfileDropdown = () => (
    <Modal
      visible={profileDropdownVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setProfileDropdownVisible(false)}
    >
      <TouchableOpacity 
        style={styles.dropdownOverlay}
        activeOpacity={1}
        onPress={() => setProfileDropdownVisible(false)}
      >
        <View style={styles.profileDropdown}>
          <LinearGradient
            colors={['#4aa550', '#2e7d32']}
            style={styles.dropdownHeader}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.headerAvatar}>
              <Text style={styles.headerAvatarText}>JS</Text>
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.dropdownUserName}>John Smith</Text>
              <Text style={styles.dropdownUserRole}>Farmer</Text>
            </View>
          </LinearGradient>

          <View style={styles.dropdownBody}>
            <View style={styles.infoItem}>
              <Ionicons name="person" size={18} color="#0c7d0a" style={styles.infoIcon} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>FULL NAME</Text>
                <Text style={styles.infoValue}>John Smith</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="at" size={18} color="#0c7d0a" style={styles.infoIcon} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>USERNAME</Text>
                <Text style={styles.infoValue}>johnsmith_farmer</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="mail" size={18} color="#0c7d0a" style={styles.infoIcon} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>EMAIL</Text>
                <Text style={styles.infoValue}>john@example.com</Text>
              </View>
            </View>
          </View>

          <View style={styles.dropdownFooter}>
            <TouchableOpacity style={styles.editBtn} onPress={() => Alert.alert('Edit Profile', 'Edit profile functionality')}>
              <Ionicons name="create" size={16} color="#4a6fa5" />
              <Text style={styles.editBtnText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
              <Ionicons name="log-out" size={16} color="#d9544f" />
              <Text style={styles.logoutBtnText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const renderDashboard = () => (
    <ScrollView style={styles.content}>
      <View style={styles.pageTitle}>
        <Text style={styles.pageTitleText}>Farm Dashboard</Text>
        <View style={styles.breadcrumb}>
          <Text style={styles.breadcrumbLink}>Home</Text>
          <Text style={styles.breadcrumbSeparator}>/</Text>
          <Text style={styles.breadcrumbText}>Dashboard</Text>
        </View>
      </View>

      <View style={styles.statsCards}>
        {statsData.map(stat => (
          <View key={stat.id} style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
              <FontAwesome5 name={stat.icon} size={24} color={stat.color} />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.chartsSection}>
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Soil Health Overview</Text>
            <View style={styles.chartActions}>
              <Text style={styles.chartActionText}>Last 30 Days</Text>
            </View>
          </View>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>Soil Health Chart</Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Recent Alerts</Text>
          </View>
          <View style={styles.alertsList}>
            {alertData.map(alert => (
              <View key={alert.id} style={styles.alertItem}>
                <View style={styles.alertIcon}>
                  <FontAwesome5 name={alert.icon} size={16} color="#2e7d32" />
                </View>
                <View style={styles.alertContent}>
                  <Text style={styles.alertType}>{alert.type}</Text>
                  <Text style={styles.alertMessage}>{alert.message}</Text>
                  <Text style={styles.alertTime}>{alert.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderAbout = () => (
    <ScrollView style={styles.content}>
      <View style={styles.pageTitle}>
        <Text style={styles.pageTitleText}>About Us</Text>
        <View style={styles.breadcrumb}>
          <Text style={styles.breadcrumbLink}>Home</Text>
          <Text style={styles.breadcrumbSeparator}>/</Text>
          <Text style={styles.breadcrumbText}>About</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Welcome to CROPNEXUS</Text>
        <Text style={styles.cardText}>
          CROPNEXUS is an innovative crop management system designed to help farmers make data-driven decisions for better yields and sustainable farming practices.
        </Text>
        <Text style={styles.cardText}>
          Our mission is to empower farmers with technology that simplifies complex agricultural decisions, from crop selection to harvest timing.
        </Text>
        <Text style={styles.sectionSubtitle}>Our Team: CROPNEXUS</Text>
      </View>

      <View style={styles.teamGrid}>
        {teamData.map(member => (
          <View key={member.id} style={styles.teamCard}>
            <Image source={{ uri: member.image }} style={styles.teamImage} />
            <Text style={styles.teamName}>{member.name}</Text>
            <Text style={styles.teamRole}>{member.role}</Text>
            <Text style={styles.teamExperience}>{member.experience}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionSubtitle}>Our Story</Text>
        <Text style={styles.cardText}>
          Founded in 2025, CROPNEXUS began as a university project aimed at helping local farmers improve their crop yields. Today, we've grown into a comprehensive platform serving farmers worldwide.
        </Text>
        <Text style={styles.cardText}>
          Founded in 2025, CROPNEXUS began as a university project aimed at helping local farmers improve their crop yields. Today, we've grown into a comprehensive platform serving farmers across multiple regions with data-driven agricultural insights.
        </Text>

        <Text style={styles.sectionSubtitle}>Our Technology</Text>
        <Text style={styles.cardText}>
          CROPNEXUS uses advanced machine learning algorithms combined with satellite imagery and IoT sensor data to provide accurate predictions and recommendations tailored to your specific farming conditions.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionSubtitle}>Frequently Asked Questions</Text>
        <View style={styles.faqContainer}>
          <Text style={styles.faqQuestion}>How accurate are the crop predictions?</Text>
          <Text style={styles.faqAnswer}>
            Our crop prediction algorithm has an accuracy rate of approximately 85-90% based on historical data and field testing. Accuracy may vary based on the quality of input data and local conditions.
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderAiChat = () => (
    <Modal
      visible={aiChatVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setAiChatVisible(false)}
    >
      <View style={styles.aiChatContainer}>
        <View style={styles.aiChatWindow}>
          <View style={styles.chatHeader}>
            <View style={styles.chatHeaderIcon}>
              <FontAwesome5 name="leaf" size={16} color="#22c55e" />
            </View>
            <Text style={styles.chatHeaderTitle}>EcoNexus AI Assistant</Text>
            <TouchableOpacity onPress={() => setAiChatVisible(false)} style={styles.closeChatBtn}>
              <Ionicons name="close" size={24} color="#22c55e" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={messages}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={[styles.message, item.isUser ? styles.userMessage : styles.aiMessage]}>
                <Text style={item.isUser ? styles.userMessageText : styles.aiMessageText}>
                  {item.text}
                </Text>
              </View>
            )}
            style={styles.chatMessages}
          />

          <View style={styles.chatInputContainer}>
            <TextInput
              style={styles.chatInput}
              value={messageInput}
              onChangeText={setMessageInput}
              placeholder="Type your message..."
              placeholderTextColor="#86efac"
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Ionicons name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderAiButton = () => (
    <TouchableOpacity style={styles.aiButton} onPress={toggleAiChat}>
      <Ionicons name="chatbubble" size={24} color="white" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderSidebar()}
      {renderProfileDropdown()}
      
      <View style={styles.mainContent}>
        {activeSection === 'dashboard' && renderDashboard()}
        {activeSection === 'about' && renderAbout()}
        {/* Add other sections here */}
      </View>

      {renderAiChat()}
      {renderAiButton()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mobileMenuBtn: {
    padding: 10,
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffeb3b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#2e7d32',
    fontWeight: 'bold',
    fontSize: 16,
  },
  userInfo: {
    justifyContent: 'center',
  },
  userName: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  userRole: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  sidebar: {
    position: 'absolute',
    top: 70,
    left: 0,
    width: 280,
    height: height - 70,
    backgroundColor: 'white',
    zIndex: 100,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  sidebarScroll: {
    flex: 1,
    paddingVertical: 20,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  sidebarItemActive: {
    backgroundColor: 'rgba(46, 125, 50, 0.1)',
    borderLeftColor: '#2e7d32',
  },
  sidebarText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  sidebarTextActive: {
    color: '#2e7d32',
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 70,
    paddingRight: 20,
  },
  profileDropdown: {
    width: 320,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  headerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  headerAvatarText: {
    color: '#2e7d32',
    fontWeight: 'bold',
    fontSize: 20,
  },
  headerInfo: {
    flex: 1,
  },
  dropdownUserName: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  dropdownUserRole: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  dropdownBody: {
    padding: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoIcon: {
    width: 30,
    marginRight: 10,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#777',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  dropdownFooter: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#e9f0f8',
    borderRadius: 6,
  },
  editBtnText: {
    color: '#4a6fa5',
    fontWeight: '500',
    marginLeft: 5,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f8e9e9',
    borderRadius: 6,
    marginLeft: 'auto',
  },
  logoutBtnText: {
    color: '#d9544f',
    fontWeight: '500',
    marginLeft: 5,
  },
  mainContent: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  pageTitle: {
    marginBottom: 30,
  },
  pageTitleText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 10,
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbLink: {
    color: '#4caf50',
    fontSize: 14,
  },
  breadcrumbSeparator: {
    marginHorizontal: 10,
    color: '#999',
  },
  breadcrumbText: {
    color: '#666',
    fontSize: 14,
  },
  statsCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  chartsSection: {
    flex: 1,
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  chartActions: {
    flexDirection: 'row',
  },
  chartActionText: {
    color: '#4caf50',
    fontSize: 14,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartPlaceholderText: {
    color: '#6b7280',
    fontWeight: '500',
  },
  alertsList: {
    marginTop: 10,
  },
  alertItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  alertIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(46, 125, 50, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  alertContent: {
    flex: 1,
  },
  alertType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  alertMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  alertTime: {
    fontSize: 12,
    color: '#999',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 15,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    marginTop: 20,
  },
  teamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  teamCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  teamImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#4caf50',
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  teamRole: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  teamExperience: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  faqContainer: {
    marginTop: 15,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  aiButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  aiChatContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  aiChatWindow: {
    height: '80%',
    backgroundColor: 'rgba(10, 26, 26, 0.95)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(46, 139, 87, 0.3)',
  },
  chatHeaderIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  chatHeaderTitle: {
    fontSize: 16,
    color: '#22c55e',
    fontWeight: '600',
    flex: 1,
  },
  closeChatBtn: {
    padding: 5,
  },
  chatMessages: {
    flex: 1,
    padding: 15,
  },
  message: {
    padding: 10,
    borderRadius: 18,
    marginBottom: 10,
    maxWidth: '80%',
  },
  aiMessage: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
  },
  userMessage: {
    backgroundColor: 'rgba(34, 197, 94, 0.4)',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  aiMessageText: {
    color: '#c6f6d5',
    fontSize: 14,
  },
  userMessageText: {
    color: '#0a1a1a',
    fontSize: 14,
  },
  chatInputContainer: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(46, 139, 87, 0.3)',
    alignItems: 'center',
  },
  chatInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#f0fff0',
    marginRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CropNexusDashboard;