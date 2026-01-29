import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RegistrationStackParamList } from '../types';
import CloudBackground from '../components/CloudBackground';
import { launchImageLibrary, ImagePickerResponse, MediaType } from 'react-native-image-picker';

type AvatarSelectionScreenNavigationProp = StackNavigationProp<RegistrationStackParamList, 'AvatarSelection'>;

const AvatarSelectionScreen: React.FC = () => {
  const navigation = useNavigation<AvatarSelectionScreenNavigationProp>();
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  const [selectedImageUri, setSelectedImageUri] = useState<string>('');

  const avatarOptions = [
    {
      id: '1',
      uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
      name: 'Marina'
    },
    {
      id: '2',
      uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      name: 'Sofia'
    },
    {
      id: '3',
      uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
      name: 'Anna'
    },
    {
      id: '4',
      uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
      name: 'Elena'
    }
  ];

  const handleAvatarSelect = (avatarId: string) => {
    setSelectedAvatar(avatarId);
    setSelectedImageUri(''); // Reset selected image
  };

  const handleGallerySelect = () => {
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
          setSelectedImageUri(asset.uri);
          setSelectedAvatar(''); // Reset selected avatar
        }
      }
    });
  };

  const handleNext = () => {
    if (!selectedAvatar && !selectedImageUri) {
      Alert.alert('Select Avatar', 'Please select an avatar or photo from gallery to continue');
      return;
    }
    navigation.navigate('NameInput', { selectedAvatarUri: getSelectedAvatarUri() });
  };

  const getSelectedAvatarUri = () => {
    if (selectedImageUri) {
      return selectedImageUri;
    }
    if (selectedAvatar) {
      const selectedOption = avatarOptions.find(option => option.id === selectedAvatar);
      return selectedOption?.uri || '';
    }
    return '';
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
            <View style={[styles.progressLine, styles.progressLineActive]} />
            <View style={styles.progressLine} />
          </View>

          <View style={styles.avatarContainer}>
            <Text style={styles.avatarTitle}>Select Avatar</Text>
            
            {/* Show selected image */}
            {getSelectedAvatarUri() && (
              <View style={styles.selectedImageContainer}>
                <Image source={{ uri: getSelectedAvatarUri() }} style={styles.selectedImage} />
                <Text style={styles.selectedImageText}>
                  {selectedImageUri ? 'Your Photo' : 'Selected Avatar'}
                </Text>
              </View>
            )}

            <View style={styles.avatarGrid}>
              
            </View>

            {/* Button to select from gallery */}
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={handleGallerySelect}
            >
              <Text style={styles.galleryButtonText}>📷 Choose from Gallery</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.disclaimer}>
            Important! We do not use your data, your data is only for you.
          </Text>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
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
  avatarContainer: {
    backgroundColor: '#87CEEB',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
  },
  avatarTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  avatarOption: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '45%',
  },
  avatarOptionSelected: {
    backgroundColor: 'white',
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  avatarName: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  disclaimer: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.8,
  },
  nextButton: {
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
  nextButtonText: {
    color: '#4A90E2',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'white',
    marginBottom: 8,
  },
  selectedImageText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  galleryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 15,
    alignSelf: 'center',
  },
  galleryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AvatarSelectionScreen;
