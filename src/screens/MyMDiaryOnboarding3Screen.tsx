import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList, RootStackParamList } from '../types/MyMDiaryTypes';
import CloudBackground from '../components/MyMDiaryCloudBackground';
import FlowerIcon from '../components/MyMDiaryFlowerIcon';

type Onboarding3ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Onboarding3'>;

const Onboarding3Screen: React.FC = () => {
  const navigation = useNavigation<Onboarding3ScreenNavigationProp>();

  return (
    <CloudBackground>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.flowersContainer}>
           <Image source={require('../assets/logo.png')} style={{width: 300, height: 300}} />
          </View>
          
          <View style={styles.textCard}>
            <Text style={styles.text}>
              I keep my days, feelings and flower moods.
            </Text>
            <Text style={styles.text}>
              This is my space of flowering.
            </Text>
          </View>
          
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate('Registration' as any)}
          >
            <Text style={styles.nextButtonText}>Start</Text>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flowersContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  flowerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    gap: 40,
  },
  textCard: {
    backgroundColor: '#87CEEB',
    borderRadius: 20,
    padding: 25,
    marginBottom: 40,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 8,
  },
  nextButton: {
    backgroundColor: 'white',
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
  nextButtonText: {
    color: '#4A90E2',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Onboarding3Screen;
