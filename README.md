
  <a href="#">
    <img src="![Uploading main.jpg…]()
" alt="Logo" width="120" height="120">
  </a>


# CropNexus AI - Complete Plant Disease Detection System

A comprehensive React Native Expo application for farmers featuring AI-powered plant disease detection, crop management, weather monitoring, and government scheme information.

## 🚀 Features

### 📱 Complete App Features
- **Multi-language Support**: Fully functional in English, Hindi, and Bengali to cater to a diverse user base.
- **Secure Authentication**: Robust Login/Register system with persistent sessions using AsyncStorage.
- **Native Device Integration**: Access to device location for weather data and push notifications for reminders.
- **Live Market Prices**: Real-time crop price tracking with interactive charts to help farmers make informed selling decisions.
- **Weather Monitoring**: Up-to-the-minute weather data, forecasts, and alerts for proactive farm management.
- **Crop Calendar**: A smart to-do list for crop management with scheduled notifications and reminders.
- **Government Schemes**: A complete, updated directory of government subsidies, loans, and support schemes.
- **Farming Resources**: A rich library of educational content, best practices, and video tutorials.


## ✨ Tech Stack

Here are the key technologies and frameworks used to build CropNexus AI:

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white)
![Keras](https://img.shields.io/badge/Keras-%23D00000.svg?style=for-the-badge&logo=Keras&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Axios](https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white)



## 📸 App Screenshots

<p align="center">
  <img src="d:\SIH\CROPNEXUS_RANDOM\demo-photos\1.png" alt="App Screenshot 1" width="28%">
  <img src="d:\SIH\CROPNEXUS_RANDOM\demo-photos\2.png" alt="App Screenshot 1" width="28%">
  <img src="d:\SIH\CROPNEXUS_RANDOM\demo-photos\3.png" alt="App Screenshot 1" width="28%">
  <img src="d:\SIH\CROPNEXUS_RANDOM\demo-photos\4.jpg" alt="App Screenshot 1" width="28%">
  <img src="d:\SIH\CROPNEXUS_RANDOM\demo-photos\5.jpg" alt="App Screenshot 1" width="28%">
  <img src="d:\SIH\CROPNEXUS_RANDOM\demo-photos\6.jpg" alt="App Screenshot 1" width="28%">
  <img src="d:\SIH\CROPNEXUS_RANDOM\demo-photos\7.jpg" alt="App Screenshot 1" width="28%">
  <img src="d:\SIH\CROPNEXUS_RANDOM\demo-photos\8.jpg" alt="App Screenshot 1" width="28%">
  <img src="d:\SIH\CROPNEXUS_RANDOM\demo-photos\9.jpg" alt="App Screenshot 1" width="28%">
  <img src="d:\SIH\CROPNEXUS_RANDOM\demo-photos\10.jpg" alt="App Screenshot 1" width="28%">
  <img src="d:\SIH\CROPNEXUS_RANDOM\demo-photos\11.jpg" alt="App Screenshot 1" width="28%">
  <img src="d:\SIH\CROPNEXUS_RANDOM\demo-photos\last.png" alt="App Screenshot 1" width="28%">
  <!-- <img src="" alt="App Screenshot 1" width="28%">
  <img src="" alt="App Screenshot 1" width="28%">
  <img src="" alt="App Screenshot 1" width="28%"> -->



</p>


## 🛠 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)

### Quick Start Commands
Execute the following commands line by line:

```bash
# Install dependencies
npm install

# Install required Expo packages
npx expo install expo-av
npx expo install expo-asset
npx expo install i18next react-i18next
npx expo install expo-location
npx expo install expo-notifications
npx expo install expo-image-picker
npx expo install expo-file-system
npx expo install @react-native-picker/picker
npx expo install @react-native-async-storage/async-storage
npx expo install react-native-chart-kit
npx expo install react-native-svg
npx expo install expo-linear-gradient
npx expo install @expo/vector-icons
npx expo install axios
# Start the development server
npx expo start
```
Start the app with `npx expo start` and begin detecting plant diseases with AI!
### Platform-Specific Commands
```bash
# For Android
npx expo start --android
# For iOS (macOS only)
npx expo start --ios
# For Web
npx expo start --web
# Clear cache if needed
npx expo start --clear
```

## 🧠 AI Model Integration

### Model Details
- **File**: `app/assets/models/Plant_Desese_Detection.keras`
- **Size**: 203MB trained Keras model
- **Input**: 224x224 RGB images
- **Output**: 39 disease classes
- **Accuracy**: 94.2%

### Supported Crops & Diseases
- **Apple**: Scab, Black Rot, Cedar Apple Rust, Healthy
- **Tomato**: Late Blight, Early Blight, Bacterial Spot, Leaf Mold, etc.
- **Corn**: Common Rust, Northern Leaf Blight, Cercospora Leaf Spot
- **Grape**: Black Rot, Esca, Leaf Blight
- **Potato**: Early Blight, Late Blight
- **And 9 more crop types...**

### Disease Database
- **File**: `app/assets/data/plant_disease.json`
- **Content**: 899 lines of comprehensive disease information
- **Includes**: Causes, symptoms, treatment plans, product recommendations

## 📁 Project Structure

```
cropnexus-ai-complete/
├── app/
│   ├── assets/
│   │   ├── models/
│   │   │   └── Plant_Desese_Detection.keras    # AI Model
│   │   └── data/
│   │       ├── plant_disease.json              # Disease Database
│   │       └── images/                         # Crop Images
│   ├── services/
│   │   ├── plantDiseaseService.ts              # AI Service
│   │   ├── authService.ts                      # Authentication
│   │   ├── weatherService.ts                   # Weather API
│   │   └── ...
│   ├── routes/
│   │   ├── plant-disease.tsx                   # AI Detection UI
│   │   ├── crop-market.tsx                     # Market Prices
│   │   ├── weather.tsx                         # Weather Monitor
│   │   └── ...
│   ├── dashboard.tsx                           # Main Dashboard
│   ├── resources.tsx                           # Farming Resources
│   ├── schemes.tsx                             # Government Schemes
│   └── ...
├── locales/                                    # Multi-language
├── components/                                 # Reusable Components
└── package.json                                # Dependencies
```

## 📊 App Flow

```
Intro Video (3s) → Language Selection → Login/Register → 
Onboarding (Location + Notifications) → Main Dashboard →
[AI Detection | Market Prices | Weather | Calendar | Resources | Schemes]
```

## 🎉 Ready to Use!

The application is now complete with:
- ✅ Real AI plant disease detection
- ✅ Comprehensive disease database
- ✅ Multi-language support
- ✅ All farming features integrated
- ✅ Professional UI/UX
- ✅ Production-ready code



