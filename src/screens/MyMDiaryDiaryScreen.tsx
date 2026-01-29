import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, DiaryEntry } from '../types/MyMDiaryTypes';
import { storage } from '../utils/MyMDiaryStorage';
import CloudBackground from '../components/MyMDiaryCloudBackground';
import AppHeader from '../components/MyMDiaryAppHeader';
import { getResponsivePadding } from '../utils/MyMDiaryResponsive';

type DiaryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const DiaryScreen: React.FC = () => {
  const navigation = useNavigation<DiaryScreenNavigationProp>();
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredEntries, setFilteredEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    loadDiaryEntries();
  }, []);

  useEffect(() => {
    filterEntries();
  }, [searchQuery, diaryEntries]);

  // Update entries list every time the screen gets focus
  useFocusEffect(
    React.useCallback(() => {
      loadDiaryEntries();
    }, [])
  );

  const loadDiaryEntries = async () => {
    try {
      const entries = await storage.getDiaryEntries();
      setDiaryEntries(entries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error('Error loading diary entries:', error);
    }
  };

  const filterEntries = () => {
    if (!searchQuery.trim()) {
      setFilteredEntries(diaryEntries);
    } else {
      const filtered = diaryEntries.filter(entry =>
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEntries(filtered);
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
    <View style={styles.entryCard}>
      <View style={styles.entryContent}>
        <Text style={styles.entryTitle}>{item.title}</Text>
        <Text style={styles.entryPreview} numberOfLines={3}>
          {item.content}
        </Text>
        <Text style={styles.entryDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.moreButton}
        onPress={() => navigation.navigate('DiaryEntry', { entry: item })}
      >
        <Text style={styles.moreButtonText}>More</Text>
      </TouchableOpacity>
    </View>
  );

  if (diaryEntries.length === 0) {
    return (
      <CloudBackground>
        <AppHeader title="Diary" />
        <View style={styles.container}>
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>You have no entries yet.</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('DiaryEntry', {})}
            >
              <Text style={styles.addButtonText}>Add entry</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CloudBackground>
    );
  }

  return (
    <CloudBackground>
      <AppHeader title="Diary" />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#666"
          />
        </View>

        <FlatList
          data={filteredEntries}
          renderItem={renderDiaryEntry}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.entriesList}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('DiaryEntry', {})}
        >
          <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>+</Text>
        </TouchableOpacity>
      </View>
    </CloudBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: getResponsivePadding(120, 140, 160), // Extra padding for navigation
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  entriesList: {
    paddingBottom: 100,
  },
  entryCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
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
  moreButton: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  moreButtonText: {
    color: '#4A90E2',
    fontSize: 12,
    fontWeight: 'bold',
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
  fab: {
    position: 'absolute',
    bottom: 130,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default DiaryScreen;



