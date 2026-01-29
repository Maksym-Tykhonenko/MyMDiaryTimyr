import { Dimensions, Platform } from 'react-native';
import { getResponsiveSize, isTablet } from './MyMDiaryResponsive';

const { width, height } = Dimensions.get('window');

// Оптимизации специально для iPad
export const getTabletOptimizations = () => {
  if (!isTablet()) return {};

  return {
    // Максимальная ширина контента для iPad
    maxContentWidth: Math.min(width * 0.7, 800),
    
    // Центрирование контента
    contentCentering: {
      alignSelf: 'center' as const,
      maxWidth: Math.min(width * 0.7, 800),
    },
    
    // Адаптивные отступы для iPad
    tabletPadding: {
      horizontal: getResponsiveSize(40, 60, 80),
      vertical: getResponsiveSize(30, 40, 50),
    },
    
    // Размеры для карточек на iPad
    cardSizes: {
      small: getResponsiveSize(120, 140, 160),
      medium: getResponsiveSize(160, 180, 200),
      large: getResponsiveSize(200, 220, 240),
    },
    
    // Адаптивные размеры шрифтов для iPad
    fontSizes: {
      small: getResponsiveSize(12, 14, 16),
      medium: getResponsiveSize(16, 18, 20),
      large: getResponsiveSize(20, 24, 28),
      xlarge: getResponsiveSize(24, 28, 32),
    },
    
    // Отступы между элементами
    spacing: {
      small: getResponsiveSize(8, 12, 16),
      medium: getResponsiveSize(16, 20, 24),
      large: getResponsiveSize(24, 30, 36),
      xlarge: getResponsiveSize(32, 40, 48),
    },
  };
};

// Стили для сетки на iPad
export const getTabletGridStyles = (columns: number = 2) => {
  if (!isTablet()) return {};

  const tabletOpts = getTabletOptimizations();
  const cardWidth = (tabletOpts.maxContentWidth - tabletOpts.spacing.medium * (columns - 1)) / columns;

  return {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
    width: '100%',
    maxWidth: tabletOpts.maxContentWidth,
    alignSelf: 'center' as const,
    cardWidth: Math.max(cardWidth, 200), // Минимальная ширина карточки
  };
};

// Адаптивные стили для кнопок на iPad
export const getTabletButtonStyles = () => {
  if (!isTablet()) return {};

  return {
    minHeight: getResponsiveSize(44, 50, 56), // Минимальная высота для удобного нажатия
    minWidth: getResponsiveSize(120, 140, 160),
    paddingHorizontal: getResponsiveSize(24, 32, 40),
    paddingVertical: getResponsiveSize(12, 16, 20),
  };
};

// Стили для модальных окон на iPad
export const getTabletModalStyles = () => {
  if (!isTablet()) return {};

  return {
    maxWidth: Math.min(width * 0.8, 600),
    maxHeight: Math.min(height * 0.8, 700),
    alignSelf: 'center' as const,
    marginHorizontal: 'auto' as const,
  };
};
