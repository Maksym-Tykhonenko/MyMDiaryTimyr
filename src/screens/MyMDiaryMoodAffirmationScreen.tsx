import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, MoodEntry } from '../types/MyMDiaryTypes';
import { storage } from '../utils/MyMDiaryStorage';
import CloudBackground from '../components/MyMDiaryCloudBackground';
import AppHeader from '../components/MyMDiaryAppHeader';
import FlowerIcon from '../components/MyMDiaryFlowerIcon';
import { getResponsivePadding } from '../utils/MyMDiaryResponsive';

type MoodAffirmationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MoodAffirmation'>;
type MoodAffirmationScreenRouteProp = RouteProp<RootStackParamList, 'MoodAffirmation'>;

const MoodAffirmationScreen: React.FC = () => {
  const navigation = useNavigation<MoodAffirmationScreenNavigationProp>();
  const route = useRoute<MoodAffirmationScreenRouteProp>();
  const { mood } = route.params;
  
  const [affirmation, setAffirmation] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    // Get random affirmation
    const randomAffirmation = mood.affirmations[Math.floor(Math.random() * mood.affirmations.length)];
    setAffirmation(randomAffirmation);
  }, [mood]);

  const handleSave = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const moodEntry: MoodEntry = {
        id: `${today}-${mood.id}`,
        date: today,
        mood,
        affirmation,
        createdAt: new Date().toISOString(),
      };

      await storage.saveMoodEntry(moodEntry);
      setIsSaved(true);
      
      Alert.alert(
        'Saved!',
        'Your mood has been saved to your calendar.',
        [{ 
          text: 'OK', 
          onPress: () => {
            // Return to main screen so user can navigate to calendar
            navigation.navigate('Main' as any);
          }
        }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save your mood. Please try again.');
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Today I'm feeling ${mood.name.toLowerCase()}: "${affirmation}"`,
        title: 'My Mood Flower Diary',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <CloudBackground>
      <AppHeader title="Today You" />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.todayText}>Today you</Text>
          
          <View style={styles.flowerContainer}>
            <FlowerIcon color={mood.color} size={100} />
            <Text style={[styles.moodName, { color: mood.color }]}>
              {mood.name}
            </Text>
          </View>

          <View style={styles.affirmationCard}>
            <Text style={styles.affirmationText}>{affirmation}</Text>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={handleShare}
            >
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.saveButton, isSaved && styles.savedButton]}
            onPress={handleSave}
            disabled={isSaved}
          >
            <Text style={styles.saveButtonText}>
              {isSaved ? 'Saved!' : 'Save to Calendar'}
            </Text>
          </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingBottom: getResponsivePadding(120, 140, 160), // Extra padding for navigation
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400, // Ensure minimum height for centering
  },
  todayText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 30,
  },
  flowerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  moodName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  affirmationCard: {
    backgroundColor: '#87CEEB',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    marginBottom: 30,
    position: 'relative',
  },
  affirmationText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  shareButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  shareButtonText: {
    color: '#4A90E2',
    fontSize: 12,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  savedButton: {
    backgroundColor: '#4CAF50',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MoodAffirmationScreen;



