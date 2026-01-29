import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import CloudBackground from '../components/CloudBackground';
import AppHeader from '../components/AppHeader';
import FlowerIcon from '../components/FlowerIcon';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <CloudBackground>
      <AppHeader />
      <View style={styles.container}>
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
      </View>
    </CloudBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 100, // Padding for new navigation
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 20,
    textAlign: 'center',
  },
  chooseButton: {
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
  chooseButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;



