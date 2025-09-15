import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type RootStackParamList = {
  Login: undefined;
};

export default function SignupScreen() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const checkPasswordStrength = (text: string) => {
    setPassword(text);
    let score = 0;
    if (text.length >= 8) score += 25;
    if (/[A-Z]/.test(text)) score += 25;
    if (/[0-9]/.test(text)) score += 25;
    if (/[^A-Za-z0-9]/.test(text)) score += 25;
    setStrength(score);
  };

  const getStrengthColor = () => {
    if (strength < 50) return '#e74c3c';
    if (strength < 75) return '#f39c12';
    return '#2ecc71';
  };
  
  const handleCreateAccount = () => {
      Alert.alert(
          "Account Created",
          "Your account has been created successfully! Please log in to continue.",
          [{ text: "OK", onPress: () => navigation.navigate('Login') }]
      );
  };

  return (
    <LinearGradient colors={['#183912', '#010f05']} style={styles.body}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.innerContainer}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Image source={{ uri: 'https://i.ibb.co/ksJ9p602/Screenshot-2025-09-12-095804.png' }} style={styles.logo} />
              </View>
              <Text style={styles.title}>JOIN CROPNEXUS</Text>
              <Text style={styles.subtitle}>Create your account to get started</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name:</Text>
                <View>
                  <TextInput style={styles.input} placeholder="Enter your full name" placeholderTextColor="#888"/>
                  <FontAwesome name="user" size={20} color="black" style={styles.icon} />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address:</Text>
                <View>
                  <TextInput style={styles.input} placeholder="Enter your email" placeholderTextColor="#888" keyboardType="email-address" />
                  <FontAwesome name="envelope" size={20} color="black" style={styles.icon} />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password:</Text>
                 <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Create a strong password"
                        placeholderTextColor="#888"
                        secureTextEntry
                        value={password}
                        onChangeText={checkPasswordStrength}
                    />
                    <FontAwesome name="lock" size={20} color="black" style={styles.icon} />
                </View>
                <View style={styles.passwordStrength}>
                  <View style={[styles.passwordStrengthBar, { width: `${strength}%`, backgroundColor: getStrengthColor() }]} />
                </View>
                <Text style={styles.passwordRequirements}>Use 8+ characters with a mix of letters, numbers & symbols</Text>
              </View>

              <TouchableOpacity style={styles.btn} onPress={handleCreateAccount}>
                <Text style={styles.btnText}>Create Account</Text>
              </TouchableOpacity>
              
              <View style={styles.dividerContainer}>
                 <View style={styles.dividerLine} />
                 <Text style={styles.dividerText}>Or continue with</Text>
                 <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialLogin}>
                <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#db4437' }]}>
                  <FontAwesome5 name="google" size={18} color="white" />
                </TouchableOpacity>
              </View>

              <View style={styles.signinLink}>
                <Text style={{ color: 'white' }}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.link}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    body: { flex: 1 },
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    scrollContainer: { flexGrow: 1, justifyContent: 'center' },
    innerContainer: {
        width: '100%',
        maxWidth: 440,
        backgroundColor: 'transparent',
        borderRadius: 16,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    header: {
        alignItems: 'center',
        padding: 30,
    },
    logoContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 25,
        elevation: 10,
    },
    logo: {
        width: '100%',
        height: '100%',
        borderRadius: 45,
    },
    title: {
        fontWeight: '600',
        fontSize: 28,
        color: 'white',
        marginBottom: 8,
    },
    subtitle: {
        opacity: 0.9,
        fontSize: 16,
        color: 'white',
    },
    formContainer: {
        padding: 30,
    },
    inputGroup: {
        marginBottom: 22,
    },
    label: {
        display: 'flex',
        marginBottom: 8,
        fontWeight: '500',
        color: '#ffffff',
        fontSize: 14,
    },
    input: {
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 16,
        paddingRight: 45,
        borderWidth: 1,
        borderColor: '#9bcb77',
        borderRadius: 25,
        fontSize: 16,
        backgroundColor: '#f9fbf7',
    },
    icon: {
        position: 'absolute',
        right: 16,
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
    },
    passwordRequirements: {
        marginTop: 5,
        fontSize: 13,
        color: '#ffffff',
    },
    btn: {
        width: '100%',
        padding: 16,
        borderRadius: 25,
        backgroundColor: '#4caf50',
        alignItems: 'center',
        shadowColor: '#4caf50',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    dividerText: {
        color: 'white',
        marginHorizontal: 10,
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
    signinLink: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
        alignItems: 'center',
    },
    link: {
        color: '#4caf50',
        fontWeight: '600',
    }
});