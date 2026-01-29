import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RegistrationStackParamList } from '../types/MyMDiaryTypes';
import CloudBackground from '../components/MyMDiaryCloudBackground';
import { storage } from '../utils/MyMDiaryStorage';

type NameInputScreenNavigationProp = StackNavigationProp<RegistrationStackParamList, 'NameInput'>;
type NameInputScreenRouteProp = RouteProp<RegistrationStackParamList, 'NameInput'>;

const NameInputScreen: React.FC = () => {
  const navigation = useNavigation<NameInputScreenNavigationProp>();
  const route = useRoute<NameInputScreenRouteProp>();
  const { selectedAvatarUri } = route.params;
  const [name, setName] = useState<string>('');

  const handleDone = async () => {
    if (!name.trim()) {
      Alert.alert('Enter Name', 'Please enter your name to continue');
      return;
    }

    try {
      // Save user profile
      const userProfile = {
        name: name.trim(),
        avatar: selectedAvatarUri || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face', // Use selected image or default
        hasCompletedOnboarding: true,
      };

      await storage.saveUserProfile(userProfile);
      
      // Navigate to main app
      navigation.navigate('Main' as any);
    } catch (error) {
      Alert.alert('Error', 'Failed to save data. Please try again.');
    }
  };

  return (
    <CloudBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.flowersContainer}>
              <View style={[styles.smallFlower, { backgroundColor: '#FF69B4' }]} />
              <View style={[styles.smallFlower, { backgroundColor: '#4A90E2' }]} />
              <View style={[styles.smallFlower, { backgroundColor: '#FFD700' }]} />
            </View>
            <Text style={styles.logoText}>My Mood Flower Diary</Text>
          </View>
          <View style={styles.registrationButton}>
            <Text style={styles.registrationText}>Registration</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.progressContainer}>
            <View style={styles.progressLine} />
            <View style={[styles.progressLine, styles.progressLineActive]} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Enter Your Name</Text>
            <TextInput
              style={styles.nameInput}
              placeholder="Name"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#999"
              autoCapitalize="words"
            />
          </View>

          <Text style={styles.disclaimer}>
            Important! We do not use your data, your data is only for you.
          </Text>

          <TouchableOpacity
            style={styles.doneButton}
            onPress={handleDone}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CloudBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  flowersContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 5,
  },
  smallFlower: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  registrationButton: {
    backgroundColor: '#87CEEB',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
  },
  registrationText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    gap: 10,
  },
  progressLine: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  progressLineActive: {
    backgroundColor: 'white',
  },
  inputContainer: {
    backgroundColor: '#87CEEB',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
  },
  inputTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  nameInput: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    fontSize: 16,
    color: '#333',
  },
  disclaimer: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.8,
  },
  doneButton: {
    backgroundColor: 'white',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
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
  doneButtonText: {
    color: '#4A90E2',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NameInputScreen;
