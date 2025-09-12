import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const handleSkip = () => {
    // Navigate to the next screen (fet2.html equivalent)
    navigation.navigate('NextScreen');
  };

  const handleNext = () => {
    // Navigate to the next screen (fet2.html equivalent)
    navigation.navigate('NextScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://i.ibb.co/xKQwgj5H/Screenshot-2025-09-12-184510.png' }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.para}>
            GROW SMARTLY TOGETHER WITH AI HARVEST MORE PROFIT
          </Text>

          {/* Carousel Dots */}
          <View style={styles.carouselDots}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navigation}>
          <TouchableOpacity style={styles.navButton1} onPress={handleSkip}>
            <Text style={styles.navButton1Text}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton2} onPress={handleNext}>
            <Text style={styles.navButton2Text}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: width * 0.77,
    height: undefined,
    aspectRatio: 1, // Maintain aspect ratio
    marginLeft: width * 0.1, // Equivalent to 45px margin-left
    borderRadius: 10,
  },
  para: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    color: '#000000',
    fontWeight: 'normal',
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  dot: {
    height: 12,
    width: 12,
    marginHorizontal: 6,
    backgroundColor: 'lightgray',
    borderRadius: 6,
  },
  activeDot: {
    backgroundColor: 'blue',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 100,
    gap: 20,
  },
  navButton1: {
    fontSize: 18,
    backgroundColor: 'rgb(255, 255, 255)',
    borderWidth: 0,
    padding: 12,
    width: 200,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButton1Text: {
    color: '#000000',
    fontSize: 18,
  },
  navButton2: {
    fontSize: 18,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgb(98, 218, 85)',
    padding: 12,
    width: 200,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButton2Text: {
    color: '#000000',
    fontSize: 18,
  },
});

// For responsive design on smaller screens
const responsiveStyles = StyleSheet.create({
  para: {
    fontSize: Dimensions.get('window').width < 420 ? 18 : 30,
  },
  navigation: {
    marginTop: Dimensions.get('window').width < 420 ? 50 : 100,
    gap: Dimensions.get('window').width < 420 ? 10 : 20,
  },
  navButton1: {
    width: Dimensions.get('window').width < 420 ? 120 : 200,
  },
  navButton2: {
    width: Dimensions.get('window').width < 420 ? 120 : 200,
  },
  navButton1Text: {
    fontSize: Dimensions.get('window').width < 420 ? 13 : 18,
  },
  navButton2Text: {
    fontSize: Dimensions.get('window').width < 420 ? 13 : 18,
  },
});

// Combine the styles
const combinedStyles = StyleSheet.create({
  ...styles,
  para: {
    ...styles.para,
    ...responsiveStyles.para,
  },
  navigation: {
    ...styles.navigation,
    ...responsiveStyles.navigation,
  },
  navButton1: {
    ...styles.navButton1,
    width: responsiveStyles.navButton1.width,
  },
  navButton2: {
    ...styles.navButton2,
    width: responsiveStyles.navButton2.width,
  },
  navButton1Text: {
    ...styles.navButton1Text,
    fontSize: responsiveStyles.navButton1Text.fontSize,
  },
  navButton2Text: {
    ...styles.navButton2Text,
    fontSize: responsiveStyles.navButton2Text.fontSize,
  },
});

export default WelcomeScreen;