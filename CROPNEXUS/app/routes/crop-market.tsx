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
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { LineChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import cropMarketService, { CropMarketData, CropPrice } from '../services/cropMarketService';

const screenWidth = Dimensions.get('window').width;

export default function CropMarket() {
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [marketData, setMarketData] = useState<CropMarketData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [availableCrops, setAvailableCrops] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'price' | 'gainers' | 'losers'>('price');

  useEffect(() => {
    loadAvailableCrops();
    loadMarketData(selectedCrop);
  }, []);

  useEffect(() => {
    if (selectedCrop) {
      loadMarketData(selectedCrop);
    }
  }, [selectedCrop]);

  const loadAvailableCrops = async () => {
    try {
      const crops = await cropMarketService.getAllCrops();
      setAvailableCrops(crops);
    } catch (error) {
      console.error('Error loading crops:', error);
    }
  };

  const loadMarketData = async (cropName: string) => {
    setIsLoading(true);
    try {
      const data = await cropMarketService.getCropPrice(cropName);
      setMarketData(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load market data');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadReport = async () => {
    if (!marketData) return;

    try {
      const report = await cropMarketService.generateMarketReport(marketData);
      
      await Share.share({
        message: report,
        title: `${marketData.crop} Market Report`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to generate report');
    }
  };

  const renderCropSelector = () => (
    <View style={styles.selectorContainer}>
      <Text style={styles.selectorLabel}>Select Crop:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCrop}
          onValueChange={(itemValue) => setSelectedCrop(itemValue)}
          style={styles.picker}
        >
          {availableCrops.map((crop) => (
            <Picker.Item key={crop} label={crop} value={crop} />
          ))}
        </Picker>
      </View>
    </View>
  );

  const renderTabButtons = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'price' && styles.activeTab]}
        onPress={() => setActiveTab('price')}
      >
        <Text style={[styles.tabText, activeTab === 'price' && styles.activeTabText]}>
          Price Chart
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'gainers' && styles.activeTab]}
        onPress={() => setActiveTab('gainers')}
      >
        <Text style={[styles.tabText, activeTab === 'gainers' && styles.activeTabText]}>
          Top Gainers
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'losers' && styles.activeTab]}
        onPress={() => setActiveTab('losers')}
      >
        <Text style={[styles.tabText, activeTab === 'losers' && styles.activeTabText]}>
          Top Losers
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderPriceChart = () => {
    if (!marketData) return null;

    const chartData = {
      labels: marketData.priceHistory.slice(-7).map(item => {
        const date = new Date(item.date);
        return `${date.getDate()}/${date.getMonth() + 1}`;
      }),
      datasets: [
        {
          data: marketData.priceHistory.slice(-7).map(item => item.price),
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          strokeWidth: 3,
        },
      ],
    };

    return (
      <View style={styles.chartContainer}>
        <View style={styles.priceHeader}>
          <Text style={styles.cropName}>{marketData.crop}</Text>
          <Text style={styles.currentPrice}>₹{marketData.currentPrice}/quintal</Text>
        </View>

        <LineChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#4CAF50',
            },
          }}
          bezier
          style={styles.chart}
        />

        <View style={styles.forecastContainer}>
          <Text style={styles.forecastTitle}>7-Day Forecast</Text>
          {marketData.forecast.slice(0, 3).map((item, index) => (
            <View key={index} style={styles.forecastItem}>
              <Text style={styles.forecastDate}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
              <Text style={styles.forecastPrice}>₹{item.price}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderTopGainers = () => {
    if (!marketData) return null;

    return (
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Top Gainers Today</Text>
        {marketData.topGainers.map((crop, index) => (
          <View key={index} style={styles.cropItem}>
            <View style={styles.cropInfo}>
              <Text style={styles.cropItemName}>{crop.crop}</Text>
              <Text style={styles.cropMarket}>{crop.market}</Text>
            </View>
            <View style={styles.priceInfo}>
              <Text style={styles.cropPrice}>{crop.unit.replace('₹', '₹')}{crop.currentPrice}</Text>
              <View style={styles.changeContainer}>
                <Ionicons name="trending-up" size={16} color="#4CAF50" />
                <Text style={styles.gainText}>+{crop.changePercent}%</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderTopLosers = () => {
    if (!marketData) return null;

    return (
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Top Losers Today</Text>
        {marketData.topLosers.map((crop, index) => (
          <View key={index} style={styles.cropItem}>
            <View style={styles.cropInfo}>
              <Text style={styles.cropItemName}>{crop.crop}</Text>
              <Text style={styles.cropMarket}>{crop.market}</Text>
            </View>
            <View style={styles.priceInfo}>
              <Text style={styles.cropPrice}>{crop.unit.replace('₹', '₹')}{crop.currentPrice}</Text>
              <View style={styles.changeContainer}>
                <Ionicons name="trending-down" size={16} color="#f44336" />
                <Text style={styles.lossText}>{crop.changePercent}%</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading market data...</Text>
        </View>
      );
    }

    switch (activeTab) {
      case 'price':
        return renderPriceChart();
      case 'gainers':
        return renderTopGainers();
      case 'losers':
        return renderTopLosers();
      default:
        return renderPriceChart();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live Market</Text>
        <TouchableOpacity onPress={downloadReport} style={styles.reportButton}>
          <Ionicons name="download" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderCropSelector()}
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
  selectorContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectorLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  picker: {
    height: 50,
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
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  priceHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cropName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  currentPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 8,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  forecastContainer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  forecastTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  forecastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  forecastDate: {
    fontSize: 14,
    color: '#666',
  },
  forecastPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
  listContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  cropItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cropInfo: {
    flex: 1,
  },
  cropItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cropMarket: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  cropPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  gainText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
    marginLeft: 4,
  },
  lossText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#f44336',
    marginLeft: 4,
  },
});
