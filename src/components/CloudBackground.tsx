import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

interface CloudBackgroundProps {
  children: React.ReactNode;
  backgroundImage?: any;
}

const CloudBackground: React.FC<CloudBackgroundProps> = ({ 
  children, 
  backgroundImage = require('../assets/background.png') // Path to PNG background image
}) => {
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CloudBackground;



