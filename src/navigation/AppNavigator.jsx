import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Dimensions,
  View,
  Image,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PNGIcon from '../components/PNGIcon';

//import { MainTabParamList, RootStackParamList, OnboardingStackParamList, RegistrationStackParamList } from '../types';
//import { storage } from '../utils/storage';
import { UserProfile } from '../types';

// Onboarding screens
import Onboarding1Screen from '../screens/Onboarding1Screen';
import Onboarding2Screen from '../screens/Onboarding2Screen';
import Onboarding3Screen from '../screens/Onboarding3Screen';

// Registration screens
import AvatarSelectionScreen from '../screens/AvatarSelectionScreen';
import NameInputScreen from '../screens/NameInputScreen';

// Main app screens
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import DiaryScreen from '../screens/DiaryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import MoodSelectionScreen from '../screens/MoodSelectionScreen';
import MoodAffirmationScreen from '../screens/MoodAffirmationScreen';
import DiaryEntryScreen from '../screens/DiaryEntryScreen';
import DiaryListScreen from '../screens/DiaryListScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const OnboardingStack = createStackNavigator();
const RegistrationStack = createStackNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = require('../assets/icons/home.png');
          } else if (route.name === 'Calendar') {
            iconSource = require('../assets/icons/calendar.png');
          } else if (route.name === 'Diary') {
            iconSource = require('../assets/icons/diary.png');
          } else if (route.name === 'Profile') {
            iconSource = require('../assets/icons/profile.png');
          } else {
            iconSource = require('../assets/icons/home.png'); // fallback
          }

          return (
            <View style={{ alignItems: 'center' }}>
              <PNGIcon source={iconSource} size={size} tintColor={color} />
              {focused && (
                <View style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#77B0E0',
                  marginTop: 4,
                }} />
              )}
            </View>
          );
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#B0C4DE',
        tabBarStyle: {
          backgroundColor: '#77B0E0',
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 15,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerStyle: {
          backgroundColor: '#4A90E2',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="Calendar" 
        component={CalendarScreen} 
        options={{ title: 'Calendar' }}
      />
      <Tab.Screen 
        name="Diary" 
        component={DiaryScreen} 
        options={{ title: 'Diary' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

const OnboardingNavigator = () => {
  return (
    <OnboardingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <OnboardingStack.Screen name="Onboarding1" component={Onboarding1Screen} />
      <OnboardingStack.Screen name="Onboarding2" component={Onboarding2Screen} />
      <OnboardingStack.Screen name="Onboarding3" component={Onboarding3Screen} />
    </OnboardingStack.Navigator>
  );
};

const RegistrationNavigator = () => {
  return (
    <RegistrationStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RegistrationStack.Screen name="AvatarSelection" component={AvatarSelectionScreen} />
      <RegistrationStack.Screen name="NameInput" component={NameInputScreen} />
    </RegistrationStack.Navigator>
  );
};

const AppNavigator = () => {
  //const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  //const [isLoading, setIsLoading] = useState(true);
{/**useEffect(() => {
    checkUserProfile();
  }, []);

  const checkUserProfile = async () => {
    try {
      const profile = await storage.getUserProfile();
      setUserProfile(profile);
    } catch (error) {
      console.error('Error checking user profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // Can add loading screen
  }

  const getInitialRouteName = () => {
    if (!userProfile) {
      return 'Onboarding';
    }
    return 'Main';
  }; */}
  //initialRouteName={getInitialRouteName()}

  ///////// Route
  const Route = ({ isFatch }) => {
    //if (!completeLink) {
    //  // Показуємо тільки лоудери, поки acceptTransparency і completeLink не true
    //  return null;
    //}

    if (isFatch) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            initialParams={{
              //responseToPushPermition,
              //product: finalLink,
              //timeStampUserId: timeStampUserId,
            }}
            name="ProductScreen"
            component={ProductScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      );
    }
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="CollectingBraziloMomentsOnboard"
          component={CollectingBraziloMomentsOnboard}
        />
        <Stack.Screen
          name="CollectingBraziloMomentsTabs"
          component={CollectingBraziloMomentsTabs}
        />
        <Stack.Screen
          name="CollectingBraziloMomentsLocationsDet"
          component={CollectingBraziloMomentsLocationsDet}
        />
        <Stack.Screen
          name="CollectingBraziloMomentsQuiz"
          component={CollectingBraziloMomentsQuiz}
        />
      </Stack.Navigator>
    );
  };

  ///////// Loader
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 2500);
  }, []);

  // Animation state
  const screenWidth = Dimensions.get('window').width;
  const slideAnim = useRef(new Animated.Value(0)).current; // 0 .. -screenWidth

  useEffect(() => {
    // запускаємо анімацію тільки коли компонент лоудера показаний
    if (!isLoading) {
      // Слайд від 0 до -screenWidth за 6 секунд
      Animated.timing(slideAnim, {
        toValue: -screenWidth,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        // по завершенні анімації показуємо основний контент
        //setisLoading(true);
      });
    }
  }, [slideAnim, screenWidth, isLoading]);

  return (
    <NavigationContainer>
      
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#4A90E2',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Onboarding"
            component={OnboardingNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Registration"
            component={RegistrationNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MoodSelection"
            component={MoodSelectionScreen}
            options={{ title: 'Choose Your Mood' }}
          />
          <Stack.Screen
            name="MoodAffirmation"
            component={MoodAffirmationScreen}
            options={{ title: 'Today You' }}
          />
          <Stack.Screen
            name="DiaryEntry"
            component={DiaryEntryScreen}
            options={{ title: 'Diary Entry' }}
          />
          <Stack.Screen
            name="DiaryList"
            component={DiaryListScreen}
            options={{ title: 'My Diary' }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{ title: 'Edit Profile' }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;



