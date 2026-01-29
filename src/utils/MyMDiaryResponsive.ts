import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Определяем, является ли устройство планшетом
export const isTablet = () => {
  const pixelDensity = Platform.select({
    ios: width / 320, // Базовая ширина iPhone
    android: width / 360, // Базовая ширина Android
  }) || 1;
  
  return width >= 768 || (width >= 600 && pixelDensity >= 1.5);
};

// Определяем размер экрана
export const getScreenSize = () => {
  if (width >= 1024) return 'large'; // iPad Pro
  if (width >= 768) return 'medium'; // iPad
  if (width >= 414) return 'small'; // iPhone Plus/Max
  return 'xsmall'; // iPhone
};

// Адаптивные размеры
export const getResponsiveSize = (small: number, medium?: number, large?: number) => {
  const screenSize = getScreenSize();
  
  switch (screenSize) {
    case 'large':
      return large || medium || small * 1.5;
    case 'medium':
      return medium || small * 1.2;
    case 'small':
      return small * 1.1;
    default:
      return small;
  }
};

// Адаптивные отступы
export const getResponsivePadding = (small: number, medium?: number, large?: number) => {
  const screenSize = getScreenSize();
  
  switch (screenSize) {
    case 'large':
      return large || medium || small * 2;
    case 'medium':
      return medium || small * 1.5;
    case 'small':
      return small * 1.2;
    default:
      return small;
  }
};

// Адаптивные размеры шрифтов
export const getResponsiveFontSize = (small: number, medium?: number, large?: number) => {
  const screenSize = getScreenSize();
  
  switch (screenSize) {
    case 'large':
      return large || medium || small * 1.3;
    case 'medium':
      return medium || small * 1.15;
    case 'small':
      return small * 1.05;
    default:
      return small;
  }
};

// Максимальная ширина контента для планшетов
export const getMaxContentWidth = () => {
  if (isTablet()) {
    return Math.min(width * 0.8, 600); // Максимум 80% ширины экрана или 600px
  }
  return width;
};

// Центрирование контента для планшетов
export const getContentContainerStyle = () => {
  if (isTablet()) {
    return {
      maxWidth: getMaxContentWidth(),
      alignSelf: 'center' as const,
    };
  }
  return {};
};
