import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type RootStackParamList = {
  Onboarding1: undefined;
  Signup: undefined;
};

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <LinearGradient colors={['#183912', '#010f05']} style={styles.body}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, justifyContent: 'center' }}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.innerContainer}>
              <View style={styles.header}>
                <View style={styles.logoContainer}>
                  <Image source={{ uri: 'https://i.ibb.co/ksJ9p602/Screenshot-2025-09-12-095804.png' }} style={styles.logo} />
                </View>
                <Text style={styles.title}>CROPNEXUS</Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email or Phone</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email or phone"
                    placeholderTextColor="#555"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#555"
                    secureTextEntry
                  />
                </View>

                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>

                <View style={styles.buttonsContainer}>
                  <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Onboarding1')}>
                    <Text style={styles.loginBtnText}>Login</Text>
                  </TouchableOpacity>
                  <Text style={styles.orText}>or</Text>
                  <TouchableOpacity style={styles.signupBtn} onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.signupBtnText}>Create Account</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    borderRadius: 25,
    overflow: 'hidden',
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
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    color: 'white',
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: 1,
  },
  formContainer: {
    paddingHorizontal: 36,
    paddingVertical: 20,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    marginBottom: 8,
    fontWeight: '500',
    color: '#ffffff',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 2,
    borderColor: '#c8e6c9',
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: '#fff'
  },
  forgotPassword: {
    textAlign: 'center',
    marginBottom: 25,
    color: '#ffffff',
    fontWeight: '500',
  },
  buttonsContainer: {
    alignItems: 'center',
  },
  loginBtn: {
    width: '100%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
  loginBtnText: {
    color: '#0a1a1a',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    fontWeight: '600',
    color: '#fff8f8',
    marginVertical: 15,
  },
  signupBtn: {
    width: '100%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: 'white',
    borderColor: '#4caf50',
    borderWidth: 2,
    alignItems: 'center',
  },
  signupBtnText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});
