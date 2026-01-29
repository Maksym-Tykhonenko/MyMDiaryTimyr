import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getContentContainerStyle, isTablet } from '../utils/MyMDiaryResponsive';

interface CloudBackgroundProps {
  children: React.ReactNode;
  backgroundImage?: any;
}

const CloudBackground: React.FC<CloudBackgroundProps> = ({ 
  children, 
  backgroundImage = require('../assets/background.png') // Path to PNG background image
}) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ImageBackground
        source={backgroundImage}
        style={styles.container}
        resizeMode="cover"
      >
        <View style={[styles.contentContainer, getContentContainerStyle()]}>
          {children}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});

export default CloudBackground;



