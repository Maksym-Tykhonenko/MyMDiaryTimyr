import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useFocusEffect } from '@react-navigation/native';
import { MoodEntry } from '../types/MyMDiaryTypes';
import { storage } from '../utils/MyMDiaryStorage';
import CloudBackground from '../components/MyMDiaryCloudBackground';
import AppHeader from '../components/MyMDiaryAppHeader';
import FlowerIcon from '../components/MyMDiaryFlowerIcon';
import { getResponsivePadding } from '../utils/MyMDiaryResponsive';

const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [markedDates, setMarkedDates] = useState<{[key: string]: any}>({});

  useEffect(() => {
    loadMoodEntries();
  }, []);

  // Update calendar every time the screen gets focus
  useFocusEffect(
    React.useCallback(() => {
      loadMoodEntries();
    }, [])
  );

  const loadMoodEntries = async () => {
    try {
      const entries = await storage.getMoodEntries();
      console.log('Loaded mood entries:', entries.length);
      console.log('Today is:', new Date().toISOString().split('T')[0]);
      console.log('Entries for today:', entries.filter(e => e.date === new Date().toISOString().split('T')[0]));
      
      setMoodEntries(entries);
      
      // Create marked dates for calendar
      const marked: {[key: string]: any} = {};
      entries.forEach(entry => {
        marked[entry.date] = {
          marked: true,
          dotColor: entry.mood.color,
          selectedColor: entry.mood.color,
        };
      });
      setMarkedDates(marked);
    } catch (error) {
      console.error('Error loading mood entries:', error);
    }
  };

  const onDayPress = (day: any) => {
    const date = day.dateString;
    setSelectedDate(date);
  };

  const getSelectedDateEntry = (): MoodEntry | null => {
    return moodEntries.find(entry => entry.date === selectedDate) || null;
  };

  const selectedEntry = getSelectedDateEntry();

  return (
    <CloudBackground>
      <AppHeader title="Calendar" />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Calendar
          onDayPress={onDayPress}
          markedDates={{
            ...markedDates,
            [selectedDate]: {
              ...markedDates[selectedDate],
              selected: true,
              selectedColor: '#4A90E2',
            },
          }}
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: 'transparent',
            textSectionTitleColor: '#4A90E2',
            selectedDayBackgroundColor: '#4A90E2',
            selectedDayTextColor: 'white',
            todayTextColor: '#4A90E2',
            dayTextColor: '#4A90E2',
            textDisabledColor: '#d9e1e8',
            dotColor: '#4A90E2',
            selectedDotColor: 'white',
            arrowColor: '#4A90E2',
            monthTextColor: '#4A90E2',
            indicatorColor: '#4A90E2',
            textDayFontWeight: '500',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '500',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
          style={styles.calendar}
        />

        <View style={styles.selectedDateContainer}>
          {selectedDate ? (
            selectedEntry ? (
              <View style={styles.moodEntryCard}>
                <View style={styles.moodInfo}>
                  <FlowerIcon color={selectedEntry.mood.color} size={50} />
                  <View style={styles.moodDetails}>
                    <Text style={[styles.moodName, { color: selectedEntry.mood.color }]}>
                      {selectedEntry.mood.name}
                    </Text>
                    <Text style={styles.affirmation}>
                      {selectedEntry.affirmation}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.noEntryCard}>
                <Text style={styles.noEntryText}>
                  You had no activities on this day.
                </Text>
              </View>
            )
          ) : (
            <View style={styles.placeholderCard}>
              <Text style={styles.placeholderText}>
                Select a date to view your mood
              </Text>
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
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: getResponsivePadding(120, 140, 160), // Extra padding for navigation
  },
  calendar: {
    borderRadius: 20,
    marginVertical: 20,
  },
  selectedDateContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  moodEntryCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  moodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodDetails: {
    flex: 1,
    marginLeft: 15,
  },
  moodName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  affirmation: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  noEntryCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
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
  noEntryText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  placeholderCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
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
  placeholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default CalendarScreen;



