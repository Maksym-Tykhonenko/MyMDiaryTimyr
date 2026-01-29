import AsyncStorage from '@react-native-async-storage/async-storage';
import { MoodEntry, DiaryEntry, UserProfile } from '../types/MyMDiaryTypes';

const MOOD_ENTRIES_KEY = 'mood_entries';
const DIARY_ENTRIES_KEY = 'diary_entries';
const USER_PROFILE_KEY = 'user_profile';

export const storage = {
  // Mood entries
  async getMoodEntries(): Promise<MoodEntry[]> {
    try {
      const data = await AsyncStorage.getItem(MOOD_ENTRIES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting mood entries:', error);
      return [];
    }
  },

  async saveMoodEntry(entry: MoodEntry): Promise<void> {
    try {
      const entries = await this.getMoodEntries();
      const existingIndex = entries.findIndex(e => e.date === entry.date);
      
      if (existingIndex >= 0) {
        entries[existingIndex] = entry;
        console.log('Updated existing mood entry for date:', entry.date);
      } else {
        entries.push(entry);
        console.log('Added new mood entry for date:', entry.date);
      }
      
      await AsyncStorage.setItem(MOOD_ENTRIES_KEY, JSON.stringify(entries));
      console.log('Mood entry saved successfully. Total entries:', entries.length);
    } catch (error) {
      console.error('Error saving mood entry:', error);
    }
  },

  async getMoodEntryByDate(date: string): Promise<MoodEntry | null> {
    try {
      const entries = await this.getMoodEntries();
      return entries.find(entry => entry.date === date) || null;
    } catch (error) {
      console.error('Error getting mood entry by date:', error);
      return null;
    }
  },

  // Diary entries
  async getDiaryEntries(): Promise<DiaryEntry[]> {
    try {
      const data = await AsyncStorage.getItem(DIARY_ENTRIES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting diary entries:', error);
      return [];
    }
  },

  async saveDiaryEntry(entry: DiaryEntry): Promise<void> {
    try {
      const entries = await this.getDiaryEntries();
      const existingIndex = entries.findIndex(e => e.id === entry.id);
      
      if (existingIndex >= 0) {
        entries[existingIndex] = { ...entry, updatedAt: new Date().toISOString() };
        console.log('Updated existing diary entry:', entry.id);
      } else {
        entries.push(entry);
        console.log('Added new diary entry:', entry.id);
      }
      
      await AsyncStorage.setItem(DIARY_ENTRIES_KEY, JSON.stringify(entries));
      console.log('Diary entry saved successfully. Total entries:', entries.length);
    } catch (error) {
      console.error('Error saving diary entry:', error);
    }
  },

  async deleteDiaryEntry(id: string): Promise<void> {
    try {
      const entries = await this.getDiaryEntries();
      const filteredEntries = entries.filter(entry => entry.id !== id);
      await AsyncStorage.setItem(DIARY_ENTRIES_KEY, JSON.stringify(filteredEntries));
    } catch (error) {
      console.error('Error deleting diary entry:', error);
    }
  },

  // User profile
  async getUserProfile(): Promise<UserProfile | null> {
    try {
      const data = await AsyncStorage.getItem(USER_PROFILE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  },

  async saveUserProfile(profile: UserProfile): Promise<void> {
    try {
      await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  },

  async clearUserProfile(): Promise<void> {
    try {
      await AsyncStorage.removeItem(USER_PROFILE_KEY);
    } catch (error) {
      console.error('Error clearing user profile:', error);
    }
  }
};



