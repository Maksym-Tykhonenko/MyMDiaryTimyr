import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../types';
import CloudBackground from '../components/CloudBackground';

type Onboarding2ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Onboarding2'>;

const Onboarding2Screen: React.FC = () => {
  const navigation = useNavigation<Onboarding2ScreenNavigationProp>();

  return (
    <CloudBackground>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/2.png')}
              style={styles.image}
            />
          </View>
          
          <View style={styles.textCard}>
            <Text style={styles.text}>
              Each flower whispers words of support to me.
            </Text>
            <Text style={styles.text}>
              What I need to hear today.
            </Text>
          </View>
          
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate('Onboarding3')}
          >
            <Text style={styles.nextButtonText}>Okay</Text>
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
    height: 300,
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

export default Onboarding2Screen;
