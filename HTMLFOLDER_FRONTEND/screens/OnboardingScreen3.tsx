import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type RootStackParamList = {
  Onboarding4: undefined;
};

export default function OnboardingScreen3() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.para}>ALLOW NOTIFICATIONS</Text>
        <Text style={styles.small}>To receive important farming tips and increasing profit..</Text>
      </View>
      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navButton1} onPress={() => navigation.navigate('Onboarding4')}>
          <Text style={styles.buttonText1}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton2} onPress={() => navigation.navigate('Onboarding4')}>
          <Text style={styles.buttonText2}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  para: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
    fontStyle: 'italic',
  },
  small: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 40,
  },
  navButton1: {
    padding: 12,
    width: 150,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  navButton2: {
    padding: 12,
    width: 150,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#4CAF50',
  },
  buttonText1: {
    fontSize: 18,
    color: '#000',
  },
  buttonText2: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});