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
import { FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const CropNexusLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
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

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields!');
      return;
    }

    setIsLoggingIn(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoggingIn(false);
      Alert.alert('Success', 'Login successful!');
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

        <Animated.View
          style={[
            styles.formContainer,
            {
              opacity: containerAnim,
              transform: [{ translateY: containerTranslateY }],
            },
          ]}
        >
          {/* Logo */}
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
            <Text style={styles.title}>CROPNEXUS</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email or Phone</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email or phone"
                placeholderTextColor="#242020"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#242020"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.loginBtn, isLoggingIn && styles.loginBtnDisabled]}
                onPress={handleLogin}
                disabled={isLoggingIn}
              >
                <LinearGradient
                  colors={['#22c55e', '#4ade80']}
                  style={styles.loginBtnGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.loginBtnText}>
                    {isLoggingIn ? 'Logging in...' : 'Login'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <Text style={styles.orText}>or</Text>

              <TouchableOpacity style={styles.signupBtn}>
                <Text style={styles.signupBtnText}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
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
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    maxWidth: 420,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    padding: 25,
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    borderWidth: 5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    color: 'white',
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginTop: 30,
  },
  form: {
    padding: 36,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    color: 'white',
    fontWeight: '500',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 2,
    borderColor: '#C8E6C9',
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: 'white',
  },
  forgotPassword: {
    alignItems: 'center',
    marginBottom: 25,
  },
  forgotPasswordText: {
    color: 'white',
    fontWeight: '500',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  loginBtn: {
    flex: 1,
    minWidth: 120,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  loginBtnGradient: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnText: {
    color: '#0a1a1a',
    fontSize: 16,
    fontWeight: '600',
  },
  loginBtnDisabled: {
    opacity: 0.7,
  },
  orText: {
    fontWeight: '600',
    color: 'white',
  },
  signupBtn: {
    flex: 1,
    minWidth: 120,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupBtnText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CropNexusLogin;