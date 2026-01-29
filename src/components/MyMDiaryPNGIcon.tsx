import React from 'react';
import { Image, StyleSheet, ImageStyle } from 'react-native';

interface PNGIconProps {
  source: any;
  size?: number;
  style?: ImageStyle;
  tintColor?: string;
}

const PNGIcon: React.FC<PNGIconProps> = ({ 
  source, 
  size = 24, 
  style, 
  tintColor 
}) => {
  return (
    <Image
      source={source}
      style={[
        styles.icon,
        { 
          width: size, 
          height: size,
          tintColor: tintColor 
        },
        style
      ]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    // Basic styles for icon
  },
});

export default PNGIcon;
