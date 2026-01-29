import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface FlowerIconProps {
  color: string;
  size?: number;
}

const FlowerIcon: React.FC<FlowerIconProps> = ({ color, size = 60 }) => {
  // Determine which PNG file to use based on color
  const getFlowerSource = (color: string) => {
    switch (color.toLowerCase()) {
      case '#ff69b4':
      case '#ff1493':
      case '#dc143c':
      case 'pink':
        return require('../assets/blume/pink.png');
      case '#4a90e2':
      case '#0000ff':
      case '#4169e1':
      case 'blue':
        return require('../assets/blume/blue.png');
      case '#ffd700':
      case '#ffff00':
      case '#ffa500':
      case 'yellow':
      case 'gold':
        return require('../assets/blume/yellow.png');
      default:
        return require('../assets/blume/pink.png'); // fallback
    }
  };

  return (
    <Image
      source={getFlowerSource(color)}
      style={[styles.flower, { width: size, height: size }]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  flower: {
    // Styles for PNG flower image
  },
});

export default FlowerIcon;



