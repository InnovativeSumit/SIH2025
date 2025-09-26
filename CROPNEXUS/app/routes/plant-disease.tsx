import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  Share,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import plantDiseaseService, { DiseaseDetectionResult, DetectionResponse } from '../services/plantDiseaseService';

export default function PlantDiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectionResult, setDetectionResult] = useState<DiseaseDetectionResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Load disease data when component mounts
    plantDiseaseService.loadDiseaseData();
  }, []);

  const handleImageSelection = () => {
    Alert.alert(
      'Select Image Source',
      'Choose how you want to add a plant image',
      [
        {
          text: 'Camera',
          onPress: captureImage,
          style: 'default',
        },
        {
          text: 'Gallery',
          onPress: pickImage,
          style: 'default',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const captureImage = async () => {
    const imageUri = await plantDiseaseService.captureImage();
    if (imageUri) {
      setSelectedImage(imageUri);
      setShowResult(false);
      setDetectionResult(null);
    }
  };

  const pickImage = async () => {
    const imageUri = await plantDiseaseService.pickImage();
    if (imageUri) {
      setSelectedImage(imageUri);
      setShowResult(false);
      setDetectionResult(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      Alert.alert('No Image', 'Please select an image first');
      return;
    }

    setIsAnalyzing(true);
    try {
      const response: DetectionResponse = await plantDiseaseService.analyzeImage(selectedImage);
      
      if (response.success && response.result) {
        setDetectionResult(response.result);
        setShowResult(true);
      } else {
        Alert.alert('Analysis Failed', response.error || 'Unable to analyze the image');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const downloadReport = async () => {
    if (!detectionResult || !selectedImage) return;

    try {
      const report = await plantDiseaseService.generateReport(detectionResult, selectedImage);
      
      // Share the report
      await Share.share({
        message: report,
        title: 'Plant Disease Detection Report',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to generate report');
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setDetectionResult(null);
    setShowResult(false);
  };

  const renderImageSection = () => (
    <View style={styles.imageSection}>
      <Text style={styles.sectionTitle}>Plant Image</Text>
      
      {selectedImage ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          <TouchableOpacity style={styles.changeImageButton} onPress={handleImageSelection}>
            <Ionicons name="camera" size={20} color="white" />
            <Text style={styles.changeImageText}>Change Image</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.imagePlaceholder} onPress={handleImageSelection}>
          <Ionicons name="camera" size={60} color="#4CAF50" />
          <Text style={styles.placeholderText}>Tap to add plant image</Text>
          <Text style={styles.placeholderSubtext}>Camera or Gallery</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderAnalysisSection = () => (
    <View style={styles.analysisSection}>
      {selectedImage && !showResult && (
        <TouchableOpacity 
          style={[styles.analyzeButton, isAnalyzing && styles.disabledButton]} 
          onPress={analyzeImage}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <ActivityIndicator color="white" size="small" />
              <Text style={styles.analyzeButtonText}>Analyzing...</Text>
            </>
          ) : (
            <>
              <Ionicons name="search" size={20} color="white" />
              <Text style={styles.analyzeButtonText}>Analyze Disease</Text>
            </>
          )}
        </TouchableOpacity>
      )}
    </View>
  );

  const renderResults = () => {
    if (!showResult || !detectionResult) return null;

    return (
      <View style={styles.resultsSection}>
        <LinearGradient colors={['#e8f5e9', '#c8e6c9']} style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Ionicons name="medical" size={24} color="#2e7d32" />
            <Text style={styles.resultTitle}>Detection Results</Text>
          </View>

          <View style={styles.diseaseInfo}>
            <Text style={styles.diseaseName}>{detectionResult.name}</Text>
            <View style={styles.confidenceContainer}>
              <Text style={styles.confidenceLabel}>Confidence: </Text>
              <Text style={styles.confidenceValue}>
                {(detectionResult.confidence * 100).toFixed(1)}%
              </Text>
            </View>
          </View>

          <View style={styles.causeSection}>
            <Text style={styles.sectionLabel}>Cause:</Text>
            <Text style={styles.causeText}>{detectionResult.cause}</Text>
          </View>

          <View style={styles.treatmentSection}>
            <Text style={styles.sectionLabel}>{detectionResult.cure.title}</Text>
            {detectionResult.cure.steps.map((step, index) => (
              <View key={index} style={styles.treatmentStep}>
                <Text style={styles.stepNumber}>{index + 1}.</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>

          <View style={styles.productSection}>
            <Text style={styles.sectionLabel}>Recommended Product:</Text>
            <View style={styles.productCard}>
              <Text style={styles.productName}>{detectionResult.product.fertilizer}</Text>
              <Text style={styles.productDescription}>{detectionResult.product.description}</Text>
              <View style={styles.productFeatures}>
                {detectionResult.product.features.map((feature, index) => (
                  <View key={index} style={styles.featureTag}>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.reportButton} onPress={downloadReport}>
              <Ionicons name="download" size={20} color="white" />
              <Text style={styles.reportButtonText}>Download Report</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.resetButton} onPress={resetAnalysis}>
              <Ionicons name="refresh" size={20} color="#4CAF50" />
              <Text style={styles.resetButtonText}>New Analysis</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Plant Disease Detector</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderImageSection()}
        {renderAnalysisSection()}
        {renderResults()}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 40,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  imageSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  imageContainer: {
    alignItems: 'center',
  },
  selectedImage: {
    width: 250,
    height: 250,
    borderRadius: 12,
    marginBottom: 12,
  },
  changeImageButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  changeImageText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
  },
  imagePlaceholder: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
    marginTop: 12,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  analysisSection: {
    marginBottom: 24,
  },
  analyzeButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  disabledButton: {
    backgroundColor: '#999',
  },
  analyzeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  resultsSection: {
    marginBottom: 24,
  },
  resultCard: {
    borderRadius: 16,
    padding: 20,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginLeft: 8,
  },
  diseaseInfo: {
    marginBottom: 16,
  },
  diseaseName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1b5e20',
    marginBottom: 8,
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  confidenceLabel: {
    fontSize: 16,
    color: '#2e7d32',
  },
  confidenceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1b5e20',
  },
  causeSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 8,
  },
  causeText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  treatmentSection: {
    marginBottom: 20,
  },
  treatmentStep: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingRight: 16,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginRight: 8,
    minWidth: 20,
  },
  stepText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    lineHeight: 18,
  },
  productSection: {
    marginBottom: 20,
  },
  productCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
    lineHeight: 18,
  },
  productFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureTag: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 12,
    color: '#2e7d32',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reportButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    flex: 0.48,
    justifyContent: 'center',
  },
  reportButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  resetButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    flex: 0.48,
    justifyContent: 'center',
  },
  resetButtonText: {
    color: '#4CAF50',
    fontWeight: '600',
    marginLeft: 8,
  },
});
