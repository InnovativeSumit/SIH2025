import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ProgressChart } from 'react-native-chart-kit';

interface AnalysisResult {
  soilType: string;
  nutrients: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    organicMatter: number;
  };
  issues: string[];
  recommendations: string[];
  healthScore: number;
  composition: {
    clay: number;
    sand: number;
    silt: number;
    moisture: number;
  };
}

const SoilImageAnalysisScreen: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  // Mock AI analysis function - Replace with actual API call
  const analyzeSoilImage = async (imageUri: string) => {
    setLoading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Replace this with your actual AI service API call
      const mockAnalysis = await simulateAIAnalysis(imageUri);

      clearInterval(progressInterval);
      setUploadProgress(100);

      setTimeout(() => {
        setAnalysisResult(mockAnalysis);
        setLoading(false);
      }, 500);
    } catch (error) {
      clearInterval(progressInterval);
      setLoading(false);
      Alert.alert('Analysis Error', 'Failed to analyze soil image');
    }
  };

  // Simulate AI analysis - Replace with real API
  const simulateAIAnalysis = (imageUri: string): Promise<AnalysisResult> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          soilType: 'Clay Loam',
          nutrients: {
            nitrogen: 65,
            phosphorus: 45,
            potassium: 70,
            organicMatter: 60,
          },
          issues: [
            'Low phosphorus levels detected',
            'Moderate nitrogen deficiency',
            'Good organic matter content',
          ],
          recommendations: [
            'Apply phosphorus-rich fertilizer (e.g., bone meal)',
            'Add nitrogen-fixing cover crops',
            'Maintain current organic matter practices',
            'Consider adding compost to improve soil structure',
          ],
          healthScore: 72,
          composition: {
            clay: 40,
            sand: 30,
            silt: 30,
            moisture: 65,
          },
        });
      }, 3000);
    });
  };

  // Real API integration example (using Google Cloud Vision or similar)
  const analyzeWithCloudAI = async (imageUri: string) => {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'soil.jpg',
    } as any);

    try {
      const response = await fetch('YOUR_AI_SERVICE_ENDPOINT', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer YOUR_API_KEY',
        },
      });

      return await response.json();
    } catch (error) {
      throw new Error('AI analysis failed');
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission required', 'Camera permission is required to take photos');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setAnalysisResult(null);
    }
  };

  const selectFromGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission required', 'Media library permission is required to select images');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setAnalysisResult(null);
    }
  };

  const analyzeImage = () => {
    if (!image) {
      Alert.alert('No Image', 'Please take or select a soil image first');
      return;
    }
    analyzeSoilImage(image);
  };

  const NutrientMeter: React.FC<{ label: string; value: number; color?: string }> = ({ label, value, color = '#4CAF50' }) => (
    <View style={styles.nutrientRow}>
      <Text style={styles.nutrientLabel}>{label}</Text>
      <View style={styles.nutrientBarContainer}>
        <View
          style={[
            styles.nutrientBar,
            { width: `${value}%`, backgroundColor: color },
          ]}
        />
        <Text style={styles.nutrientValue}>{value}%</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AI Soil Image Analysis</Text>

      {/* Image Selection Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Capture Soil Image</Text>
        <Text style={styles.instructions}>
          Take a clear photo of your soil sample against a neutral background
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
            <Text style={styles.buttonText}>📸 Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.galleryButton} onPress={selectFromGallery}>
            <Text style={styles.buttonText}>🖼️ Choose from Gallery</Text>
          </TouchableOpacity>
        </View>

        {image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity
              style={styles.analyzeButton}
              onPress={analyzeImage}
              disabled={loading}
            >
              <Text style={styles.analyzeButtonText}>
                {loading ? 'Analyzing...' : '🔍 Analyze Soil'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingSection}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Analyzing soil image...</Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${uploadProgress}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>{uploadProgress}%</Text>
        </View>
      )}

      {/* Analysis Results */}
      {analysisResult && (
        <View style={styles.resultsSection}>
          <Text style={styles.sectionTitle}>Analysis Results</Text>

          {/* Soil Health Score */}
          <View style={styles.scoreCard}>
            <Text style={styles.scoreTitle}>Soil Health Score</Text>
            <Text
              style={[
                styles.scoreValue,
                {
                  color:
                    analysisResult.healthScore > 70
                      ? 'green'
                      : analysisResult.healthScore > 50
                      ? 'orange'
                      : 'red',
                },
              ]}
            >
              {analysisResult.healthScore}/100
            </Text>
          </View>

          {/* Soil Type */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Soil Type</Text>
            <Text style={styles.infoValue}>{analysisResult.soilType}</Text>
          </View>

          {/* Nutrient Levels */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Nutrient Levels</Text>
            <NutrientMeter
              label="Nitrogen"
              value={analysisResult.nutrients.nitrogen}
              color={analysisResult.nutrients.nitrogen < 50 ? '#ff6b6b' : '#4CAF50'}
            />
            <NutrientMeter
              label="Phosphorus"
              value={analysisResult.nutrients.phosphorus}
              color={analysisResult.nutrients.phosphorus < 50 ? '#ff6b6b' : '#4CAF50'}
            />
            <NutrientMeter
              label="Potassium"
              value={analysisResult.nutrients.potassium}
              color={analysisResult.nutrients.potassium < 50 ? '#ff6b6b' : '#4CAF50'}
            />
            <NutrientMeter
              label="Organic Matter"
              value={analysisResult.nutrients.organicMatter}
              color={analysisResult.nutrients.organicMatter < 50 ? '#ff6b6b' : '#4CAF50'}
            />
          </View>

          {/* Soil Composition */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Soil Composition</Text>
            <ProgressChart
              data={{
                labels: ['Clay', 'Sand', 'Silt', 'Moisture'],
                data: [
                  analysisResult.composition.clay / 100,
                  analysisResult.composition.sand / 100,
                  analysisResult.composition.silt / 100,
                  analysisResult.composition.moisture / 100,
                ],
              }}
              width={Dimensions.get('window').width - 60}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(139, 69, 19, ${opacity})`, // Brown color for soil
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
            />
          </View>

          {/* Detected Issues */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Detected Issues</Text>
            {analysisResult.issues.map((issue, index) => (
              <Text key={index} style={styles.issueText}>
                • {issue}
              </Text>
            ))}
          </View>

          {/* Recommendations */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Recommendations</Text>
            {analysisResult.recommendations.map((rec, index) => (
              <Text key={index} style={styles.recommendationText}>
                • {rec}
              </Text>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2d5a2d',
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  instructions: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  cameraButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  galleryButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  analyzeButton: {
    backgroundColor: '#FF9800',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  analyzeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  progressText: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  resultsSection: {
    marginBottom: 20,
  },
  scoreCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  scoreTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  infoCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
  },
  nutrientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  nutrientLabel: {
    width: 120,
    fontSize: 14,
    color: '#333',
  },
  nutrientBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nutrientBar: {
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  nutrientValue: {
    fontSize: 12,
    color: '#666',
    minWidth: 30,
  },
  issueText: {
    fontSize: 14,
    color: '#d32f2f',
    marginBottom: 5,
    lineHeight: 20,
  },
  recommendationText: {
    fontSize: 14,
    color: '#2d5a2d',
    marginBottom: 5,
    lineHeight: 20,
  },
});

export default SoilImageAnalysisScreen;
