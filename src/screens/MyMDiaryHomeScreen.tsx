import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/MyMDiaryTypes';
import CloudBackground from '../components/MyMDiaryCloudBackground';
import AppHeader from '../components/MyMDiaryAppHeader';
import FlowerIcon from '../components/MyMDiaryFlowerIcon';
import { getResponsiveSize, getResponsivePadding, getResponsiveFontSize } from '../utils/MyMDiaryResponsive';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <CloudBackground>
      <AppHeader />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.content}>
          <View style={styles.moodCard}>
            <Text style={styles.moodTitle}>Choose your mood</Text>
            <TouchableOpacity
              style={styles.chooseButton}
              onPress={() => navigation.navigate('MoodSelection')}
            >
              <Text style={styles.chooseButtonText}>Choose</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </CloudBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: getResponsivePadding(20, 30, 40),
    paddingBottom: getResponsivePadding(120, 140, 160), // Extra padding for navigation
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400, // Ensure minimum height for centering
  },
  moodCard: {
    backgroundColor: 'white',
    borderRadius: getResponsiveSize(20, 25, 30),
    padding: getResponsivePadding(30, 40, 50),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  moodTitle: {
    fontSize: getResponsiveFontSize(24, 28, 32),
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: getResponsiveSize(20, 25, 30),
    textAlign: 'center',
  },
  chooseButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: getResponsivePadding(40, 50, 60),
    paddingVertical: getResponsivePadding(15, 18, 22),
    borderRadius: getResponsiveSize(25, 30, 35),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chooseButtonText: {
    color: 'white',
    fontSize: getResponsiveFontSize(18, 20, 22),
    fontWeight: 'bold',
  },
});

export default HomeScreen;



