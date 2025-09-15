import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type RootStackParamList = {
  Dashboard: undefined;
};

const featuresData = [
    { icon: 'seedling', title: 'AI Crop Prediction', desc: 'AI-powered crop recommendations based on soil type, climate conditions, and market trends.' },
    { icon: 'leaf', title: 'AI Plant Disease Detection', desc: 'Identify plant diseases, pests, and fertilizer needs through image recognition technology.' },
    { icon: 'calendar-alt', title: 'Crop Calendar', desc: 'Plan and manage farming activities with personalized crop calendar and to-do lists.' },
    { icon: 'vial', title: 'AI Soil Health', desc: 'Comprehensive soil health analysis and recommendations for improvement.' },
    { icon: 'chart-line', title: 'AI Crop Yield Prediction', desc: 'Predict crop yields using historical data, weather patterns, and farming practices.' },
    { icon: 'bug', title: 'Fertilizer And Pesticide Prediction', desc: 'Identify pests and recommend appropriate pesticides with minimal environmental impact.' },
    { icon: 'store', title: 'Live Market', desc: 'Real-time market prices, trends, and trading platform for agricultural products.' },
    { icon: 'tint', title: 'AI Powered Water Management', desc: 'Optimize water usage with smart irrigation recommendations and monitoring.' },
    { icon: 'users', title: 'Community', desc: 'Connect with other farmers, share knowledge, and discuss agricultural practices.' },
];

const FeatureCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
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
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <LinearGradient colors={['#183912', '#010f05']} style={styles.body}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.header}>
                        <Text style={styles.logo}>CROPNEXUS</Text>
                        <Text style={styles.logo1}>Features</Text>
                        <Text style={styles.tagline}>Comprehensive Agricultural Solutions Platform</Text>
                    </View>
                    
                    {featuresData.map((feature, index) => (
                        <FeatureCard key={index} icon={feature.icon} title={feature.title} desc={feature.desc} />
                    ))}
                    
                    <View style={styles.getStartedContainer}>
                        <TouchableOpacity style={styles.getStartedBtn} onPress={() => navigation.navigate('Dashboard')}>
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
    scrollContainer: {
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#ffffff',
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 10,
    },
    logo1:{
        color:'white',
        fontSize:24,
        marginTop:-10,
        marginBottom: 10,
    },
    tagline: {
        fontSize: 16,
        color: '#d0e8bb',
    },
    featureCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 5,
        marginBottom: 25,
    },
    featureHeader: {
        padding: 20,
        backgroundColor: '#1f6a23',
        flexDirection: 'row',
        alignItems: 'center',
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        marginLeft: 15,
        flex: 1,
    },
    featureContent: {
        padding: 20,
    },
    featureDesc: {
        color: '#555',
        fontSize: 15,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginTop: 30,
        padding: 10,
    },
    getStartedBtn: {
        backgroundColor: '#22c55e',
        paddingVertical: 18,
        paddingHorizontal: 45,
        borderRadius: 50,
        shadowColor: 'rgb(64, 255, 6)',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 10,
    },
    getStartedBtnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
});
