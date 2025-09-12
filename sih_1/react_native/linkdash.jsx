import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const EditProfileScreen = ({ navigation }) => {
  const [profileData, setProfileData] = useState({
    fullName: 'Alex Johnson',
    userName: 'alexj',
    email: 'alex.johnson@example.com',
    language: 'english',
    mobile: '+1 (555) 123-4567'
  });
  
  const [profileImage, setProfileImage] = useState(
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80'
  );

  const changePhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permission required', 'Permission to access camera roll is required!');
        return;
      }
      
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      
      if (!pickerResult.canceled) {
        setProfileImage(pickerResult.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const removePhoto = () => {
    Alert.alert(
      'Remove Photo',
      'Are you sure you want to remove your profile photo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setProfileImage('https://via.placeholder.com/100')
        }
      ]
    );
  };

  const handleSave = () => {
    const { fullName, userName, email, mobile } = profileData;
    
    if (!fullName || !userName || !email || !mobile) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    Alert.alert('Success', 'Profile updated successfully!');
    // navigation.navigate('Dashboard'); // Uncomment if you have navigation set up
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={['#4ed960', '#06591c']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.headerTitle}>
            <FontAwesome5 name="user-edit" size={24} color="white" /> Edit Profile
          </Text>
          <Text style={styles.headerSubtitle}>Update your personal information and preferences</Text>
        </LinearGradient>
        
        <View style={styles.profileSection}>
          <View style={styles.sectionTitle}>
            <FontAwesome5 name="camera" size={18} color="#135618" />
            <Text style={styles.sectionTitleText}>Profile Photo</Text>
          </View>
          
          <View style={styles.profilePhotoContainer}>
            <Image 
              source={{ uri: profileImage }} 
              style={styles.profileImage}
            />
            <View style={styles.profilePhotoActions}>
              <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={changePhoto}>
                <FontAwesome5 name="upload" size={16} color="white" />
                <Text style={styles.btnPrimaryText}>Change Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnOutline]} onPress={removePhoto}>
                <FontAwesome5 name="trash" size={16} color="#777" />
                <Text style={styles.btnOutlineText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.sectionTitle}>
            <FontAwesome5 name="pencil-alt" size={18} color="#135618" />
            <Text style={styles.sectionTitleText}>Personal Information</Text>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={profileData.fullName}
              onChangeText={(text) => setProfileData({...profileData, fullName: text})}
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={profileData.userName}
              onChangeText={(text) => setProfileData({...profileData, userName: text})}
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={profileData.email}
              onChangeText={(text) => setProfileData({...profileData, email: text})}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Preferred Language</Text>
            <View style={styles.languageOptions}>
              <TouchableOpacity 
                style={styles.languageOption} 
                onPress={() => setProfileData({...profileData, language: 'english'})}
              >
                <View style={styles.radioContainer}>
                  <View style={[
                    styles.radioOuter,
                    profileData.language === 'english' && styles.radioOuterSelected
                  ]}>
                    {profileData.language === 'english' && <View style={styles.radioInner} />}
                  </View>
                </View>
                <Text style={styles.languageText}>English</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.languageOption} 
                onPress={() => setProfileData({...profileData, language: 'hindi'})}
              >
                <View style={styles.radioContainer}>
                  <View style={[
                    styles.radioOuter,
                    profileData.language === 'hindi' && styles.radioOuterSelected
                  ]}>
                    {profileData.language === 'hindi' && <View style={styles.radioInner} />}
                  </View>
                </View>
                <Text style={styles.languageText}>Hindi</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.languageOption} 
                onPress={() => setProfileData({...profileData, language: 'bengali'})}
              >
                <View style={styles.radioContainer}>
                  <View style={[
                    styles.radioOuter,
                    profileData.language === 'bengali' && styles.radioOuterSelected
                  ]}>
                    {profileData.language === 'bengali' && <View style={styles.radioInner} />}
                  </View>
                </View>
                <Text style={styles.languageText}>Bengali</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              value={profileData.mobile}
              onChangeText={(text) => setProfileData({...profileData, mobile: text})}
              keyboardType="phone-pad"
            />
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.btnCancel} onPress={() => navigation.goBack()}>
              <Text style={styles.btnCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
              <Text style={styles.btnSaveText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: 25,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: 'white',
    opacity: 0.9,
  },
  profileSection: {
    padding: 30,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 18,
    color: '#135618',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#f0f4ff',
  },
  sectionTitleText: {
    fontSize: 18,
    color: '#135618',
    marginLeft: 10,
    fontWeight: '500',
  },
  profilePhotoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#e6e9ff',
  },
  profilePhotoActions: {
    marginLeft: 20,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  btnPrimary: {
    backgroundColor: '#04ad3f',
  },
  btnPrimaryText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 8,
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  btnOutlineText: {
    color: '#777',
    marginLeft: 8,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontWeight: '500',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 16,
  },
  languageOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 10,
  },
  radioContainer: {
    marginRight: 8,
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#289806',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#289806',
  },
  languageText: {
    color: '#555',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  btnCancel: {
    backgroundColor: '#f5f7fa',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 15,
  },
  btnCancelText: {
    color: '#777',
    fontSize: 16,
  },
  btnSave: {
    backgroundColor: '#0a7621',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: '#6e8efb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  btnSaveText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EditProfileScreen;