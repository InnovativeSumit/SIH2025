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
  RefreshControl,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import weatherService, { WeatherData, WeatherAlert } from '../services/weatherService';

export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherAlerts, setWeatherAlerts] = useState<WeatherAlert[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState<'current' | 'forecast' | 'alerts'>('current');

  useEffect(() => {
    loadWeatherData();
    loadWeatherAlerts();
  }, []);

  const loadWeatherData = async () => {
    setIsLoading(true);
    try {
      const data = await weatherService.getForecast();
      setWeatherData(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load weather data');
    } finally {
      setIsLoading(false);
    }
  };

  const loadWeatherAlerts = async () => {
    try {
      const alerts = await weatherService.getWeatherAlerts();
      setWeatherAlerts(alerts);
    } catch (error) {
      console.error('Error loading weather alerts:', error);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await loadWeatherData();
    await loadWeatherAlerts();
    setIsRefreshing(false);
  };

  const downloadWeatherReport = async () => {
    if (!weatherData) return;

    try {
      const report = await weatherService.generateWeatherReport(weatherData);
      
      await Share.share({
        message: report,
        title: 'Weather Report',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to generate weather report');
    }
  };

  const toggleWeatherAlerts = async (enabled: boolean) => {
    setAlertsEnabled(enabled);
    
    if (enabled) {
      // Schedule alerts for active weather warnings
      for (const alert of weatherAlerts.filter(a => a.isActive)) {
        await weatherService.scheduleWeatherAlert(alert);
      }
      Alert.alert('Alerts Enabled', 'You will receive weather alerts and warnings.');
    } else {
      Alert.alert('Alerts Disabled', 'Weather alerts have been turned off.');
    }
  };

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return 'sunny';
    } else if (conditionLower.includes('cloud')) {
      return 'partly-sunny';
    } else if (conditionLower.includes('rain')) {
      return 'rainy';
    } else if (conditionLower.includes('storm')) {
      return 'thunderstorm';
    } else if (conditionLower.includes('snow')) {
      return 'snow';
    } else if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
      return 'cloudy';
    }
    return 'partly-sunny';
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'rain': return 'rainy';
      case 'storm': return 'thunderstorm';
      case 'heat': return 'sunny';
      case 'cold': return 'snow';
      case 'wind': return 'leaf';
      default: return 'warning';
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'low': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'high': return '#FF5722';
      case 'extreme': return '#F44336';
      default: return '#2196F3';
    }
  };

  const renderTabButtons = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'current' && styles.activeTab]}
        onPress={() => setActiveTab('current')}
      >
        <Text style={[styles.tabText, activeTab === 'current' && styles.activeTabText]}>
          Current
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'forecast' && styles.activeTab]}
        onPress={() => setActiveTab('forecast')}
      >
        <Text style={[styles.tabText, activeTab === 'forecast' && styles.activeTabText]}>
          Forecast
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'alerts' && styles.activeTab]}
        onPress={() => setActiveTab('alerts')}
      >
        <Text style={[styles.tabText, activeTab === 'alerts' && styles.activeTabText]}>
          Alerts
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderCurrentWeather = () => {
    if (!weatherData) return null;

    const { current, location } = weatherData;

    return (
      <View style={styles.currentWeatherContainer}>
        <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.currentWeatherCard}>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color="white" />
            <Text style={styles.locationText}>
              {location.name}, {location.region}
            </Text>
          </View>

          <View style={styles.mainWeatherInfo}>
            <View style={styles.temperatureContainer}>
              <Ionicons 
                name={getWeatherIcon(current.condition.text)} 
                size={80} 
                color="white" 
              />
              <Text style={styles.temperature}>{current.temp_c}°</Text>
            </View>
            <Text style={styles.condition}>{current.condition.text}</Text>
            <Text style={styles.feelsLike}>Feels like {current.feelslike_c}°C</Text>
          </View>

          <View style={styles.weatherDetails}>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Ionicons name="water" size={20} color="white" />
                <Text style={styles.detailLabel}>Humidity</Text>
                <Text style={styles.detailValue}>{current.humidity}%</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="eye" size={20} color="white" />
                <Text style={styles.detailLabel}>Visibility</Text>
                <Text style={styles.detailValue}>{current.vis_km} km</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Ionicons name="speedometer" size={20} color="white" />
                <Text style={styles.detailLabel}>Pressure</Text>
                <Text style={styles.detailValue}>{current.pressure_mb} mb</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="leaf" size={20} color="white" />
                <Text style={styles.detailLabel}>Wind</Text>
                <Text style={styles.detailValue}>{current.wind_kph} km/h</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Ionicons name="sunny" size={20} color="white" />
                <Text style={styles.detailLabel}>UV Index</Text>
                <Text style={styles.detailValue}>{current.uv}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="rainy" size={20} color="white" />
                <Text style={styles.detailLabel}>Precipitation</Text>
                <Text style={styles.detailValue}>{current.precip_mm} mm</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  const renderForecast = () => {
    if (!weatherData) return null;

    return (
      <View style={styles.forecastContainer}>
        <Text style={styles.sectionTitle}>7-Day Forecast</Text>
        {weatherData.forecast.forecastday.map((day, index) => (
          <View key={index} style={styles.forecastItem}>
            <View style={styles.forecastDate}>
              <Text style={styles.forecastDayText}>
                {index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
              </Text>
              <Text style={styles.forecastDateText}>
                {new Date(day.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
              </Text>
            </View>
            
            <View style={styles.forecastWeather}>
              <Ionicons 
                name={getWeatherIcon(day.day.condition.text)} 
                size={32} 
                color="#4CAF50" 
              />
              <Text style={styles.forecastCondition}>{day.day.condition.text}</Text>
            </View>
            
            <View style={styles.forecastTemps}>
              <Text style={styles.forecastHigh}>{day.day.maxtemp_c}°</Text>
              <Text style={styles.forecastLow}>{day.day.mintemp_c}°</Text>
            </View>
            
            <View style={styles.forecastDetails}>
              <Text style={styles.forecastRain}>{day.day.totalprecip_mm}mm</Text>
              <Text style={styles.forecastHumidity}>{day.day.avghumidity}%</Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderAlerts = () => (
    <View style={styles.alertsContainer}>
      <View style={styles.alertsHeader}>
        <Text style={styles.sectionTitle}>Weather Alerts</Text>
        <View style={styles.alertToggle}>
          <Text style={styles.alertToggleText}>Enable Alerts</Text>
          <Switch
            value={alertsEnabled}
            onValueChange={toggleWeatherAlerts}
            trackColor={{ false: '#ccc', true: '#4CAF50' }}
            thumbColor={alertsEnabled ? '#2E7D32' : '#f4f3f4'}
          />
        </View>
      </View>

      {weatherAlerts.length === 0 ? (
        <View style={styles.noAlertsContainer}>
          <Ionicons name="checkmark-circle" size={48} color="#4CAF50" />
          <Text style={styles.noAlertsText}>No active weather alerts</Text>
          <Text style={styles.noAlertsSubtext}>Weather conditions are normal in your area</Text>
        </View>
      ) : (
        weatherAlerts.map((alert, index) => (
          <View key={index} style={[styles.alertItem, { borderLeftColor: getAlertColor(alert.severity) }]}>
            <View style={styles.alertHeader}>
              <Ionicons 
                name={getAlertIcon(alert.type)} 
                size={24} 
                color={getAlertColor(alert.severity)} 
              />
              <View style={styles.alertTitleContainer}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                <Text style={[styles.alertSeverity, { color: getAlertColor(alert.severity) }]}>
                  {alert.severity.toUpperCase()}
                </Text>
              </View>
            </View>
            <Text style={styles.alertDescription}>{alert.description}</Text>
            <View style={styles.alertTiming}>
              <Text style={styles.alertTime}>
                From: {new Date(alert.startTime).toLocaleString()}
              </Text>
              <Text style={styles.alertTime}>
                To: {new Date(alert.endTime).toLocaleString()}
              </Text>
            </View>
          </View>
        ))
      )}
    </View>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading weather data...</Text>
        </View>
      );
    }

    switch (activeTab) {
      case 'current':
        return renderCurrentWeather();
      case 'forecast':
        return renderForecast();
      case 'alerts':
        return renderAlerts();
      default:
        return renderCurrentWeather();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live Weather</Text>
        <TouchableOpacity onPress={downloadWeatherReport} style={styles.reportButton}>
          <Ionicons name="download" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        {renderTabButtons()}
        {renderContent()}
      </ScrollView>
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
    backgroundColor: '#4CAF50',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  currentWeatherContainer: {
    marginBottom: 20,
  },
  currentWeatherCard: {
    borderRadius: 16,
    padding: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  mainWeatherInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 72,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20,
  },
  condition: {
    fontSize: 24,
    color: 'white',
    marginBottom: 5,
  },
  feelsLike: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  weatherDetails: {
    width: '100%',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 5,
  },
  detailValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
  },
  forecastContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
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
  forecastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  forecastDate: {
    flex: 1,
  },
  forecastDayText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  forecastDateText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  forecastWeather: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  forecastCondition: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  forecastTemps: {
    flex: 1,
    alignItems: 'center',
  },
  forecastHigh: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  forecastLow: {
    fontSize: 14,
    color: '#666',
  },
  forecastDetails: {
    flex: 1,
    alignItems: 'flex-end',
  },
  forecastRain: {
    fontSize: 12,
    color: '#2196F3',
  },
  forecastHumidity: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  alertsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  alertsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  alertToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertToggleText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  noAlertsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noAlertsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
  },
  noAlertsSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  alertItem: {
    borderLeftWidth: 4,
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  alertSeverity: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
  },
  alertDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  alertTiming: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  alertTime: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
});
