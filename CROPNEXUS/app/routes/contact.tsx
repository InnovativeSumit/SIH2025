import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
  Linking,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!isValidEmail(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Message Sent!',
        'Thank you for contacting us. We will get back to you within 24 hours.',
        [
          {
            text: 'OK',
            onPress: () => {
              setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
              });
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const openPhone = () => {
    Linking.openURL('tel:+911234567890');
  };

  const openEmail = () => {
    Linking.openURL('mailto:support@cropnexus.com');
  };

  const openWebsite = () => {
    Linking.openURL('https://cropnexus.com');
  };

  const openLocation = () => {
    Linking.openURL('https://maps.google.com/?q=CropNexus+Headquarters');
  };

  const renderContactInfo = () => (
    <View style={styles.contactInfoSection}>
      <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.contactInfoCard}>
        <Text style={styles.contactInfoTitle}>Get In Touch</Text>
        <Text style={styles.contactInfoSubtitle}>
          We're here to help you with any questions or support you need
        </Text>

        <View style={styles.contactMethods}>
          <TouchableOpacity style={styles.contactMethod} onPress={openPhone}>
            <View style={styles.contactMethodIcon}>
              <Ionicons name="call" size={24} color="#4CAF50" />
            </View>
            <View style={styles.contactMethodContent}>
              <Text style={styles.contactMethodTitle}>Phone</Text>
              <Text style={styles.contactMethodText}>+91 123 456 7890</Text>
              <Text style={styles.contactMethodSubtext}>Mon-Fri 9AM-6PM</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactMethod} onPress={openEmail}>
            <View style={styles.contactMethodIcon}>
              <Ionicons name="mail" size={24} color="#4CAF50" />
            </View>
            <View style={styles.contactMethodContent}>
              <Text style={styles.contactMethodTitle}>Email</Text>
              <Text style={styles.contactMethodText}>support@cropnexus.com</Text>
              <Text style={styles.contactMethodSubtext}>We'll respond within 24 hours</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactMethod} onPress={openWebsite}>
            <View style={styles.contactMethodIcon}>
              <Ionicons name="globe" size={24} color="#4CAF50" />
            </View>
            <View style={styles.contactMethodContent}>
              <Text style={styles.contactMethodTitle}>Website</Text>
              <Text style={styles.contactMethodText}>www.cropnexus.com</Text>
              <Text style={styles.contactMethodSubtext}>Visit our online portal</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactMethod} onPress={openLocation}>
            <View style={styles.contactMethodIcon}>
              <Ionicons name="location" size={24} color="#4CAF50" />
            </View>
            <View style={styles.contactMethodContent}>
              <Text style={styles.contactMethodTitle}>Address</Text>
              <Text style={styles.contactMethodText}>123 Agriculture Hub</Text>
              <Text style={styles.contactMethodSubtext}>New Delhi, India 110001</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );

  const renderContactForm = () => (
    <View style={styles.formSection}>
      <Text style={styles.formTitle}>Send us a Message</Text>
      <Text style={styles.formSubtitle}>
        Fill out the form below and we'll get back to you as soon as possible
      </Text>

      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Name *</Text>
          <TextInput
            style={styles.formInput}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Enter your full name"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Email *</Text>
          <TextInput
            style={styles.formInput}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            placeholder="Enter your email address"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Phone Number</Text>
          <TextInput
            style={styles.formInput}
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            placeholder="Enter your phone number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Subject</Text>
          <TextInput
            style={styles.formInput}
            value={formData.subject}
            onChangeText={(text) => setFormData({ ...formData, subject: text })}
            placeholder="What is this regarding?"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Message *</Text>
          <TextInput
            style={[styles.formInput, styles.textArea]}
            value={formData.message}
            onChangeText={(text) => setFormData({ ...formData, message: text })}
            placeholder="Tell us how we can help you..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Text style={styles.submitButtonText}>Sending...</Text>
          ) : (
            <>
              <Ionicons name="send" size={20} color="white" />
              <Text style={styles.submitButtonText}>Send Message</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFAQ = () => (
    <View style={styles.faqSection}>
      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
      
      <View style={styles.faqList}>
        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>How accurate is the plant disease detection?</Text>
          <Text style={styles.faqAnswer}>
            Our AI model has been trained on thousands of plant images and achieves over 95% accuracy 
            in detecting common crop diseases. However, we always recommend consulting with agricultural 
            experts for critical decisions.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>Is the app free to use?</Text>
          <Text style={styles.faqAnswer}>
            Yes, CropNexus is completely free for farmers. We believe in making agricultural technology 
            accessible to everyone, regardless of their economic situation.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>Which languages are supported?</Text>
          <Text style={styles.faqAnswer}>
            Currently, CropNexus supports English, Hindi, and Bengali. We're working on adding more 
            regional languages to serve farmers across different regions.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>How often is market data updated?</Text>
          <Text style={styles.faqAnswer}>
            Market prices are updated in real-time throughout trading hours. Weather data is refreshed 
            every hour to provide you with the most current information.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>Can I use the app offline?</Text>
          <Text style={styles.faqAnswer}>
            Some features like the crop calendar work offline, but real-time features like market prices 
            and weather updates require an internet connection.
          </Text>
        </View>
      </View>
    </View>
  );

  const renderSupportHours = () => (
    <View style={styles.supportSection}>
      <Text style={styles.sectionTitle}>Support Hours</Text>
      <View style={styles.supportHours}>
        <View style={styles.supportHourItem}>
          <Text style={styles.supportDay}>Monday - Friday</Text>
          <Text style={styles.supportTime}>9:00 AM - 6:00 PM</Text>
        </View>
        <View style={styles.supportHourItem}>
          <Text style={styles.supportDay}>Saturday</Text>
          <Text style={styles.supportTime}>10:00 AM - 4:00 PM</Text>
        </View>
        <View style={styles.supportHourItem}>
          <Text style={styles.supportDay}>Sunday</Text>
          <Text style={styles.supportTime}>Closed</Text>
        </View>
      </View>
      <Text style={styles.supportNote}>
        For urgent issues outside business hours, please send an email and we'll respond as soon as possible.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Us</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {renderContactInfo()}
          {renderContactForm()}
          {renderFAQ()}
          {renderSupportHours()}
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
  },
  placeholder: {
    width: 40,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contactInfoSection: {
    margin: 16,
  },
  contactInfoCard: {
    borderRadius: 16,
    padding: 24,
  },
  contactInfoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  contactInfoSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 24,
    lineHeight: 22,
  },
  contactMethods: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  contactMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contactMethodIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactMethodContent: {
    flex: 1,
  },
  contactMethodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  contactMethodText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
    marginBottom: 2,
  },
  contactMethodSubtext: {
    fontSize: 12,
    color: '#666',
  },
  formSection: {
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
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    lineHeight: 20,
  },
  form: {
    width: '100%',
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  faqSection: {
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
    marginBottom: 16,
  },
  faqList: {
    marginTop: 8,
  },
  faqItem: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  supportSection: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 32,
  },
  supportHours: {
    marginTop: 8,
  },
  supportHourItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  supportDay: {
    fontSize: 16,
    color: '#333',
  },
  supportTime: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
  },
  supportNote: {
    fontSize: 14,
    color: '#666',
    marginTop: 16,
    fontStyle: 'italic',
    lineHeight: 20,
  },
});
