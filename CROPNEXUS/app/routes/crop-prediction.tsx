// // import React, { useState } from "react";
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// //   ScrollView,
// // } from "react-native";
// // import { Picker } from "@react-native-picker/picker"; // 👈 install this package

// // // Import Gemini service
// // import { askAgricultureBot } from "../services/gemini";

// // export default function CropPredictionScreen() {
// //   const [soil, setSoil] = useState(""); 
// //   const [rainfall, setRainfall] = useState("");
// //   const [temperature, setTemperature] = useState("");
// //   const [prediction, setPrediction] = useState<string | null>(null);
// //   const [loading, setLoading] = useState(false);

// //   const soilTypes = [
// //     "Red Soil",
// //     "Laterite Soil",
// //     "Alluvial Soil",
// //     "Black Soil",
// //     "Loamy Soil",
// //     "Clay Soil",
// //     "Sandy Soil",
// //     "Mixed Soil",
// //   ];

// //   const handlePredict = async () => {
// //     setLoading(true);
// //     try {
// //       const userPrompt = `
// //       Location: Jharkhand, India
// //       Soil Type: ${soil}
// //       Rainfall: ${rainfall} mm
// //       Temperature: ${temperature} °C

// //       Suggest the **best crops** that can be cultivated in Jharkhand 
// //       under these conditions. 
// //       Also explain briefly why those crops are suitable.
// //       `;

// //       const result = await askAgricultureBot(userPrompt);
// //       setPrediction(result);
// //     } catch (error) {
// //       console.error(error);
// //       setPrediction("⚠️ Error fetching prediction");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <ScrollView contentContainerStyle={styles.container}>
// //       <Text style={styles.title}>🌱 Crop Prediction AI (Jharkhand)</Text>

// //       {/* Soil Picker */}
// //       <View style={styles.pickerContainer}>
// //         <Picker
// //           selectedValue={soil}
// //           onValueChange={(itemValue) => setSoil(itemValue)}
// //           style={styles.picker}
// //         >
// //           <Picker.Item label="Select Soil Type" value="" />
// //           {soilTypes.map((type) => (
// //             <Picker.Item key={type} label={type} value={type} />
// //           ))}
// //         </Picker>
// //       </View>

// //       <TextInput
// //         style={styles.input}
// //         placeholder="Rainfall (mm)"
// //         keyboardType="numeric"
// //         value={rainfall}
// //         onChangeText={setRainfall}
// //       />
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Temperature (°C)"
// //         keyboardType="numeric"
// //         value={temperature}
// //         onChangeText={setTemperature}
// //       />

// //       <TouchableOpacity
// //         style={styles.button}
// //         onPress={handlePredict}
// //         disabled={loading}
// //       >
// //         <Text style={styles.buttonText}>
// //           {loading ? "Predicting..." : "Predict Crop"}
// //         </Text>
// //       </TouchableOpacity>

// //       {prediction && (
// //         <View style={styles.resultBox}>
// //           <Text style={styles.resultTitle}>AI Suggestion:</Text>
// //           <Text style={styles.result}>{prediction}</Text>
// //         </View>
// //       )}
// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flexGrow: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     padding: 20,
// //     backgroundColor: "#f9f9f9",
// //   },
// //   title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
// //   input: {
// //     width: "100%",
// //     borderWidth: 1,
// //     borderColor: "#ccc",
// //     padding: 12,
// //     borderRadius: 10,
// //     marginBottom: 15,
// //     backgroundColor: "#fff",
// //   },
// //   pickerContainer: {
// //     width: "100%",
// //     borderWidth: 1,
// //     borderColor: "#ccc",
// //     borderRadius: 10,
// //     marginBottom: 15,
// //     backgroundColor: "#fff",
// //   },
// //   picker: {
// //     width: "100%",
// //     height: 50,
// //   },
// //   button: {
// //     backgroundColor: "#2e7d32",
// //     padding: 15,
// //     borderRadius: 10,
// //     alignItems: "center",
// //     width: "100%",
// //   },
// //   buttonText: { color: "#fff", fontWeight: "bold" },
// //   resultBox: {
// //     marginTop: 20,
// //     padding: 15,
// //     borderRadius: 10,
// //     backgroundColor: "#e8f5e9",
// //     width: "100%",
// //   },
// //   resultTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
// //   result: { fontSize: 16 },
// // });
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { LinearGradient } from "expo-linear-gradient"; // for gradient button
// import { askAgricultureBot } from "../services/gemini";

// export default function CropPredictionScreen() {
//   const [soil, setSoil] = useState("");
//   const [rainfall, setRainfall] = useState("");
//   const [temperature, setTemperature] = useState("");
//   const [prediction, setPrediction] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const soilTypes = [
//     "Red Soil",
//     "Laterite Soil",
//     "Alluvial Soil",
//     "Black Soil",
//     "Loamy Soil",
//     "Clay Soil",
//     "Sandy Soil",
//     "Mixed Soil",
//   ];

//   const handlePredict = async () => {
//     setLoading(true);
//     try {
//       const userPrompt = `
//       Location: Jharkhand, India
//       Soil Type: ${soil}
//       Rainfall: ${rainfall} mm
//       Temperature: ${temperature} °C

//       Suggest the **best crops** that can be cultivated in Jharkhand 
//       under these conditions. 
//       Also explain briefly why those crops are suitable.
//       `;
//       const result = await askAgricultureBot(userPrompt);
//       setPrediction(result);
//     } catch (error) {
//       console.error(error);
//       setPrediction("⚠️ Error fetching prediction");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>🌱 Crop Prediction AI</Text>
//       <Text style={styles.subtitle}>Jharkhand, India</Text>

//       {/* Soil Picker */}
//       <View style={styles.card}>
//         <Text style={styles.label}>Soil Type</Text>
//         <View style={styles.pickerContainer}>
//           <Picker
//             selectedValue={soil}
//             onValueChange={(itemValue) => setSoil(itemValue)}
//             style={styles.picker}
//           >
//             <Picker.Item label="Select Soil Type" value="" />
//             {soilTypes.map((type) => (
//               <Picker.Item key={type} label={type} value={type} />
//             ))}
//           </Picker>
//         </View>
//       </View>

//       {/* Rainfall Input */}
//       <View style={styles.card}>
//         <Text style={styles.label}>Rainfall (mm)</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Rainfall"
//           keyboardType="numeric"
//           value={rainfall}
//           onChangeText={setRainfall}
//         />
//       </View>

//       {/* Temperature Input */}
//       <View style={styles.card}>
//         <Text style={styles.label}>Temperature (°C)</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Temperature"
//           keyboardType="numeric"
//           value={temperature}
//           onChangeText={setTemperature}
//         />
//       </View>

//       {/* Predict Button */}
//       <TouchableOpacity
//         style={{ width: "100%", marginTop: 20 }}
//         onPress={handlePredict}
//         disabled={loading}
//       >
//         <LinearGradient
//           colors={["#4caf50", "#2e7d32"]}
//           style={styles.button}
//         >
//           <Text style={styles.buttonText}>
//             {loading ? "Predicting..." : "Predict Crop"}
//           </Text>
//         </LinearGradient>
//       </TouchableOpacity>

//       {/* Result Box */}
//       {prediction && (
//         <View style={styles.resultBox}>
//           <Text style={styles.resultTitle}>AI Suggestion:</Text>
//           <Text style={styles.result}>{prediction}</Text>
//         </View>
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#f0f8f5",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#2e7d32",
//     marginBottom: 5,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#555",
//     marginBottom: 20,
//   },
//   card: {
//     width: "100%",
//     backgroundColor: "#fff",
//     borderRadius: 15,
//     padding: 15,
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 8,
//     color: "#333",
//   },
//   input: {
//     width: "100%",
//     padding: 12,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     backgroundColor: "#fafafa",
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 10,
//     overflow: "hidden",
//     backgroundColor: "#fafafa",
//   },
//   picker: { height: 50, width: "100%" },
//   button: {
//     padding: 15,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
//   resultBox: {
//     marginTop: 25,
//     padding: 20,
//     borderRadius: 15,
//     backgroundColor: "#e0f2f1",
//     width: "100%",
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3,
//   },
//   resultTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
//   result: { fontSize: 16, color: "#333" },
// });

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

// Districts
const districts = ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Giridih", "Ramgarh"];

// Soil types
const soilTypes = [
  "Red Soil",
  "Laterite Soil",
  "Alluvial Soil",
  "Black Soil",
  "Loamy Soil",
  "Clay Soil",
  "Sandy Soil",
];

// Random data generators
const getRandomRainfall = (district: string): number => {
  const rainfallData: Record<string, number> = {
    "Ranchi": Math.floor(Math.random() * (1400 - 1200) + 1200),
    "Jamshedpur": Math.floor(Math.random() * (1350 - 1150) + 1150),
    "Dhanbad": Math.floor(Math.random() * (1300 - 1100) + 1100),
    "Bokaro": Math.floor(Math.random() * (1250 - 1050) + 1050),
    "Hazaribagh": Math.floor(Math.random() * (1200 - 1000) + 1000),
    "Giridih": Math.floor(Math.random() * (1180 - 980) + 980),
    "Ramgarh": Math.floor(Math.random() * (1220 - 1020) + 1020),
  };
  return rainfallData[district] ?? Math.floor(Math.random() * (1300 - 1000) + 1000);
};

const getRandomTemperature = (district: string): number => {
  const temperatureData: Record<string, number> = {
    "Ranchi": Math.floor(Math.random() * (28 - 24) + 24),
    "Jamshedpur": Math.floor(Math.random() * (30 - 26) + 26),
    "Dhanbad": Math.floor(Math.random() * (29 - 25) + 25),
    "Bokaro": Math.floor(Math.random() * (27 - 23) + 23),
    "Hazaribagh": Math.floor(Math.random() * (26 - 22) + 22),
    "Giridih": Math.floor(Math.random() * (28 - 24) + 24),
    "Ramgarh": Math.floor(Math.random() * (27 - 23) + 23),
  };
  return temperatureData[district] ?? Math.floor(Math.random() * (28 - 24) + 24);
};

const generateCropPrediction = (district: string, soil: string, rainfall: string, temperature: string): string => {
  const cropSuggestions = {
    "Red Soil": {
      primary: ["Rice", "Wheat", "Sugarcane", "Cotton"],
      secondary: ["Maize", "Pulses", "Groundnut"]
    },
    "Laterite Soil": {
      primary: ["Rice", "Ragi", "Cashew", "Coconut"],
      secondary: ["Tapioca", "Sweet Potato", "Ginger"]
    },
    "Alluvial Soil": {
      primary: ["Rice", "Wheat", "Sugarcane", "Jute"],
      secondary: ["Maize", "Barley", "Peas"]
    },
    "Black Soil": {
      primary: ["Cotton", "Sugarcane", "Wheat", "Jowar"],
      secondary: ["Sunflower", "Safflower", "Linseed"]
    },
    "Loamy Soil": {
      primary: ["Rice", "Wheat", "Maize", "Vegetables"],
      secondary: ["Pulses", "Oilseeds", "Fruits"]
    },
    "Clay Soil": {
      primary: ["Rice", "Wheat", "Sugarcane"],
      secondary: ["Mustard", "Gram", "Pea"]
    },
    "Sandy Soil": {
      primary: ["Millets", "Groundnut", "Watermelon"],
      secondary: ["Bajra", "Jowar", "Castor"]
    }
  };

  const soilCrops = cropSuggestions[soil as keyof typeof cropSuggestions] || cropSuggestions["Loamy Soil"];
  const primaryCrops = soilCrops.primary.slice(0, 2);
  const secondaryCrops = soilCrops.secondary.slice(0, 2);

  let climateAdvice = "";
  if (parseInt(rainfall) > 1200) {
    climateAdvice = "High rainfall is excellent for water-intensive crops like rice and sugarcane.";
  } else if (parseInt(rainfall) > 800) {
    climateAdvice = "Moderate rainfall supports a variety of crops including wheat and maize.";
  } else {
    climateAdvice = "Lower rainfall requires drought-resistant crops like millets and groundnut.";
  }

  let tempAdvice = "";
  if (parseInt(temperature) > 28) {
    tempAdvice = "Higher temperatures favor warm-season crops.";
  } else if (parseInt(temperature) > 24) {
    tempAdvice = "Moderate temperatures are suitable for most crops.";
  } else {
    tempAdvice = "Cooler temperatures are ideal for rabi crops like wheat and mustard.";
  }

  return `🌾 RECOMMENDED CROPS FOR ${district.toUpperCase()}:

✅ PRIMARY RECOMMENDATIONS:
${primaryCrops.map(crop => `• ${crop}`).join('\n')}

🌱 SECONDARY OPTIONS:
${secondaryCrops.map(crop => `• ${crop}`).join('\n')}

🌧️ RAINFALL ANALYSIS (${rainfall}mm):
${climateAdvice}

🌡️ TEMPERATURE ANALYSIS (${temperature}°C):
${tempAdvice}

📍 SOIL TYPE SUITABILITY (${soil}):
${soil} is well-suited for the recommended crops due to its nutrient content and drainage properties.

💡 FARMING TIP: Consider crop rotation and organic farming practices for better soil health and yield.`;
};

export default function CropPredictionScreen() {
  const navigation = useNavigation();
  const [district, setDistrict] = useState("");
  const [soil, setSoil] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [temperature, setTemperature] = useState("");
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [soilImage, setSoilImage] = useState<string | null>(null);

  // Fetch random rainfall & temperature when district changes
  useEffect(() => {
    const fetchDistrictData = async () => {
      if (!district) {
        setRainfall("");
        setTemperature("");
        return;
      }

      setFetchingData(true);
      
      // Simulate API delay
      setTimeout(() => {
        const randomRainfall = getRandomRainfall(district);
        const randomTemperature = getRandomTemperature(district);
        
        setRainfall(randomRainfall.toString());
        setTemperature(randomTemperature.toString());
        setFetchingData(false);
      }, 1500); // 1.5 second delay to simulate API call
    };

    fetchDistrictData();
  }, [district]);

  // Handle crop prediction
  const handlePredict = async () => {
    setLoading(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const prediction = generateCropPrediction(district, soil, rainfall, temperature);
      setPrediction(prediction);
      setLoading(false);
    }, 2000); // 2 second delay to simulate AI processing
  };

  // Take photo from camera
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to take photos!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    
    if (!result.canceled) {
      setSoilImage(result.assets[0].uri);
    }
  };

  // Upload photo from files
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    
    if (!result.canceled) {
      setSoilImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerCenter}>
          <Text style={styles.title}>🌱 AI Crop Prediction</Text>
        </View>
        <View style={styles.headerRight}>{/* Empty view for balance */}</View>
      </View>

      <Text style={styles.subtitle}>Jharkhand, India</Text>

      {/* District Picker */}
      <View style={styles.card}>
        <Text style={styles.label}>Select District</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={district} onValueChange={setDistrict} style={styles.picker}>
            <Picker.Item label="Select District" value="" />
            {districts.map((dist) => (
              <Picker.Item key={dist} label={dist} value={dist} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Soil Picker */}
      <View style={styles.card}>
        <Text style={styles.label}>Select Soil Type</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={soil} onValueChange={setSoil} style={styles.picker}>
            <Picker.Item label="Select Soil Type" value="" />
            {soilTypes.map((s) => (
              <Picker.Item key={s} label={s} value={s} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Soil Image Upload Section - Only show after soil selection */}
      {soil && (
        <View style={styles.card}>
          <Text style={styles.label}>Upload or Click Soil Image (Optional)</Text>
          <Text style={styles.subLabel}>Help us verify your {soil} selection</Text>
          <View style={styles.uploadButtonContainer}>
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Text style={styles.uploadButtonText}>📁 Upload Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadButton} onPress={takePhoto}>
              <Text style={styles.uploadButtonText}>📷 Take Photo</Text>
            </TouchableOpacity>
          </View>
          {soilImage && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: soilImage }}
                style={styles.imagePreview}
                resizeMode="cover"
              />
              <TouchableOpacity 
                style={styles.removeImageButton} 
                onPress={() => setSoilImage(null)}
              >
                <Text style={styles.removeImageText}>✕ Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {/* Rainfall Input */}
      <View style={styles.card}>
        <Text style={styles.label}>Average Annual Rainfall (mm)</Text>
        {fetchingData ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#2e7d32" />
            <Text style={styles.loadingText}>Fetching climate data...</Text>
          </View>
        ) : (
          <TextInput
            style={styles.input}
            value={rainfall}
            onChangeText={setRainfall}
            keyboardType="numeric"
            placeholder="Enter rainfall in mm"
            placeholderTextColor="#999"
          />
        )}
      </View>

      {/* Temperature Input */}
      <View style={styles.card}>
        <Text style={styles.label}>Average Temperature (°C)</Text>
        {fetchingData ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#2e7d32" />
            <Text style={styles.loadingText}>Fetching climate data...</Text>
          </View>
        ) : (
          <TextInput
            style={styles.input}
            value={temperature}
            onChangeText={setTemperature}
            keyboardType="numeric"
            placeholder="Enter temperature in °C"
            placeholderTextColor="#999"
          />
        )}
      </View>

      {/* Predict Button */}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handlePredict}
        disabled={loading || !district || !soil || fetchingData || !rainfall || !temperature}
        activeOpacity={0.8}
      >
        <LinearGradient 
          colors={["#4caf50", "#2e7d32"]} 
          style={[
            styles.button,
            (loading || !district || !soil || fetchingData || !rainfall || !temperature) && styles.buttonDisabled
          ]}
        >
          {loading ? (
            <View style={styles.buttonLoadingContainer}>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={styles.buttonText}>Analyzing Data...</Text>
            </View>
          ) : (
            <Text style={styles.buttonText}>🔍 Get Crop Recommendations</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>

      {/* Prediction Result */}
      {prediction && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>🌾 AI Crop Recommendations:</Text>
          <Text style={styles.result}>{prediction}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#c4d3c0ff"
  },
  header: {
    width: "100%",
    backgroundColor: "#3ba040ff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 15,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 60,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  headerLeft: { flex: 1, alignItems: "flex-start" },
  headerCenter: { flex: 2, alignItems: "center" },
  headerRight: { flex: 1, alignItems: "flex-end" },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  backText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff", textAlign: "center" },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 20, fontWeight: "500" },

  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 10, color: "#333" },
  subLabel: { fontSize: 14, color: "#666", marginBottom: 15, fontStyle: "italic" },
  pickerContainer: { 
    borderWidth: 1, 
    borderColor: "#e0e0e0", 
    borderRadius: 12, 
    overflow: "hidden", 
    backgroundColor: "#fafafa" 
  },
  picker: { height: 50, width: "100%" },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333"
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0"
  },
  loadingText: { marginLeft: 10, color: "#2e7d32", fontSize: 14, fontWeight: "500" },
  buttonContainer: { width: "100%", marginTop: 20 },
  button: {
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#2e7d32",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonLoadingContainer: { flexDirection: "row", alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16, marginLeft: 8 },

  // Image upload styles
  uploadButtonContainer: {
    flexDirection: "row", 
    justifyContent: "space-between",
    marginBottom: 10
  },
  uploadButton: {
    backgroundColor: "#4caf50",
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 5,
    flex: 1
  },
  uploadButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center"
  },
  imageContainer: {
    position: "relative",
    marginTop: 12
  },
  imagePreview: {
    width: "100%",
    height: 180,
    borderRadius: 12,
  },
  removeImageButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  removeImageText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600"
  },

  resultBox: {
    marginTop: 25,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#e8f5e8",
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderWidth: 1,
    borderColor: "#c8e6c9"
  },
  resultTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12, color: "#2e7d32" },
  result: { fontSize: 15, color: "#333", lineHeight: 22 },
});