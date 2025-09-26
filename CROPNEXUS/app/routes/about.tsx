import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const teamMembers = [
  {
    name: 'SUMIT',
    role: 'TEAM LEADER',
    image: 'https://i.ibb.co/60n8dhQj/Screenshot-2025-09-12-103352.png',
    description: 'Leading the CropNexus vision with expertise in agricultural technology and team management.',
  },
  {
    name: 'MRITIKA',
    role: 'AI/ML DEVELOPER',
    image: 'https://i.ibb.co/sdVwk4pL/Screenshot-2025-09-12-170759.png',
    description: 'Developing cutting-edge AI models for plant disease detection and crop prediction.',
  },
  {
    name: 'MANAB',
    role: 'CYBERSECURITY EXPERT',
    image: 'https://i.ibb.co/rRZCHcjQ/Screenshot-2025-09-12-110113.png',
    description: 'Ensuring data security and privacy protection for all farming data and user information.',
  },
  {
    name: 'DEBASHIS',
    role: 'BACKEND DEVELOPER',
    image: 'https://i.ibb.co/JwsPTNFs/Screenshot-2025-09-12-103551.png',
    description: 'Building robust backend systems and APIs for seamless data processing and integration.',
  },
  {
    name: 'SNEHA',
    role: 'DATABASE DEVELOPER',
    image: 'https://i.ibb.co/QvNN5LD1/Screenshot-2025-09-12-170747.png',
    description: 'Designing and optimizing database systems for efficient storage and retrieval of agricultural data.',
  },
  {
    name: 'SUBHADIP',
    role: 'FRONTENED DEVELOPER',
    image: 'https://i.ibb.co/wFZfS38f/Screenshot-2025-09-12-171412.png',
    description: 'Creating intuitive and user-friendly interfaces that make farming technology accessible to everyone.',
  },
];

const features: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  title: string;
  description: string;
}[] = [
  {
    icon: 'leaf',
    title: 'AI Plant Disease Detection',
    description: 'Advanced machine learning algorithms to identify and diagnose plant diseases from photos.',
  },
  {
    icon: 'trending-up',
    title: 'Live Market Prices',
    description: 'Real-time crop market prices and trends to help farmers make informed selling decisions.',
  },
  {
    icon: 'partly-sunny',
    title: 'Weather Monitoring',
    description: 'Comprehensive weather forecasts and alerts tailored for agricultural planning.',
  },
  {
    icon: 'calendar',
    title: 'Crop Calendar',
    description: 'Smart scheduling and reminder system for all farming activities and tasks.',
  },
  {
    icon: 'analytics',
    title: 'Data Analytics',
    description: 'Insights and analytics to optimize crop yield and farming efficiency.',
  },
  {
    icon: 'globe',
    title: 'Multi-language Support',
    description: 'Available in English, Hindi, and Bengali to serve diverse farming communities.',
  },
];

export default function AboutUs() {
  const openWebsite = () => {
    Linking.openURL('https://cropnexus.com');
  };

  const openEmail = () => {
    Linking.openURL('mailto:info@cropnexus.com');
  };

  const renderHeader = () => (
    <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.headerSection}>
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: 'https://i.ibb.co/ksJ9p602/Screenshot-2025-09-12-095804.png',
          }}
          style={styles.logo}
        />
        <Text style={styles.appName}>CROPNEXUS</Text>
      </View>
      <Text style={styles.tagline}>
        Empowering Farmers with Smart Technology
      </Text>
      <Text style={styles.description}>
        CropNexus is an innovative agricultural technology platform that combines 
        artificial intelligence, real-time data, and user-friendly design to help 
        farmers optimize their crop production and increase profitability.
      </Text>
    </LinearGradient>
  );

  const renderMission = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Our Mission</Text>
      <Text style={styles.sectionText}>
        To revolutionize agriculture by providing farmers with cutting-edge technology 
        solutions that are accessible, affordable, and effective. We believe that every 
        farmer, regardless of their location or resources, should have access to the 
        tools and information needed to succeed in modern agriculture.
      </Text>
    </View>
  );

  const renderFeatures = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Key Features</Text>
      <View style={styles.featuresGrid}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Ionicons name={feature.icon} size={32} color="#4CAF50" />
            </View>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderTeam = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Meet Our Team</Text>
      <Text style={styles.sectionSubtitle}>
        Passionate professionals dedicated to transforming agriculture
      </Text>
      <View style={styles.teamGrid}>
        {teamMembers.map((member, index) => (
          <View key={index} style={styles.teamCard}>
            <Image source={{ uri: member.image }} style={styles.teamImage} />
            <Text style={styles.teamName}>{member.name}</Text>
            <Text style={styles.teamRole}>{member.role}</Text>
            <Text style={styles.teamDescription}>{member.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderValues = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Our Values</Text>
      <View style={styles.valuesContainer}>
        <View style={styles.valueItem}>
          <Ionicons name="people" size={24} color="#4CAF50" />
          <View style={styles.valueContent}>
            <Text style={styles.valueTitle}>Farmer-Centric</Text>
            <Text style={styles.valueDescription}>
              Every decision we make is guided by what's best for farmers and their communities.
            </Text>
          </View>
        </View>
        
        <View style={styles.valueItem}>
          <Ionicons name="bulb" size={24} color="#4CAF50" />
          <View style={styles.valueContent}>
            <Text style={styles.valueTitle}>Innovation</Text>
            <Text style={styles.valueDescription}>
              We continuously explore new technologies to solve agricultural challenges.
            </Text>
          </View>
        </View>
        
        <View style={styles.valueItem}>
          <Ionicons name="shield-checkmark" size={24} color="#4CAF50" />
          <View style={styles.valueContent}>
            <Text style={styles.valueTitle}>Reliability</Text>
            <Text style={styles.valueDescription}>
              Farmers depend on us, and we deliver consistent, accurate, and timely solutions.
            </Text>
          </View>
        </View>
        
        <View style={styles.valueItem}>
          <Ionicons name="leaf" size={24} color="#4CAF50" />
          <View style={styles.valueContent}>
            <Text style={styles.valueTitle}>Sustainability</Text>
            <Text style={styles.valueDescription}>
              We promote environmentally responsible farming practices for future generations.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderContact = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Get In Touch</Text>
      <Text style={styles.sectionText}>
        Have questions or suggestions? We'd love to hear from you!
      </Text>
      
      <View style={styles.contactButtons}>
        <TouchableOpacity style={styles.contactButton} onPress={openWebsite}>
          <Ionicons name="globe" size={20} color="white" />
          <Text style={styles.contactButtonText}>Visit Website</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.contactButton} onPress={openEmail}>
          <Ionicons name="mail" size={20} color="white" />
          <Text style={styles.contactButtonText}>Send Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderMission()}
        {renderFeatures()}
        {renderTeam()}
        {renderValues()}
        {renderContact()}
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 CropNexus. All rights reserved.
          </Text>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#358e38ff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomLeftRadius:8,
    borderBottomRightRadius:8,
    paddingTop: 40,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  headerSection: {
    padding: 30,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  featuresGrid: {
    marginTop: 16,
  },
  featureCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  teamGrid: {
    marginTop: 16,
  },
  teamCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  teamImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  teamRole: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    marginBottom: 8,
  },
  teamDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  valuesContainer: {
    marginTop: 16,
  },
  valueItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  valueContent: {
    flex: 1,
    marginLeft: 16,
  },
  valueTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  valueDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  contactButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  contactButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    flex: 0.45,
    justifyContent: 'center',
  },
  contactButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    backgroundColor:'gray'
  },
  footerText: {
    fontSize: 14,
    color: '#000000ff',
    marginBottom: 4,
  },
  versionText: {
    fontSize: 12,
    color: '#000000ff',
  },
});
