// // App.js
// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   Dimensions,
//   StatusBar
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';

// const { width, height } = Dimensions.get('window');

// export default function CropNexusApp() {
//   type CropName = 'Wheat' | 'Corn' | 'Rice' | 'Soybean' | 'Potato' | 'Tomato';
//   const [selectedCrop, setSelectedCrop] = useState<CropName>('Wheat');
//   const [soilMoisture, setSoilMoisture] = useState('65');
//   const [temperature, setTemperature] = useState('24');
//   const [rainfall, setRainfall] = useState('120');
//   const [nitrogen, setNitrogen] = useState('45');
//   const [predictedYield, setPredictedYield] = useState<number | null>(null);

//   const crops: { name: CropName; icon: string }[] = [
//     { name: 'Wheat', icon: '🌾' },
//     { name: 'Corn', icon: '🌽' },
//     { name: 'Rice', icon: '🍚' },
//     { name: 'Soybean', icon: '🫘' },
//     { name: 'Potato', icon: '🥔' },
//     { name: 'Tomato', icon: '🍅' }
//   ];
//   const predictYield = () => {
//     // Mock prediction algorithm
//     const baseYields: Record<CropName, number> = {
//       Wheat: 3.2,
//       Corn: 5.8,
//       Rice: 4.1,
//       Soybean: 2.4,
//       Potato: 12.5,
//       Tomato: 8.7
//     };

//     const moistureFactor = 0.5 + (parseFloat(soilMoisture) / 100);
//     const tempFactor = 1 - Math.abs(parseFloat(temperature) - 22) / 50;
//     const rainFactor = 0.3 + (parseFloat(rainfall) / 200);
//     const nitrogenFactor = 0.4 + (parseFloat(nitrogen) / 100);

//     const prediction = baseYields[selectedCrop] * moistureFactor * tempFactor * rainFactor * nitrogenFactor;
    
//     setPredictedYield(Number(prediction.toFixed(1)));
//   };

//   type CropCardProps = {
//     crop: { name: CropName; icon: string };
//     isSelected: boolean;
//     onPress: () => void;
//   };

//   const CropCard: React.FC<CropCardProps> = ({ crop, isSelected, onPress }) => (
//     <TouchableOpacity 
//       style={[styles.cropCard, isSelected && styles.cropCardSelected]}
//       onPress={onPress}
//     >
//       <Text style={styles.cropIcon}>{crop.icon}</Text>
//       <Text style={[styles.cropName, isSelected && styles.cropNameSelected]}>
//         {crop.name}
//       </Text>
//     </TouchableOpacity>
//   );

//   type InputFieldProps = {
//     label: string;
//     value: string;
//     onChange: (text: string) => void;
//     unit?: string;
//     icon?: string;
//   };

//   const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, unit, icon }) => (
//     <View style={styles.inputContainer}>
//       <Text style={styles.inputLabel}>{label}</Text>
//       <View style={styles.inputWrapper}>
//         <Ionicons name={icon as any} size={20} color="#2e7d32" />
//         <TextInput
//           style={styles.textInput}
//           value={value}
//           onChangeText={onChange}
//           keyboardType="numeric"
//           placeholder={`Enter ${label}`}
//         />
//         <Text style={styles.unitText}>{unit}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#2e7d32" barStyle="light-content" />
      
//       {/* Header */}
//       <LinearGradient
//         colors={['#2e7d32', '#4caf50']}
//         style={styles.header}
//       >
//         <View style={styles.headerContent}>
//           <Ionicons name="leaf" size={32} color="white" />
//           <Text style={styles.headerTitle}>CropNexus</Text>
//           <Text style={styles.headerSubtitle}>Smart Yield Prediction</Text>
//         </View>
//       </LinearGradient>

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* Crop Selection */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Select Crop</Text>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cropsScroll}>
//             {crops.map((crop) => (
//               <CropCard
//                 key={crop.name}
//                 crop={crop}
//                 isSelected={selectedCrop === crop.name}
//                 onPress={() => setSelectedCrop(crop.name)}
//               />
//             ))}
//           </ScrollView>
//         </View>

//         {/* Input Parameters */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Environmental Parameters</Text>
          
//           <InputField
//             label="Soil Moisture"
//             value={soilMoisture}
//             onChange={setSoilMoisture}
//             unit="%"
//             icon="water"
//           />
          
//           <InputField
//             label="Temperature"
//             value={temperature}
//             onChange={setTemperature}
//             unit="°C"
//             icon="thermometer"
//           />
          
//           <InputField
//             label="Rainfall"
//             value={rainfall}
//             onChange={setRainfall}
//             unit="mm"
//             icon="rainy"
//           />
          
//           <InputField
//             label="Nitrogen Level"
//             value={nitrogen}
//             onChange={setNitrogen}
//             unit="kg/ha"
//             icon="analytics"
//           />
//         {/* Results */}
//         {predictedYield !== null && (
//           <View style={styles.resultsSection}>
//             <Text style={styles.resultsTitle}>Prediction Results</Text>
//             <View style={styles.resultsCard}>
//               <Text style={styles.cropResult}>{selectedCrop} Yield</Text>
//               <Text style={styles.yieldValue}>{predictedYield} tons/hectare</Text>
//               <View style={styles.confidenceBar}>
//                 <View
//                   style={[
//                     styles.confidenceFill,
//                     { width: `${Math.min((predictedYield as number) / 15 * 100, 100)}%` }
//                   ]}
//                 />
//               </View>
//             </View>
//             <Text style={styles.confidenceText}>
//               {(((predictedYield as number) / 15) * 100).toFixed(0)}% Optimal Conditions
//             </Text>
//           </View>
//         )}

//         </View>

//         {/* Tips Section */}
//         <View style={styles.tipsSection}>
//           <Text style={styles.tipsTitle}>Optimization Tips</Text>
//           <View style={styles.tipCard}>
//             <Ionicons name="bulb" size={20} color="#ffa000" />
//             <Text style={styles.tipText}>
//               Maintain soil moisture between 60-70% for optimal growth
//             </Text>
//           </View>
//           <View style={styles.tipCard}>
//             <Ionicons name="bulb" size={20} color="#ffa000" />
//             <Text style={styles.tipText}>
//               Ideal temperature range: 20-28°C for most crops
//             </Text>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f9f5',
//   },
//   header: {
//     paddingTop: 50,
//     paddingBottom: 20,
//     paddingHorizontal: 20,
//     borderBottomLeftRadius: 25,
//     borderBottomRightRadius: 25,
//   },
//   headerContent: {
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: 'white',
//     marginTop: 10,
//   },
//   headerSubtitle: {
//     fontSize: 16,
//     color: 'rgba(255,255,255,0.8)',
//     marginTop: 5,
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//   },
//   section: {
//     backgroundColor: 'white',
//     borderRadius: 15,
//     padding: 20,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2e7d32',
//     marginBottom: 15,
//   },
//   cropsScroll: {
//     flexDirection: 'row',
//   },
//   cropCard: {
//     alignItems: 'center',
//     padding: 15,
//     marginRight: 10,
//     backgroundColor: '#f8fff8',
//     borderRadius: 12,
//     borderWidth: 2,
//     borderColor: '#e8f5e9',
//     minWidth: 80,
//   },
//   cropCardSelected: {
//     backgroundColor: '#e8f5e9',
//     borderColor: '#4caf50',
//   },
//   cropIcon: {
//     fontSize: 24,
//     marginBottom: 5,
//   },
//   cropName: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#666',
//   },
//   cropNameSelected: {
//     color: '#2e7d32',
//     fontWeight: 'bold',
//   },
//   inputContainer: {
//     marginBottom: 15,
//   },
//   inputLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#555',
//     marginBottom: 8,
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f8fff8',
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   textInput: {
//     flex: 1,
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     fontSize: 16,
//   },
//   unitText: {
//     color: '#666',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   predictButton: {
//     marginBottom: 20,
//     borderRadius: 15,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   predictButtonGradient: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 16,
//   },
//   predictButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   resultsSection: {
//     backgroundColor: 'white',
//     borderRadius: 15,
//     padding: 20,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   resultsTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2e7d32',
//     marginBottom: 15,
//   },
//   resultsCard: {
//     backgroundColor: '#f0f8f0',
//     borderRadius: 12,
//     padding: 20,
//     alignItems: 'center',
//   },
//   cropResult: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 5,
//   },
//   yieldValue: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#2e7d32',
//     marginBottom: 15,
//   },
//   confidenceBar: {
//     width: '100%',
//     height: 8,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 4,
//     marginBottom: 10,
//     overflow: 'hidden',
//   },
//   confidenceFill: {
//     height: '100%',
//     backgroundColor: '#4caf50',
//     borderRadius: 4,
//   },
//   confidenceText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   tipsSection: {
//     backgroundColor: 'white',
//     borderRadius: 15,
//     padding: 20,
//     marginBottom: 20,
//   },
//   tipsTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2e7d32',
//     marginBottom: 15,
//   },
//   tipCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff8e1',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   tipText: {
//     flex: 1,
//     marginLeft: 10,
//     fontSize: 14,
//     color: '#666',
//   },
// });

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

// Main App component
const App = () => {
  // Define a type for crop names to be used as keys
  type CropName = 'Wheat' | 'Corn' | 'Rice' | 'Soybean' | 'Potato' | 'Tomato';

  // Define a type for each crop object
  type Crop = { name: CropName; icon: string };

  const crops: Crop[] = [
    { name: 'Wheat', icon: '🌾' },
    { name: 'Corn', icon: '🌽' },
    { name: 'Rice', icon: '🍚' },
    { name: 'Soybean', icon: '🫘' },
    { name: 'Potato', icon: '🥔' },
    { name: 'Tomato', icon: '🍅' },
  ];

  const [selectedCrop, setSelectedCrop] = useState<CropName>(crops[0].name);
  const [soilMoisture, setSoilMoisture] = useState('65');
  const [temperature, setTemperature] = useState('24');
  const [rainfall, setRainfall] = useState('120');
  const [nitrogen, setNitrogen] = useState('45');
  const [predictedYield, setPredictedYield] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [progressWidth] = useState(new Animated.Value(0));

  // Refs for input fields to manage focus
  const soilMoistureRef = useRef<TextInput>(null);
  const temperatureRef = useRef<TextInput>(null);
  const rainfallRef = useRef<TextInput>(null);
  const nitrogenRef = useRef<TextInput>(null);


  const predictYield = () => {
    Keyboard.dismiss();
    setError('');

    const moisture = parseFloat(soilMoisture);
    const temp = parseFloat(temperature);
    const rain = parseFloat(rainfall);
    const nitro = parseFloat(nitrogen);

    if (isNaN(moisture) || isNaN(temp) || isNaN(rain) || isNaN(nitro)) {
      setError('Please enter valid numbers for all parameters.');
      setPredictedYield(null);
      return;
    }

    const baseYields: Record<CropName, number> = {
      'Wheat': 3.2,
      'Corn': 5.8,
      'Rice': 4.1,
      'Soybean': 2.4,
      'Potato': 12.5,
      'Tomato': 8.7
    };

    const moistureFactor = 0.5 + (moisture / 100);
    const tempFactor = 1 - Math.abs(temp - 22) / 50;
    const rainFactor = 0.3 + (rain / 200);
    const nitrogenFactor = 0.4 + (nitro / 100);

    const randomFactor = 0.9 + Math.random() * 0.2;
    const prediction = baseYields[selectedCrop] * moistureFactor * tempFactor * rainFactor * nitrogenFactor * randomFactor;

    const finalPrediction = Number(prediction.toFixed(1));
    setPredictedYield(finalPrediction);

    const progressPercent = Math.min((finalPrediction / 15) * 100, 100);
    Animated.timing(progressWidth, {
      toValue: progressPercent,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const focusNextField = (nextRef: React.RefObject<TextInput | null>) => {
    // Small delay to ensure the current field is properly updated
    setTimeout(() => {
      if (nextRef.current) {
        nextRef.current.focus();
      }
    }, 100);
  };

  type CropCardProps = {
    crop: Crop;
    isSelected: boolean;
    onPress: () => void;
  };

  const CropCard = ({ crop, isSelected, onPress }: CropCardProps) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.cropCard,
        isSelected ? styles.cropCardSelected : styles.cropCardNormal
      ]}
    >
      <Text style={styles.cropIcon}>{crop.icon}</Text>
      <Text style={[
        styles.cropName,
        isSelected ? styles.cropNameSelected : styles.cropNameNormal
      ]}>
        {crop.name}
      </Text>
    </TouchableOpacity>
  );

    type InputFieldProps = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    unit?: string;
    icon?: string;
    inputRef?: React.RefObject<TextInput | null>;
    onSubmitEditing?: () => void;
    returnKeyType?: 'done' | 'next' | 'default';
  };


  // Updated input field, borderless style
  const InputField = ({
    label,
    value,
    onChangeText,
    unit,
    icon,
    inputRef,
    onSubmitEditing,
    returnKeyType = 'default'
  }: InputFieldProps) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputIcon}>
          {icon === 'water' && '💧'}
          {icon === 'thermometer' && '🌡️'}
          {icon === 'rainy' && '🌧️'}
          {icon === 'analytics' && '📊'}
        </Text>
        <TextInput
          ref={(ref) => {
            if (inputRef && ref) {
              inputRef.current = ref;
            }
          }}
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={`Enter ${label}`}
          placeholderTextColor="#9ca3af"
          keyboardType="numeric"
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={returnKeyType === 'done'}
        />
        {unit && <Text style={styles.inputUnit}>{unit}</Text>}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#15803d" barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
            {/* Header with gradient */}
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <Text style={styles.headerIcon}>🌱</Text>
                <Text style={styles.headerTitle}>CropNexus</Text>
              </View>
              <Text style={styles.headerSubtitle}>Smart Yield Prediction</Text>
            </View>

            {/* Main content area */}
            <View style={styles.mainContent}>
              {/* Crop Selection Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Select Crop</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.cropsScrollView}
                  contentContainerStyle={styles.cropsContainer}
                >
                  {crops.map((crop) => (
                    <CropCard
                      key={crop.name}
                      crop={crop}
                      isSelected={selectedCrop === crop.name}
                      onPress={() => setSelectedCrop(crop.name)}
                    />
                  ))}
                </ScrollView>
              </View>
              {/* Input Parameters Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Environmental Parameters</Text>
                <InputField
                  label="Soil Moisture"
                  value={soilMoisture}
                  onChangeText={setSoilMoisture}
                  unit="%"
                  icon="water"
                  inputRef={soilMoistureRef}
                  returnKeyType="next"
                  onSubmitEditing={() => focusNextField(temperatureRef)}
                />
                <InputField
                  label="Temperature"
                  value={temperature}
                  onChangeText={setTemperature}
                  unit="°C"
                  icon="thermometer"
                  inputRef={temperatureRef}
                  returnKeyType="next"
                  onSubmitEditing={() => focusNextField(rainfallRef)}
                />
                <InputField
                  label="Rainfall"
                  value={rainfall}
                  onChangeText={setRainfall}
                  unit="mm"
                  icon="rainy"
                  inputRef={rainfallRef}
                  returnKeyType="next"
                  onSubmitEditing={() => focusNextField(nitrogenRef)}
                />
                <InputField
                  label="Nitrogen Level"
                  value={nitrogen}
                  onChangeText={setNitrogen}
                  unit="kg/ha"
                  icon="analytics"
                  inputRef={nitrogenRef}
                  returnKeyType="done"
                  onSubmitEditing={predictYield}
                />

                {/* Predict Button */}
                <TouchableOpacity
                  onPress={predictYield}
                  style={styles.predictButton}
                  activeOpacity={0.8}
                >
                  <Text style={styles.predictButtonText}>Predict Yield</Text>
                </TouchableOpacity>
              </View>

              {/* Results Section */}
              {error ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}

              {predictedYield !== null && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Prediction Results</Text>
                  <View style={styles.resultContainer}>
                    <Text style={styles.resultCrop}>{selectedCrop} Yield</Text>
                    <Text style={styles.resultYield}>
                      {predictedYield} <Text style={styles.resultUnit}>tons/ha</Text>
                    </Text>
                    <View style={styles.progressBar}>
                      <Animated.View
                        style={[
                          styles.progressFill,
                          {
                            width: progressWidth.interpolate({
                              inputRange: [0, 100],
                              outputRange: ['0%', '100%']
                            })
                          }
                        ]}
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {Math.min((predictedYield / 15) * 100, 100).toFixed(0)}% Optimal Conditions
                    </Text>
                  </View>
                </View>
              )}

              {/* Tips Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Optimization Tips</Text>
                <View style={styles.tipContainer}>
                  <Text style={styles.tipIcon}>💡</Text>
                  <Text style={styles.tipText}>
                    Maintain soil moisture between 60-70% for optimal growth, especially
                    during key developmental stages.
                  </Text>
                </View>
                <View style={styles.tipContainer}>
                  <Text style={styles.tipIcon}>💡</Text>
                  <Text style={styles.tipText}>
                    Ideal temperature range: 20-28°C for most crops. Extreme
                    temperatures can severely impact yield.
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#15803d',
    paddingVertical: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#d1fae5',
    fontWeight: '500',
  },
  mainContent: {
    paddingHorizontal: 16,
    marginTop: -32,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 16,
  },
  cropsScrollView: {
    marginHorizontal: -8,
  },
  cropsContainer: {
    paddingHorizontal: 8,
  },
  cropCard: {
    alignItems: 'center',
    padding: 16,
    marginRight: 12,
    borderRadius: 16,
    borderWidth: 2,
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cropCardNormal: {
    backgroundColor: 'white',
    borderColor: '#e5e7eb',
  },
  cropCardSelected: {
    backgroundColor: '#f0fdf4',
    borderColor: '#22c55e',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  cropIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  cropName: {
    fontSize: 14,
    fontWeight: '600',
  },
  cropNameNormal: {
    color: '#4b5563',
  },
  cropNameSelected: {
    color: '#166534',
  },
  // --- Borderless Input Styles ---
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,         // basic HTML-like border radius
    paddingHorizontal: 12,   // standard HTML input padding
    paddingVertical: 8,
    minHeight: 40,
    borderWidth: 1,          // basic HTML border
    borderColor: '#e5e7eb',  // very light gray border
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 12,
    minWidth: 24,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    padding: 0,                  // no extra padding like HTML input
    includeFontPadding: false,
    textAlignVertical: 'center',
    backgroundColor: 'transparent', // transparent background like HTML input
  },
  inputUnit: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginLeft: 8,
    minWidth: 40,
  },
  predictButton: {
    backgroundColor: '#16a34a',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    marginTop: 8,
  },
  predictButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  errorContainer: {
    backgroundColor: '#ef4444',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    backgroundColor: '#f0fdf4',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  resultCrop: {
    fontSize: 18,
    color: '#4b5563',
    marginBottom: 8,
    fontWeight: '500',
  },
  resultYield: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: 16,
  },
  resultUnit: {
    fontSize: 20,
    fontWeight: '600',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fefce8',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  tipIcon: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#713f12',
    lineHeight: 20,
    fontWeight: '500',
  },
});

export default App;
