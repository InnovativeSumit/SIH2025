import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  Easing,
  Dimensions,
  SafeAreaView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const CropNexusSignUp = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordStrengthColor, setPasswordStrengthColor] = useState('#e74c3c');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const logoAnim = useRef(new Animated.Value(0)).current;
  const containerAnim = useRef(new Animated.Value(0)).current;

  // Floating leaves animation
  const leafAnimations = useRef(
    Array(6)
      .fill(0)
      .map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    // Logo animation on mount
    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Container fade-in animation
    Animated.timing(containerAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Floating leaves animations
    leafAnimations.forEach((anim, index) => {
      Animated.loop(
        Animated.timing(anim, {
          toValue: 1,
          duration: 15000 + index * 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    });
  }, []);

  useEffect(() => {
    calculatePasswordStrength(password);
  }, [password]);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    setPasswordStrength(strength);
    
    if (strength < 50) {
      setPasswordStrengthColor('#e74c3c');
    } else if (strength < 75) {
      setPasswordStrengthColor('#f39c12');
    } else {
      setPasswordStrengthColor('#2ecc71');
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSignUp = () => {
    if (fullName.length < 3) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert('Success', 'Account created successfully! Welcome to CropNexus.');
      // Navigate to the next screen (lang.html in the original)
      // navigation.navigate('LanguageSelection');
    }, 1500);
  };

  const renderFloatingLeaves = () => {
    const leafPositions = [
      { left: '10%', delay: 0 },
      { left: '20%', delay: 2 },
      { left: '30%', delay: 4 },
      { right: '10%', delay: 6 },
      { right: '20%', delay: 8 },
      { right: '30%', delay: 10 },
    ];

    return leafPositions.map((position, index) => {
      const translateY = leafAnimations[index].interpolate({
        inputRange: [0, 1],
        outputRange: [height, -height * 0.2],
      });

      const rotate = leafAnimations[index].interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      });

      return (
        <Animated.View
          key={index}
          style={[
            styles.leaf,
            {
              [position.left ? 'left' : 'right']: position.left || position.right,
              transform: [{ translateY }, { rotate }],
            },
          ]}
        >
          <FontAwesome5 name="leaf" size={24} color="rgba(34, 197, 94, 0.5)" />
        </Animated.View>
      );
    });
  };

  const logoSpin = logoAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const logoScale = logoAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.8, 1.1, 1],
  });

  const containerTranslateY = containerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#183912', '#010f05']}
        style={styles.container}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        {/* Background with floating leaves */}
        <View style={styles.hero}>
          {renderFloatingLeaves()}
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Animated.View
            style={[
              styles.formContainer,
              {
                opacity: containerAnim,
                transform: [{ translateY: containerTranslateY }],
              },
            ]}
          >
            {/* Logo and Header */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Animated.View
                  style={[
                    styles.logo,
                    {
                      transform: [
                        { rotateY: logoSpin },
                        { rotateX: logoSpin },
                        { scale: logoScale },
                      ],
                    },
                  ]}
                >
                  <Image
                    source={{ uri: 'https://i.ibb.co/ksJ9p602/Screenshot-2025-09-12-095804.png' }}
                    style={styles.logoImage}
                  />
                </Animated.View>
              </View>
              <Text style={styles.title}>JOIN CROPNEXUS</Text>
              <Text style={styles.subtitle}>Create your account to get started</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name:</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    placeholderTextColor="#242020"
                    value={fullName}
                    onChangeText={setFullName}
                  />
                  <MaterialIcons name="person" size={20} color="#000000" style={styles.inputIcon} />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address:</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#242020"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                  <MaterialIcons name="email" size={20} color="#000000" style={styles.inputIcon} />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password:</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Create a strong password"
                    placeholderTextColor="#242020"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                  <MaterialIcons name="lock" size={20} color="#000000" style={styles.inputIcon} />
                </View>
                
                {/* Password Strength Bar */}
                <View style={styles.passwordStrength}>
                  <View 
                    style={[
                      styles.passwordStrengthBar, 
                      { 
                        width: `${passwordStrength}%`,
                        backgroundColor: passwordStrengthColor
                      }
                    ]} 
                  />
                </View>
                
                <Text style={styles.passwordRequirements}>
                  Use 8+ characters with a mix of letters, numbers & symbols
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.signUpBtn, isSubmitting && styles.signUpBtnDisabled]}
                onPress={handleSignUp}
                disabled={isSubmitting}
              >
                <Text style={styles.signUpBtnText}>
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Text>
              </TouchableOpacity>

              <View style={styles.divider}>
                <Text style={styles.dividerText}>Or continue with</Text>
              </View>

              <View style={styles.socialLogin}>
                <TouchableOpacity style={[styles.socialBtn, styles.google]}>
                  <FontAwesome5 name="google" size={20} color="white" />
                </TouchableOpacity>
              </View>

              <View style={styles.signInLink}>
                <Text style={styles.signInText}>
                  Already you have an account?{' '}
                  <Text style={styles.signInLinkText} onPress={() => navigation.navigate('Login')}>
                    Sign In
                  </Text>
                </Text>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#183912',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  hero: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  leaf: {
    position: 'absolute',
    top: -50,
  },
  formContainer: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    padding: 30,
    alignItems: 'center',
  },
  logoContainer: {
    width: 90,
    height: 90,
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
    borderWidth: 5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
  },
  form: {
    padding: 30,
  },
  inputGroup: {
    marginBottom: 22,
  },
  label: {
    color: 'white',
    fontWeight: '500',
    marginBottom: 8,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: 14,
    paddingRight: 40,
    borderWidth: 1,
    borderColor: '#9bcb77',
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: '#f9fbf7',
  },
  inputIcon: {
    position: 'absolute',
    right: 12,
    top: 14,
  },
  passwordStrength: {
    height: 5,
    backgroundColor: '#fafafa',
    marginTop: 8,
    borderRadius: 3,
    overflow: 'hidden',
  },
  passwordStrengthBar: {
    height: '100%',
    borderRadius: 3,
  },
  passwordRequirements: {
    marginTop: 8,
    fontSize: 12,
    color: 'white',
  },
  signUpBtn: {
    width: '100%',
    padding: 16,
    backgroundColor: '#4caf50',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#4caf50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  signUpBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpBtnDisabled: {
    opacity: 0.7,
  },
  divider: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerText: {
    color: 'white',
    letterSpacing: 2,
  },
  socialLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  google: {
    backgroundColor: '#DB4437',
  },
  signInLink: {
    alignItems: 'center',
    marginTop: 30,
  },
  signInText: {
    color: 'white',
    fontSize: 15,
  },
  signInLinkText: {
    color: '#4caf50',
    fontWeight: '600',
  },
});

export default CropNexusSignUp;