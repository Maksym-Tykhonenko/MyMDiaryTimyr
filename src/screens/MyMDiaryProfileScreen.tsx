import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Share, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/MyMDiaryTypes';
import CloudBackground from '../components/MyMDiaryCloudBackground';
import AppHeader from '../components/MyMDiaryAppHeader';
import { storage } from '../utils/MyMDiaryStorage';
import { UserProfile } from '../types/MyMDiaryTypes';
import { getResponsiveSize, getResponsivePadding, getResponsiveFontSize, isTablet } from '../utils/MyMDiaryResponsive';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadUserProfile();
  }, []);

  // Update profile every time the screen gets focus
  useFocusEffect(
    React.useCallback(() => {
      loadUserProfile();
    }, [])
  );

  const loadUserProfile = async () => {
    try {
      const profile = await storage.getUserProfile();
      setUserProfile(profile);
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const handleEdit = () => {
    navigation.navigate('EditProfile' as any);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out My Mood Flower Diary - a gentle space for women to connect with their emotions and track their daily moods!',
        title: 'My Mood Flower Diary',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <CloudBackground>
      <AppHeader title="Profile" />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileSection}>
          <View style={styles.profileCard}>
            <Image
              source={{
                uri: userProfile?.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face'
              }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.nameButton}>
              <Text style={styles.nameText}>{userProfile?.name || 'Marina'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.aboutSection}>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutTitle}>About the app</Text>
            <Text style={styles.aboutText}>
              My Mood Flower Diary is a gentle space for women, where every day blossoms with a new mood. 
              Choose your flower, receive words of support, and save your thoughts in a diary that grows with you.
            </Text>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Text style={styles.shareButtonText}>Share</Text>
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
    paddingHorizontal: getResponsivePadding(20, 30, 40),
    paddingBottom: getResponsivePadding(120, 140, 160), // Extra padding for navigation
  },
  profileSection: {
    marginTop: getResponsiveSize(20, 30, 40),
    marginBottom: getResponsiveSize(30, 40, 50),
  },
  profileCard: {
    backgroundColor: '#87CEEB',
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
  profileImage: {
    width: getResponsiveSize(100, 120, 140),
    height: getResponsiveSize(100, 120, 140),
    borderRadius: getResponsiveSize(50, 60, 70),
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: getResponsiveSize(20, 25, 30),
  },
  nameButton: {
    backgroundColor: 'white',
    paddingHorizontal: getResponsivePadding(30, 40, 50),
    paddingVertical: getResponsivePadding(12, 15, 18),
    borderRadius: getResponsiveSize(20, 25, 30),
    marginBottom: getResponsiveSize(10, 12, 15),
  },
  nameText: {
    color: '#4A90E2',
    fontSize: getResponsiveFontSize(18, 20, 22),
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'white',
    paddingHorizontal: getResponsivePadding(20, 25, 30),
    paddingVertical: getResponsivePadding(8, 10, 12),
    borderRadius: getResponsiveSize(15, 18, 20),
    alignSelf: 'flex-end',
  },
  editButtonText: {
    color: '#4A90E2',
    fontSize: getResponsiveFontSize(14, 16, 18),
    fontWeight: 'bold',
  },
  aboutSection: {
    flex: 1,
  },
  aboutCard: {
    backgroundColor: '#87CEEB',
    borderRadius: getResponsiveSize(20, 25, 30),
    padding: getResponsivePadding(25, 30, 35),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  aboutTitle: {
    color: 'white',
    fontSize: getResponsiveFontSize(18, 20, 22),
    fontWeight: 'bold',
    marginBottom: getResponsiveSize(15, 18, 20),
  },
  aboutText: {
    color: 'white',
    fontSize: getResponsiveFontSize(14, 16, 18),
    lineHeight: getResponsiveSize(22, 24, 26),
    marginBottom: getResponsiveSize(20, 25, 30),
  },
  shareButton: {
    backgroundColor: 'white',
    paddingHorizontal: getResponsivePadding(20, 25, 30),
    paddingVertical: getResponsivePadding(10, 12, 15),
    borderRadius: getResponsiveSize(15, 18, 20),
    alignSelf: 'flex-end',
  },
  shareButtonText: {
    color: '#4A90E2',
    fontSize: getResponsiveFontSize(14, 16, 18),
    fontWeight: 'bold',
  },
});

export default ProfileScreen;



