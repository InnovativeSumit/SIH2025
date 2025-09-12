import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
  CheckBox,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CropNexusLanguageSelection = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const languages = [
    {
      id: 1,
      name: 'বাংলা (Bengali)',
      description: 'আপনার ভাষায় কৃষি',
    },
    {
      id: 2,
      name: 'English',
      description: 'Farming in your language',
    },
    {
      id: 3,
      name: 'हिंदी (Hindi)',
      description: 'आपकी भाषा में कृषि',
    },
  ];

  const handleLanguageSelect = (languageId) => {
    setSelectedLanguage(languageId);
  };

  const handleAccept = () => {
    if (!selectedLanguage) {
      Alert.alert('Error', 'Please select a language');
      return;
    }

    if (!acceptedTerms) {
      Alert.alert('Error', 'Please accept the terms and conditions');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert('Success', 'Language selected successfully!');
      // Navigate to the next screen (fet.html in the original)
      // navigation.navigate('Dashboard');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#e8f5e9', '#c8e6c9', '#a5d6a7']}
        style={styles.container}
      >
        <View style={styles.contentContainer}>
          <View style={styles.card}>
            {/* Header */}
            <LinearGradient
              colors={['#2e7d32', '#4caf50']}
              style={styles.header}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.logoContainer}>
                <View style={styles.logo}>
                  <Image
                    source={{ uri: 'https://i.ibb.co/ksJ9p602/Screenshot-2025-09-12-095804.png' }}
                    style={styles.logoImage}
                  />
                </View>
                <Text style={styles.appName}>HellO!</Text>
              </View>
            </LinearGradient>

            {/* Content */}
            <View style={styles.content}>
              <Text style={styles.title}>Select your language</Text>
              
              {languages.map((language, index) => (
                <View key={language.id}>
                  <TouchableOpacity
                    style={[
                      styles.languageCard,
                      selectedLanguage === language.id && styles.languageCardSelected,
                    ]}
                    onPress={() => handleLanguageSelect(language.id)}
                  >
                    <Text style={styles.languageName}>{language.name}</Text>
                    <Text style={styles.languageDesc}>{language.description}</Text>
                  </TouchableOpacity>
                  
                  {index < languages.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <View style={styles.termsContainer}>
                {Platform.OS === 'android' ? (
                  <CheckBox
                    value={acceptedTerms}
                    onValueChange={setAcceptedTerms}
                    tintColors={{ true: '#4caf50', false: '#388e3c' }}
                  />
                ) : (
                  <CheckBox
                    value={acceptedTerms}
                    onValueChange={setAcceptedTerms}
                    tintColors={{ true: '#4caf50', false: '#388e3c' }}
                  />
                )}
                <Text style={styles.termsText}>
                  I read and accept the terms of use and the privacy policy.
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.acceptButton, isProcessing && styles.acceptButtonDisabled]}
                onPress={handleAccept}
                disabled={isProcessing}
              >
                <LinearGradient
                  colors={['#4caf50', '#2e7d32']}
                  style={styles.acceptButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                >
                  <Text style={styles.acceptButtonText}>
                    {isProcessing ? 'Processing...' : 'Accept'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e8f5e9',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    maxWidth: 500,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
  },
  header: {
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  appName: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 1,
  },
  content: {
    padding: 30,
  },
  title: {
    textAlign: 'center',
    color: '#2e7d32',
    marginBottom: 25,
    fontSize: 22,
    fontWeight: '600',
  },
  languageCard: {
    backgroundColor: '#f1f8e9',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  languageCardSelected: {
    borderColor: '#4caf50',
  },
  languageName: {
    color: '#2e7d32',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 5,
  },
  languageDesc: {
    color: '#689f38',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#c8e6c9',
    marginVertical: 10,
  },
  footer: {
    padding: 25,
    backgroundColor: '#f1f8e9',
    alignItems: 'center',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  termsText: {
    color: '#388e3c',
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  acceptButton: {
    width: '100%',
    borderRadius: 50,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  acceptButtonGradient: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  acceptButtonDisabled: {
    opacity: 0.7,
  },
});

export default CropNexusLanguageSelection;