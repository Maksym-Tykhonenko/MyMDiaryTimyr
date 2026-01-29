import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, DiaryEntry } from '../types/MyMDiaryTypes';
import { storage } from '../utils/MyMDiaryStorage';
import CloudBackground from '../components/MyMDiaryCloudBackground';
import AppHeader from '../components/MyMDiaryAppHeader';
import { getResponsivePadding } from '../utils/MyMDiaryResponsive';

type DiaryListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DiaryList'>;

const DiaryListScreen: React.FC = () => {
  const navigation = useNavigation<DiaryListScreenNavigationProp>();
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    loadDiaryEntries();
  }, []);

  const loadDiaryEntries = async () => {
    try {
      const entries = await storage.getDiaryEntries();
      setDiaryEntries(entries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error('Error loading diary entries:', error);
    }
  };

  const handleDeleteEntry = async (id: string) => {
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
              await storage.deleteDiaryEntry(id);
              await loadDiaryEntries();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete entry. Please try again.');
            }
          },
        },
      ]
    );
  };

  const renderDiaryEntry = ({ item }: { item: DiaryEntry }) => (
    <TouchableOpacity
      style={styles.entryCard}
      onPress={() => navigation.navigate('DiaryEntry', { entry: item })}
    >
      <View style={styles.entryContent}>
        <Text style={styles.entryTitle}>{item.title}</Text>
        <Text style={styles.entryPreview} numberOfLines={3}>
          {item.content}
        </Text>
        <Text style={styles.entryDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <CloudBackground>
      <AppHeader title="My Diary" />
      <View style={styles.container}>
        {diaryEntries.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>You have no diary entries yet.</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('DiaryEntry', {})}
            >
              <Text style={styles.addButtonText}>Add your first entry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={diaryEntries}
            renderItem={renderDiaryEntry}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.entriesList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </CloudBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  entriesList: {
    paddingVertical: 20,
    paddingBottom: getResponsivePadding(120, 140, 160), // Extra padding for navigation
  },
  entryCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  entryContent: {
    flex: 1,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 8,
  },
  entryPreview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  entryDate: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  addButton: {
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
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DiaryListScreen;



