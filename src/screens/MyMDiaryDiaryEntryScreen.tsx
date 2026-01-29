import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, DiaryEntry } from '../types/MyMDiaryTypes';
import { storage } from '../utils/MyMDiaryStorage';
import CloudBackground from '../components/MyMDiaryCloudBackground';
import AppHeader from '../components/MyMDiaryAppHeader';
import { getResponsivePadding } from '../utils/MyMDiaryResponsive';

type DiaryEntryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DiaryEntry'>;
type DiaryEntryScreenRouteProp = RouteProp<RootStackParamList, 'DiaryEntry'>;

const DiaryEntryScreen: React.FC = () => {
  const navigation = useNavigation<DiaryEntryScreenNavigationProp>();
  const route = useRoute<DiaryEntryScreenRouteProp>();
  const { entry } = route.params;

  const [title, setTitle] = useState<string>(entry?.title || '');
  const [content, setContent] = useState<string>(entry?.content || '');
  const [isEditing, setIsEditing] = useState<boolean>(!entry);

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
    }
  }, [entry]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Error', 'Please fill in both title and content.');
      return;
    }

    try {
      const diaryEntry: DiaryEntry = {
        id: entry?.id || Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        createdAt: entry?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await storage.saveDiaryEntry(diaryEntry);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save entry. Please try again.');
    }
  };

  const handleDelete = () => {
    if (!entry) return;

    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this diary entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await storage.deleteDiaryEntry(entry.id);
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete entry. Please try again.');
            }
          },
        },
      ]
    );
  };

  const handleShare = async () => {
    try {
      const { Share } = require('react-native');
      await Share.share({
        message: `${title}\n\n${content}`,
        title: 'My Diary Entry',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <CloudBackground>
      <AppHeader title={entry ? 'Diary Entry' : 'New Entry'} />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.titleInput}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              editable={isEditing}
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.contentInput}
              placeholder="Description"
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
              editable={isEditing}
              placeholderTextColor="#666"
            />
          </View>

          {entry && !isEditing && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => setIsEditing(true)}
              >
                <Text style={{color: 'white'}}>Edit</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleShare}
              >
                <Text style={{color: 'white'}}>Share</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={handleDelete}
              >
                <Text style={{color: 'white'}}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}

          {isEditing && (
            <View style={styles.editButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  if (entry) {
                    setIsEditing(false);
                    setTitle(entry.title);
                    setContent(entry.content);
                  } else {
                    navigation.goBack();
                  }
                }}
              >
                <Text style={{color: '#4A90E2', fontSize: 20, fontWeight: 'bold'}}>X</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
              >
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>✓</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </CloudBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: getResponsivePadding(120, 140, 160), // Extra padding for navigation
  },
  inputContainer: {
    marginBottom: 20,
  },
  titleInput: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    fontSize: 18,
    fontWeight: 'bold',
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
  contentInput: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    fontSize: 16,
    color: '#333',
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
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
  deleteButton: {
    backgroundColor: '#FF4444',
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  cancelButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4A90E2',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
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
});

export default DiaryEntryScreen;



