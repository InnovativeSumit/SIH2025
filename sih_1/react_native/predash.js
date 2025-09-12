import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  Alert,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const FeatureCard = ({ title, description, iconName, iconType = 'FontAwesome5' }) => {
  const IconComponent = iconType === 'FontAwesome5' ? FontAwesome5 : MaterialIcons;
  
  return (
    <TouchableOpacity 
      style={styles.featureCard}
      activeOpacity={0.9}
      onPress={() => {}}
    >
      <View style={styles.featureHeader}>
        <View style={styles.featureTitleContainer}>
          <IconComponent name={iconName} style={styles.featureIcon} />
          <Text style={styles.featureTitle}>{title}</Text>
        </View>
      </View>
      <View style={styles.featureContent}>
        <Text style={styles.featureDesc}>{description}</Text>
        <View style={styles.divider} />
      </View>
    </TouchableOpacity>
  );
};

const FloatingLeaf = ({ left, right, delay }) => {
  const animatedValue = new Animated.Value(0);
  
  React.useEffect(() => {
    const animate = () => {
      animatedValue.setValue(0);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 15000,
        delay,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => animate());
    };
    
    animate();
  }, []);
  
  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [height, -height * 0.2]
  });
  
  const rotate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  
  return (
    <Animated.View
      style={[
        styles.leaf,
        {
          left: left ? left : undefined,
          right: right ? right : undefined,
          transform: [{ translateY }, { rotate }]
        }
      ]}
    >
      <FontAwesome5 name="leaf" size={24} color="rgba(34, 197, 94, 0.5)" />
    </Animated.View>
  );
};

const PerDash = ({ navigation }) => {
  const features = [
    {
      id: 1,
      title: 'AI Crop Prediction',
      description: 'AI-powered crop recommendations based on soil type, climate conditions, and market trends.',
      iconName: 'seedling',
    },
    {
      id: 2,
      title: 'AI Plant Disease Detection',
      description: 'Identify plant diseases, pests, and fertilizer needs through image recognition technology.',
      iconName: 'leaf',
    },
    {
      id: 3,
      title: 'Crop Calendar',
      description: 'Plan and manage farming activities with personalized crop calendar and to-do lists.',
      iconName: 'calendar-alt',
    },
    {
      id: 4,
      title: 'AI Soil Health',
      description: 'Comprehensive soil health analysis and recommendations for improvement.',
      iconName: 'vial',
    },
    {
      id: 5,
      title: 'AI Crop Yield Prediction',
      description: 'Predict crop yields using historical data, weather patterns, and farming practices.',
      iconName: 'chart-line',
    },
    {
      id: 6,
      title: 'Fertilizer And Pesticide Prediction',
      description: 'Identify pests and recommend appropriate pesticides with minimal environmental impact.',
      iconName: 'bug',
    },
    {
      id: 7,
      title: 'Live Market',
      description: 'Real-time market prices, trends, and trading platform for agricultural products.',
      iconName: 'store',
    },
    {
      id: 8,
      title: 'AI Powered Water Management',
      description: 'Optimize water usage with smart irrigation recommendations and monitoring.',
      iconName: 'tint',
    },
    {
      id: 9,
      title: 'Community',
      description: 'Connect with other farmers, share knowledge, and discuss agricultural practices.',
      iconName: 'users',
    },
  ];

  const handleGetStarted = () => {
    Alert.alert('Welcome to CropNexus!', 'Your agricultural journey begins now.');
    // navigation.navigate('Dashboard'); // Uncomment if you have navigation set up
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#183912', '#010f05']}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Floating leaves background */}
      <View style={styles.floatingLeaves}>
        <FloatingLeaf left="10%" delay={0} />
        <FloatingLeaf left="20%" delay={2000} />
        <FloatingLeaf left="30%" delay={4000} />
        <FloatingLeaf right="10%" delay={6000} />
        <FloatingLeaf right="20%" delay={8000} />
        <FloatingLeaf right="30%" delay={10000} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.logo}>CROPNEXUS</Text>
          <Text style={styles.logo1}>features</Text>
          <Text style={styles.tagline}>Comprehensive Agricultural Solutions Platform</Text>
        </View>

        <View style={styles.featuresGrid}>
          {features.map(feature => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              iconName={feature.iconName}
            />
          ))}
        </View>

        <View style={styles.getStartedContainer}>
          <TouchableOpacity 
            style={styles.getStartedBtn}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#183912',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    padding: 20,
  },
  logo: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  logo1: {
    color: 'white',
    fontSize: 30,
    marginTop: -19,
  },
  tagline: {
    fontSize: 18,
    color: '#d0e8bb',
    marginBottom: 30,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  featureCard: {
    width: width > 500 ? '48%' : '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },
  featureHeader: {
    padding: 20,
    backgroundColor: '#1f6a23',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featureTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 10,
    color: 'white',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  featureContent: {
    padding: 20,
  },
  featureDesc: {
    marginBottom: 15,
    color: '#555',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 15,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginTop: 30,
    padding: 30,
  },
  getStartedBtn: {
    backgroundColor: '#22c55e',
    paddingVertical: 18,
    paddingHorizontal: 45,
    borderRadius: 50,
    shadowColor: '#40ff06',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 10,
  },
  getStartedText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  floatingLeaves: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  leaf: {
    position: 'absolute',
  },
});

export default PerDash;