import { ResizeMode, Video } from 'expo-av';
import { router, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

export default function SplashScreen() {

  useEffect(() => {
    // This timer will navigate to the language screen after 3 seconds
    const timer = setTimeout(() => {
      router.replace('/language');
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
              { translateX: -20 }, // Moves 30 pixels left
              { translateY: -10 }, // Moves 40 pixels up
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