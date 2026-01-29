import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../types';
import CloudBackground from '../components/CloudBackground';

type Onboarding1ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Onboarding1'>;

const Onboarding1Screen: React.FC = () => {
  const navigation = useNavigation<Onboarding1ScreenNavigationProp>();

  return (
    <CloudBackground>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image
              source={
                require('../assets/1.png')
              }
              style={styles.image}
            />
          </View>
          
          <View style={styles.textCard}>
            <Text style={styles.text}>
              Every morning I choose who I am today.
            </Text>
            <Text style={styles.text}>
              The flower of my mood speaks for me.
            </Text>
          </View>
          
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate('Onboarding2')}
          >
            <Text style={styles.nextButtonText}>Next</Text>
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
  imageContainer: {
    marginBottom: 40,
  },
  image: {
    width: 220,
    height: 320,
    // borderRadius: 20,
    // borderWidth: 3,
    // borderColor: 'white',
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

export default Onboarding1Screen;
