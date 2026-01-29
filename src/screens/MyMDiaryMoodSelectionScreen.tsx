import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/MyMDiaryTypes';
import { moods } from '../data/MyMDiaryMoods';
import CloudBackground from '../components/MyMDiaryCloudBackground';
import AppHeader from '../components/MyMDiaryAppHeader';
import FlowerIcon from '../components/MyMDiaryFlowerIcon';
import { getResponsiveSize, getResponsivePadding, getResponsiveFontSize, isTablet } from '../utils/MyMDiaryResponsive';

type MoodSelectionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MoodSelection'>;
type MoodSelectionScreenRouteProp = RouteProp<RootStackParamList, 'MoodSelection'>;

const MoodSelectionScreen: React.FC = () => {
  const navigation = useNavigation<MoodSelectionScreenNavigationProp>();
  const route = useRoute<MoodSelectionScreenRouteProp>();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
  };

  const handleChoose = () => {
    if (selectedMood) {
      const mood = moods.find(m => m.id === selectedMood);
      if (mood) {
        navigation.navigate('MoodAffirmation', { mood });
      }
    }
  };

  return (
    <CloudBackground>
      <AppHeader title="Choose Your Mood" />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.moodsContainer}>
          {moods.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              style={[
                styles.moodCard,
                selectedMood === mood.id && styles.selectedMoodCard
              ]}
              onPress={() => handleMoodSelect(mood.id)}
            >
              <FlowerIcon color={mood.color} size={getResponsiveSize(80, 90, 100)} />
              <Text style={[styles.moodName, { color: mood.color }]}>
                {mood.name}
              </Text>
              <View style={styles.descriptionCard}>
                <Text style={styles.description}>{mood.description}</Text>
                <Text style={styles.symbol}>{mood.symbol}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {selectedMood && (
          <TouchableOpacity
            style={styles.chooseButton}
            onPress={handleChoose}
          >
            <Text style={styles.chooseButtonText}>Choose</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </CloudBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: getResponsivePadding(20, 30, 40),
    paddingBottom: getResponsivePadding(120, 140, 160), // Extra padding for navigation
  },
  moodsContainer: {
    gap: getResponsiveSize(20, 25, 30),
    ...(isTablet() && {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    }),
  },
  moodCard: {
    backgroundColor: 'white',
    borderRadius: getResponsiveSize(20, 25, 30),
    padding: getResponsivePadding(20, 25, 30),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    ...(isTablet() && {
      width: '45%',
      minWidth: 200,
    }),
  },
  selectedMoodCard: {
    borderWidth: 3,
    borderColor: '#4A90E2',
  },
  moodName: {
    fontSize: getResponsiveFontSize(20, 22, 24),
    fontWeight: 'bold',
    marginTop: getResponsiveSize(10, 12, 15),
    marginBottom: getResponsiveSize(15, 18, 20),
  },
  descriptionCard: {
    backgroundColor: '#87CEEB',
    borderRadius: getResponsiveSize(15, 18, 20),
    padding: getResponsivePadding(15, 18, 20),
    width: '100%',
  },
  description: {
    color: 'white',
    fontSize: getResponsiveFontSize(14, 16, 18),
    textAlign: 'center',
    marginBottom: getResponsiveSize(8, 10, 12),
  },
  symbol: {
    color: 'white',
    fontSize: getResponsiveFontSize(12, 14, 16),
    textAlign: 'center',
    fontStyle: 'italic',
  },
  chooseButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: getResponsivePadding(40, 50, 60),
    paddingVertical: getResponsivePadding(15, 18, 22),
    borderRadius: getResponsiveSize(25, 30, 35),
    marginTop: getResponsiveSize(20, 25, 30),
    alignSelf: 'center',
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

export default MoodSelectionScreen;



