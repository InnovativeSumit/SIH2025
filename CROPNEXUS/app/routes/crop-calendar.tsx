import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Share,
  SafeAreaView,
  Modal,
  TextInput,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import cropCalendarService, { CropEvent, CropCalendarData } from '../services/cropCalendarService';

export default function CropCalendar() {
  const [calendarData, setCalendarData] = useState<CropCalendarData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'overdue'>('upcoming');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CropEvent | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: '08:00',
    type: 'general' as CropEvent['type'],
    crop: '',
    priority: 'medium' as CropEvent['priority'],
    reminderEnabled: true,
    reminderTime: 10
  });

  useEffect(() => {
    loadCalendarData();
    initializeSampleData();
  }, []);

  const initializeSampleData = async () => {
    try {
      await cropCalendarService.initializeWithSampleData();
    } catch (error) {
      console.error('Error initializing sample data:', error);
    }
  };

  const loadCalendarData = async () => {
    setIsLoading(true);
    try {
      const data = await cropCalendarService.getCalendarData();
      setCalendarData(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load calendar data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEvent = async () => {
    if (!formData.title.trim()) {
      Alert.alert('Error', 'Please enter a title for the event');
      return;
    }

    try {
      if (editingEvent) {
        await cropCalendarService.updateEvent(editingEvent.id, formData);
      } else {
        await cropCalendarService.addEvent({ ...formData, completed: false });
      }
      
      await loadCalendarData();
      resetForm();
      setShowAddModal(false);
      setEditingEvent(null);
    } catch (error) {
      Alert.alert('Error', 'Failed to save event');
    }
  };

  const handleEditEvent = (event: CropEvent) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      type: event.type,
      crop: event.crop || '',
      priority: event.priority,
      reminderEnabled: event.reminderEnabled,
      reminderTime: event.reminderTime
    });
    setEditingEvent(event);
    setShowAddModal(true);
  };

  const handleDeleteEvent = (event: CropEvent) => {
    Alert.alert(
      'Delete Event',
      `Are you sure you want to delete "${event.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await cropCalendarService.deleteEvent(event.id);
              await loadCalendarData();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete event');
            }
          }
        }
      ]
    );
  };

  const handleCompleteEvent = async (event: CropEvent) => {
    try {
      await cropCalendarService.markEventCompleted(event.id);
      await loadCalendarData();
    } catch (error) {
      Alert.alert('Error', 'Failed to mark event as completed');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      time: '08:00',
      type: 'general',
      crop: '',
      priority: 'medium',
      reminderEnabled: true,
      reminderTime: 10
    });
  };

  const downloadReport = async () => {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 30);

      const report = await cropCalendarService.generateCalendarReport(
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0]
      );
      
      await Share.share({
        message: report,
        title: 'Crop Calendar Report',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to generate report');
    }
  };

  const renderTabButtons = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'upcoming' && styles.activeTab]}
        onPress={() => setActiveTab('upcoming')}
      >
        <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
          Upcoming ({calendarData?.upcomingEvents.length || 0})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'overdue' && styles.activeTab]}
        onPress={() => setActiveTab('overdue')}
      >
        <Text style={[styles.tabText, activeTab === 'overdue' && styles.activeTabText]}>
          Overdue ({calendarData?.overdueEvents.length || 0})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'completed' && styles.activeTab]}
        onPress={() => setActiveTab('completed')}
      >
        <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
          Completed ({calendarData?.completedEvents.length || 0})
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderEventItem = (event: CropEvent, showActions: boolean = true) => (
    <View key={event.id} style={styles.eventItem}>
      <View style={styles.eventHeader}>
        <View style={styles.eventTypeContainer}>
          <Ionicons 
            name={cropCalendarService.getEventTypeIcon(event.type) as any} 
            size={24} 
            color={cropCalendarService.getEventTypeColor(event.type)} 
          />
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventSubtitle}>
              {event.crop && `${event.crop} • `}{event.type}
            </Text>
          </View>
        </View>
        <View style={[styles.priorityBadge, { backgroundColor: cropCalendarService.getPriorityColor(event.priority) }]}>
          <Text style={styles.priorityText}>{event.priority.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.eventDetails}>
        <View style={styles.eventDateTime}>
          <Ionicons name="calendar" size={16} color="#666" />
          <Text style={styles.eventDateText}>
            {new Date(event.date).toLocaleDateString()}
          </Text>
          <Ionicons name="time" size={16} color="#666" style={{ marginLeft: 16 }} />
          <Text style={styles.eventTimeText}>{event.time}</Text>
        </View>
        
        {event.description && (
          <Text style={styles.eventDescription}>{event.description}</Text>
        )}

        {event.reminderEnabled && !event.completed && (
          <View style={styles.reminderInfo}>
            <Ionicons name="notifications" size={16} color="#4CAF50" />
            <Text style={styles.reminderText}>
              Reminder {event.reminderTime} minutes before
            </Text>
          </View>
        )}
      </View>

      {showActions && (
        <View style={styles.eventActions}>
          {!event.completed && (
            <TouchableOpacity 
              style={styles.completeButton}
              onPress={() => handleCompleteEvent(event)}
            >
              <Ionicons name="checkmark-circle" size={20} color="white" />
              <Text style={styles.completeButtonText}>Complete</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => handleEditEvent(event)}
          >
            <Ionicons name="pencil" size={16} color="#4CAF50" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => handleDeleteEvent(event)}
          >
            <Ionicons name="trash" size={16} color="#f44336" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderEventsList = () => {
    if (!calendarData) return null;

    let events: CropEvent[] = [];
    let emptyMessage = '';

    switch (activeTab) {
      case 'upcoming':
        events = calendarData.upcomingEvents;
        emptyMessage = 'No upcoming events';
        break;
      case 'overdue':
        events = calendarData.overdueEvents;
        emptyMessage = 'No overdue events';
        break;
      case 'completed':
        events = calendarData.completedEvents;
        emptyMessage = 'No completed events';
        break;
    }

    if (events.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar" size={64} color="#ccc" />
          <Text style={styles.emptyText}>{emptyMessage}</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.eventsList} showsVerticalScrollIndicator={false}>
        {events.map(event => renderEventItem(event, activeTab !== 'completed'))}
      </ScrollView>
    );
  };

  const renderAddEventModal = () => (
    <Modal visible={showAddModal} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => {
            setShowAddModal(false);
            setEditingEvent(null);
            resetForm();
          }}>
            <Text style={styles.modalCancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>
            {editingEvent ? 'Edit Event' : 'Add Event'}
          </Text>
          <TouchableOpacity onPress={handleAddEvent}>
            <Text style={styles.modalSaveText}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Title *</Text>
            <TextInput
              style={styles.formInput}
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
              placeholder="Enter event title"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Description</Text>
            <TextInput
              style={[styles.formInput, styles.textArea]}
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              placeholder="Enter event description"
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.formRow}>
            <View style={styles.formGroupHalf}>
              <Text style={styles.formLabel}>Date</Text>
              <TextInput
                style={styles.formInput}
                value={formData.date}
                onChangeText={(text) => setFormData({ ...formData, date: text })}
                placeholder="YYYY-MM-DD"
              />
            </View>
            <View style={styles.formGroupHalf}>
              <Text style={styles.formLabel}>Time</Text>
              <TextInput
                style={styles.formInput}
                value={formData.time}
                onChangeText={(text) => setFormData({ ...formData, time: text })}
                placeholder="HH:MM"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
                style={styles.picker}
              >
                <Picker.Item label="General" value="general" />
                <Picker.Item label="Planting" value="planting" />
                <Picker.Item label="Watering" value="watering" />
                <Picker.Item label="Fertilizing" value="fertilizing" />
                <Picker.Item label="Harvesting" value="harvesting" />
                <Picker.Item label="Spraying" value="spraying" />
                <Picker.Item label="Weeding" value="weeding" />
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Crop (Optional)</Text>
            <TextInput
              style={styles.formInput}
              value={formData.crop}
              onChangeText={(text) => setFormData({ ...formData, crop: text })}
              placeholder="Enter crop name"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Priority</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
                style={styles.picker}
              >
                <Picker.Item label="Low" value="low" />
                <Picker.Item label="Medium" value="medium" />
                <Picker.Item label="High" value="high" />
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <View style={styles.switchContainer}>
              <Text style={styles.formLabel}>Enable Reminder</Text>
              <Switch
                value={formData.reminderEnabled}
                onValueChange={(value) => setFormData({ ...formData, reminderEnabled: value })}
                trackColor={{ false: '#ccc', true: '#4CAF50' }}
                thumbColor={formData.reminderEnabled ? '#2E7D32' : '#f4f3f4'}
              />
            </View>
          </View>

          {formData.reminderEnabled && (
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Reminder Time (minutes before)</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.reminderTime}
                  onValueChange={(value) => setFormData({ ...formData, reminderTime: value })}
                  style={styles.picker}
                >
                  <Picker.Item label="5 minutes" value={5} />
                  <Picker.Item label="10 minutes" value={10} />
                  <Picker.Item label="15 minutes" value={15} />
                  <Picker.Item label="30 minutes" value={30} />
                  <Picker.Item label="1 hour" value={60} />
                  <Picker.Item label="2 hours" value={120} />
                </Picker>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading calendar...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Crop Calendar</Text>
        <TouchableOpacity onPress={downloadReport} style={styles.reportButton}>
          <Ionicons name="download" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {renderTabButtons()}
        {renderEventsList()}
      </View>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setShowAddModal(true)}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      {renderAddEventModal()}
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
  reportButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#2c802fff',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  activeTabText: {
    color: 'white',
  },
  eventsList: {
    flex: 1,
  },
  eventItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  eventTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  eventInfo: {
    marginLeft: 12,
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  eventSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  eventDetails: {
    marginBottom: 12,
  },
  eventDateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventDateText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  eventTimeText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  reminderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderText: {
    fontSize: 12,
    color: '#4CAF50',
    marginLeft: 8,
  },
  eventActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: '#0f5111ff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  editButton: {
    padding: 8,
    marginRight: 4,
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#07780aff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalCancelText: {
    fontSize: 16,
    color: '#666',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalSaveText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  formGroupHalf: {
    flex: 1,
    marginRight: 8,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  picker: {
    height: 50,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
