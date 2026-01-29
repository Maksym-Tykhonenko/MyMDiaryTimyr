import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/MyMDiaryTypes';
import { storage } from '../utils/MyMDiaryStorage';
import { UserProfile } from '../types/MyMDiaryTypes';
import CloudBackground from '../components/MyMDiaryCloudBackground';
import AppHeader from '../components/MyMDiaryAppHeader';
import { launchImageLibrary, ImagePickerResponse, MediaType } from 'react-native-image-picker';
import { getResponsivePadding } from '../utils/MyMDiaryResponsive';

type EditProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<EditProfileScreenNavigationProp>();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const profile = await storage.getUserProfile();
      if (profile) {
        setUserProfile(profile);
        setName(profile.name);
        setAvatar(profile.avatar);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const handleAvatarSelect = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', 'Failed to select image');
      } else if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        if (asset.uri) {
          setAvatar(asset.uri);
        }
      }
    });
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a name');
      return;
    }

    try {
      const updatedProfile: UserProfile = {
        name: name.trim(),
        avatar: avatar,
        hasCompletedOnboarding: true,
      };

      await storage.saveUserProfile(updatedProfile);
      Alert.alert('Success', 'Profile updated', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  return (
    <CloudBackground>
      <AppHeader title="Edit Profile" />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.content}>
          <View style={styles.avatarSection}>
            <Text style={styles.sectionTitle}>Avatar</Text>
            <TouchableOpacity style={styles.avatarContainer} onPress={handleAvatarSelect}>
              <Image
                source={{ uri: avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face' }}
                style={styles.avatarImage}
              />
              <View style={styles.avatarOverlay}>
                <Text style={styles.avatarOverlayText}>📷</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.avatarHint}>Tap to change photo</Text>
          </View>

          <View style={styles.nameSection}>
            <Text style={styles.sectionTitle}>Name</Text>
            <TextInput
              style={styles.nameInput}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
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
    paddingHorizontal: 20,
    paddingBottom: getResponsivePadding(120, 140, 160), // Extra padding for navigation
  },
  content: {
    flex: 1,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 15,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'white',
  },
  avatarOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4A90E2',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  avatarOverlayText: {
    fontSize: 16,
  },
  avatarHint: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
  nameSection: {
    marginBottom: 40,
  },
  nameInput: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#4A90E2',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    borderRadius: 25,
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
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
