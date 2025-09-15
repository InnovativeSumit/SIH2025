import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type RootStackParamList = {
    Login: undefined;
    Account: undefined;
};

// Data for Sidebar
const navLinks = [
    { name: 'Dashboard', icon: 'home', section: 'dashboard' },
    { name: 'AI Crop Prediction', icon: 'seedling', section: 'crop-prediction' },
    { name: 'AI Plant Disease Detection', icon: 'leaf', section: 'disease-detection' },
    { name: 'Community', icon: 'users', section: 'community' },
    { name: 'About', icon: 'info-circle', section: 'about' },
    { name: 'Contact Us', icon: 'phone', section: 'contact' },
];

export default function DashboardScreen() {
    const [activeSection, setActiveSection] = useState('dashboard');
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const renderSection = () => {
        switch (activeSection) {
            case 'dashboard':
                return <DashboardContent />;
            case 'about':
                return <AboutContent />;
            case 'contact':
                 return <ContactContent />;
            // Add other cases for other sections here
            default:
                return <View><Text style={{color: 'white'}}>Section not found</Text></View>;
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />
            {/* Header */}
            <LinearGradient colors={['#2e7d32', '#43a047']} style={styles.header}>
                <TouchableOpacity style={styles.mobileMenuBtn}>
                    <FontAwesome name="bars" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.userProfile}>
                    <View style={styles.userAvatar}><Text style={styles.avatarText}>JS</Text></View>
                    <View>
                        <Text style={styles.userName}>John Smith</Text>
                        <Text style={styles.userRole}>Farmer</Text>
                    </View>
                </TouchableOpacity>
            </LinearGradient>

            <View style={styles.container}>
                {/* Sidebar */}
                <View style={styles.sidebar}>
                    {navLinks.map((link) => (
                         <TouchableOpacity
                            key={link.section}
                            style={[styles.sidebarLink, activeSection === link.section && styles.activeLink]}
                            onPress={() => setActiveSection(link.section)}
                         >
                            <FontAwesome5 name={link.icon as any} size={20} color={activeSection === link.section ? '#2e7d32' : '#333'} />
                            <Text style={[styles.sidebarLinkText, activeSection === link.section && {color: '#2e7d32'}]}>{link.name}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.sidebarLink} onPress={() => navigation.navigate('Login')}>
                        <FontAwesome5 name="sign-out-alt" size={20} color="#333" />
                        <Text style={styles.sidebarLinkText}>Log Out</Text>
                    </TouchableOpacity>
                </View>

                {/* Main Content */}
                <ScrollView style={styles.mainContent}>
                    {renderSection()}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

// Separate components for content sections for clarity
const DashboardContent = () => (
    <View>
        <Text style={styles.pageTitle}>Farm Dashboard</Text>
        {/* Stat Cards */}
        <View style={styles.statsCards}>
            <View style={styles.card}><Text>Soil Moisture: 68%</Text></View>
            <View style={styles.card}><Text>Temperature: 24°C</Text></View>
            <View style={styles.card}><Text>Rain Chance: 30%</Text></View>
            <View style={styles.card}><Text>Soil pH Level: 6.8</Text></View>
        </View>
        {/* Charts */}
        <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Soil Health Overview</Text>
            <View style={styles.chartPlaceholder}><Text>Chart Area</Text></View>
        </View>
    </View>
);

const AboutContent = () => (
    <View>
        <Text style={styles.pageTitle}>About Us</Text>
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Welcome to CROPNEXUS</Text>
            <Text>CROPNEXUS is an innovative crop management system designed to help farmers make data-driven decisions for better yields and sustainable farming practices.</Text>
        </View>
    </View>
);

const ContactContent = () => (
     <View>
        <Text style={styles.pageTitle}>Contact Us</Text>
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Get in Touch</Text>
            <Text>Address: 123 Farm Road</Text>
             <Text>Phone: +1 (555) 123-4567</Text>
             <Text>Email: support@alcrop.com</Text>
        </View>
    </View>
);


const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#efefef' },
    header: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    mobileMenuBtn: { padding: 10 },
    userProfile: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    userAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#ffeb3b', justifyContent: 'center', alignItems: 'center' },
    avatarText: { fontWeight: 'bold', color: '#2e7d32' },
    userName: { color: 'white', fontWeight: '600' },
    userRole: { color: 'white', fontSize: 12, opacity: 0.8 },
    container: { flex: 1, flexDirection: 'row' },
    sidebar: {
        width: Dimensions.get('window').width * 0.35, // Responsive width
        maxWidth: 150,
        backgroundColor: 'white',
        paddingVertical: 20,
    },
    sidebarLink: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderLeftWidth: 4,
        borderLeftColor: 'transparent',
    },
    activeLink: {
        backgroundColor: 'rgba(46, 125, 50, 0.1)',
        borderLeftColor: '#2e7d32',
    },
    sidebarLinkText: {
        marginLeft: 10,
        fontWeight: '500',
        fontSize: 12,
        flex: 1,
    },
    mainContent: {
        flex: 1,
        padding: 20,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#2e7d32',
        marginBottom: 20,
    },
    statsCards: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 20,
        width: '100%', // Full width for mobile-first
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    chartContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
    },
    chartPlaceholder: {
        height: 200,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
});
