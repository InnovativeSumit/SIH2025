import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* 'index' is the video splash screen */}
      <Stack.Screen name="index" /> 
      
      {/* This is the new language screen route */}
      <Stack.Screen name="language" /> 

      {/* All other screens remain the same */}
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="onboarding1" />
      <Stack.Screen name="onboarding2" />
      <Stack.Screen name="onboarding3" />
      <Stack.Screen name="onboarding4" />
      <Stack.Screen name="features" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="account" />
    </Stack>
  );
}