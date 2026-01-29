/**
 * My Mood Flower Diary
 * A gentle space for women to connect with their emotions
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/MyMDiaryAppNavigator';

function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      <AppNavigator />
    </>
  );
}

export default App;
