import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { storage } from '../utils/MyMDiaryStorage';
import { UserProfile } from '../types/MyMDiaryTypes';
import { getResponsiveSize, getResponsivePadding, getResponsiveFontSize, isTablet } from '../utils/MyMDiaryResponsive';

interface AppHeaderProps {
  title?: string;
  showProfile?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ 
  title = "Welcome to, My Mood Flower Diary", 
  showProfile = true 
}) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const profile = await storage.getUserProfile();
      setUserProfile(profile);
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {showProfile && (
        <TouchableOpacity style={styles.profileContainer}>
          <Image
            source={{
              uri: userProfile?.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: getResponsivePadding(20, 30, 40),
    paddingVertical: getResponsivePadding(15, 20, 25),
    backgroundColor: '#4A90E2',
  },
  title: {
    color: 'white',
    fontSize: getResponsiveFontSize(16, 18, 20),
    fontWeight: 'bold',
    flex: 1,
  },
  profileContainer: {
    marginLeft: getResponsiveSize(10, 15, 20),
  },
  profileImage: {
    width: getResponsiveSize(40, 50, 60),
    height: getResponsiveSize(40, 50, 60),
    borderRadius: getResponsiveSize(20, 25, 30),
    borderWidth: 2,
    borderColor: 'white',
  },
});

export default AppHeader;



