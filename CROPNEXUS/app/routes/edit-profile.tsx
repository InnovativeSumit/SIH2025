import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
  Image,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import authService from '../services/authService';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  farmName: string;
  farmSize: string;
  farmLocation: string;
  primaryCrops: string;
  experience: string;
  language: 'en' | 'hi' | 'bn';
  notifications: {
    weather: boolean;
    market: boolean;
    calendar: boolean;
    general: boolean;
  };
  avatar?: string;
}

export default function EditProfile() {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Sumit Pal',
    email: 'palsumit6002@gmail.com',
    phone: '+91 9062589637',
    farmName: 'Sumit Farm',
    farmSize: '10 acres',
    farmLocation: 'Jharkhand, India',
    primaryCrops: 'Wheat, Rice, Corn',
    experience: '5-10 years',
    language: 'en',
    notifications: {
      weather: true,
      market: true,
      calendar: true,
      general: false,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      // In a real app, this would load from the auth service
      // For now, we'll use the default profile
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleSave = async () => {
    if (!profile.name.trim() || !profile.email.trim()) {
      Alert.alert('Error', 'Name and email are required fields');
      return;
    }

    if (!isValidEmail(profile.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        'Profile Updated',
        'Your profile has been successfully updated.',
        [
          {
            text: 'OK',
            onPress: () => {
              setHasChanges(false);
              router.back();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      Alert.alert(
        'Discard Changes',
        'You have unsaved changes. Are you sure you want to go back?',
        [
          { text: 'Stay', style: 'cancel' },
          { text: 'Discard', style: 'destructive', onPress: () => router.back() }
        ]
      );
    } else {
      router.back();
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const updateProfile = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const updateNotificationSetting = (setting: keyof UserProfile['notifications'], value: boolean) => {
    setProfile(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [setting]: value
      }
    }));
    setHasChanges(true);
  };

  const renderPersonalInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Personal Information</Text>
      
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </Text>
        </View>
        <TouchableOpacity style={styles.changeAvatarButton}>
          <Ionicons name="camera" size={20} color="#4CAF50" />
          <Text style={styles.changeAvatarText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Full Name *</Text>
        <TextInput
          style={styles.formInput}
          value={profile.name}
          onChangeText={(text) => updateProfile('name', text)}
          placeholder="Enter your full name"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Email Address *</Text>
        <TextInput
          style={styles.formInput}
          value={profile.email}
          onChangeText={(text) => updateProfile('email', text)}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Phone Number</Text>
        <TextInput
          style={styles.formInput}
          value={profile.phone}
          onChangeText={(text) => updateProfile('phone', text)}
          placeholder="Enter your phone number"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Language</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={profile.language}
            onValueChange={(value) => updateProfile('language', value)}
            style={styles.picker}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="हिंदी (Hindi)" value="hi" />
            <Picker.Item label="বাংলা (Bengali)" value="bn" />
          </Picker>
        </View>
      </View>
    </View>
  );

  const renderFarmInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Farm Information</Text>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Farm Name</Text>
        <TextInput
          style={styles.formInput}
          value={profile.farmName}
          onChangeText={(text) => updateProfile('farmName', text)}
          placeholder="Enter your farm name"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Farm Size</Text>
        <TextInput
          style={styles.formInput}
          value={profile.farmSize}
          onChangeText={(text) => updateProfile('farmSize', text)}
          placeholder="e.g., 10 acres, 5 hectares"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Farm Location</Text>
        <TextInput
          style={styles.formInput}
          value={profile.farmLocation}
          onChangeText={(text) => updateProfile('farmLocation', text)}
          placeholder="City, State, Country"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Primary Crops</Text>
        <TextInput
          style={styles.formInput}
          value={profile.primaryCrops}
          onChangeText={(text) => updateProfile('primaryCrops', text)}
          placeholder="e.g., Wheat, Rice, Corn"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Farming Experience</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={profile.experience}
            onValueChange={(value) => updateProfile('experience', value)}
            style={styles.picker}
          >
            <Picker.Item label="Less than 1 year" value="<1 year" />
            <Picker.Item label="1-2 years" value="1-2 years" />
            <Picker.Item label="3-5 years" value="3-5 years" />
            <Picker.Item label="5-10 years" value="5-10 years" />
            <Picker.Item label="10-20 years" value="10-20 years" />
            <Picker.Item label="More than 20 years" value=">20 years" />
          </Picker>
        </View>
      </View>
    </View>
  );

  const renderNotificationSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Notification Preferences</Text>
      <Text style={styles.sectionSubtitle}>
        Choose which notifications you'd like to receive
      </Text>

      <View style={styles.notificationItem}>
        <View style={styles.notificationInfo}>
          <Ionicons name="partly-sunny" size={24} color="#4CAF50" />
          <View style={styles.notificationText}>
            <Text style={styles.notificationTitle}>Weather Alerts</Text>
            <Text style={styles.notificationDescription}>
              Receive notifications about weather changes and warnings
            </Text>
          </View>
        </View>
        <Switch
          value={profile.notifications.weather}
          onValueChange={(value) => updateNotificationSetting('weather', value)}
          trackColor={{ false: '#ccc', true: '#4CAF50' }}
          thumbColor={profile.notifications.weather ? '#2E7D32' : '#f4f3f4'}
        />
      </View>

      <View style={styles.notificationItem}>
        <View style={styles.notificationInfo}>
          <Ionicons name="trending-up" size={24} color="#4CAF50" />
          <View style={styles.notificationText}>
            <Text style={styles.notificationTitle}>Market Updates</Text>
            <Text style={styles.notificationDescription}>
              Get notified about significant price changes in crop markets
            </Text>
          </View>
        </View>
        <Switch
          value={profile.notifications.market}
          onValueChange={(value) => updateNotificationSetting('market', value)}
          trackColor={{ false: '#ccc', true: '#4CAF50' }}
          thumbColor={profile.notifications.market ? '#2E7D32' : '#f4f3f4'}
        />
      </View>

      <View style={styles.notificationItem}>
        <View style={styles.notificationInfo}>
          <Ionicons name="calendar" size={24} color="#4CAF50" />
          <View style={styles.notificationText}>
            <Text style={styles.notificationTitle}>Calendar Reminders</Text>
            <Text style={styles.notificationDescription}>
              Receive reminders for your scheduled farming activities
            </Text>
          </View>
        </View>
        <Switch
          value={profile.notifications.calendar}
          onValueChange={(value) => updateNotificationSetting('calendar', value)}
          trackColor={{ false: '#ccc', true: '#4CAF50' }}
          thumbColor={profile.notifications.calendar ? '#2E7D32' : '#f4f3f4'}
        />
      </View>

      <View style={styles.notificationItem}>
        <View style={styles.notificationInfo}>
          <Ionicons name="information-circle" size={24} color="#4CAF50" />
          <View style={styles.notificationText}>
            <Text style={styles.notificationTitle}>General Updates</Text>
            <Text style={styles.notificationDescription}>
              App updates, tips, and general farming information
            </Text>
          </View>
        </View>
        <Switch
          value={profile.notifications.general}
          onValueChange={(value) => updateNotificationSetting('general', value)}
          trackColor={{ false: '#ccc', true: '#4CAF50' }}
          thumbColor={profile.notifications.general ? '#2E7D32' : '#f4f3f4'}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity 
          onPress={handleSave} 
          style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
          disabled={isLoading}
        >
          <Text style={styles.saveButtonText}>
            {isLoading ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {renderPersonalInfo()}
          {renderFarmInfo()}
          {renderNotificationSettings()}
          
          <View style={styles.bottomPadding} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 40,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  changeAvatarButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeAvatarText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  pickerContainer: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  picker: {
    height: 50,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  notificationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  notificationText: {
    marginLeft: 16,
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  bottomPadding: {
    height: 32,
  },
});
