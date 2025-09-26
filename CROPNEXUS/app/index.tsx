import { ResizeMode, Video } from 'expo-av';
import { router, Stack } from 'expo-router';
import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import authService from './services/authService';

export default function SplashScreen() {

  useEffect(() => {
    // This timer will check authentication and navigate after 3 seconds
    const timer = setTimeout(async () => {
      // try {
      //   const isLoggedIn = await authService.isLoggedIn();
      //   const isOnboardingCompleted = await authService.isOnboardingCompleted();
        
      //   // if (isLoggedIn && isOnboardingCompleted) {
      //   //   // User is logged in and has completed onboarding, go to dashboard
      //   //   router.replace('/dashboard');
      //   // } else if (isLoggedIn && !isOnboardingCompleted) {
      //   //   // User is logged in but hasn't completed onboarding
      //   //   router.replace('/onboarding1');
      //   // } else {
      //   //   // User is not logged in, go to language selection
      //   //   router.replace('/language');
      //   // }
      //   if (!isLoggedIn) {
      //   router.replace('/language');
      //           } else if (isLoggedIn && !isOnboardingCompleted) {
      //              router.replace('/onboarding1');
      //               } else {
      //                      router.replace('/dashboard');
      //                   }

      // } 
        try {
        const isLoggedIn = await authService.isLoggedIn();
        const isOnboardingCompleted = await authService.isOnboardingCompleted();

+       console.log('Splash decision -> isLoggedIn:', isLoggedIn, 'isOnboardingCompleted:', isOnboardingCompleted);

        if (!isLoggedIn) {
          router.replace('/language');
        } else if (isLoggedIn && !isOnboardingCompleted) {
          router.replace('/onboarding1');
        } else {
          router.replace('/dashboard');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Default to language selection on error
        router.replace('/language');
      }
    }, 3000);

    // Cleans up the timer
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Video
      style={[
        StyleSheet.absoluteFill,
        {
        // This transform style correctly shifts the video
        transform: [
          { translateX:  10 }, 
          { translateY: -10 }, 
        ],
        },
      ]}
      // This path is correct for a video in 'app/assets/'
      source={require('./assets/video.mp4')}
      // This ensures the entire video is visible and centered
      resizeMode={ResizeMode.CONTAIN}
      shouldPlay
      isMuted
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
