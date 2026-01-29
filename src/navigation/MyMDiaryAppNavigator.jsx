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
import PNGIcon from '../components/MyMDiaryPNGIcon';
import { getResponsiveSize, isTablet } from '../utils/MyMDiaryResponsive';
import ProductScreen from '../screens/ProductScreen';
import { MainTabParamList, RootStackParamList, OnboardingStackParamList, RegistrationStackParamList } from '../types/MyMDiaryTypes';
import { storage } from '../utils/MyMDiaryStorage';
import { UserProfile } from '../types/MyMDiaryTypes';

// Onboarding screens
import Onboarding1Screen from '../screens/MyMDiaryOnboarding1Screen';
import Onboarding2Screen from '../screens/MyMDiaryOnboarding2Screen';
import Onboarding3Screen from '../screens/MyMDiaryOnboarding3Screen';

// Registration screens
import AvatarSelectionScreen from '../screens/MyMDiaryAvatarSelectionScreen';
import NameInputScreen from '../screens/MyMDiaryNameInputScreen';

// Main app screens
import HomeScreen from '../screens/MyMDiaryHomeScreen';
import CalendarScreen from '../screens/MyMDiaryCalendarScreen';
import DiaryScreen from '../screens/MyMDiaryDiaryScreen';
import ProfileScreen from '../screens/MyMDiaryProfileScreen';
import EditProfileScreen from '../screens/MyMDiaryEditProfileScreen';
import MoodSelectionScreen from '../screens/MyMDiaryMoodSelectionScreen';
import MoodAffirmationScreen from '../screens/MyMDiaryMoodAffirmationScreen';
import DiaryEntryScreen from '../screens/MyMDiaryDiaryEntryScreen';
import DiaryListScreen from '../screens/MyMDiaryDiaryListScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const OnboardingStack = createStackNavigator();
const RegistrationStack = createStackNavigator();
// libs
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import AppleAdsAttribution from '@vladikstyle/react-native-apple-ads-attribution';

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
          height: getResponsiveSize(80, 90, 100),
          paddingBottom: getResponsiveSize(15, 20, 25),
          borderTopLeftRadius: getResponsiveSize(25, 30, 35),
          borderTopRightRadius: getResponsiveSize(25, 30, 35),
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          shadowOpacity: 0,
          ...(isTablet() && {
            maxWidth: 600,
            alignSelf: 'center',
            left: 'auto',
            right: 'auto',
          }),
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
  {/**const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
  const [route, setRoute] = useState(false);
  //console.log('route===>', route)
  const [responseToPushPermition, setResponseToPushPermition] = useState(false);
  ////('Дозвіл на пуши прийнято? ===>', responseToPushPermition);
  const [uniqVisit, setUniqVisit] = useState(true);
  //console.log('uniqVisit===>', uniqVisit);
  const [addPartToLinkOnce, setAddPartToLinkOnce] = useState(true);
  //console.log('addPartToLinkOnce in App==>', addPartToLinkOnce);
  const [oneSignalId, setOneSignalId] = useState(null);
  //console.log('oneSignalId==>', oneSignalId);
  const [sab1, setSab1] = useState();
  const [atribParam, setAtribParam] = useState(null);
  console.log('atribParam==>', atribParam);
  console.log('sab1==>', sab1);
  const [adServicesAtribution, setAdServicesAtribution] = useState(null);
  const [isDataReady, setIsDataReady] = useState(false);
  const [completeLink, setCompleteLink] = useState(false);
  const [finalLink, setFinalLink] = useState('');
  const [pushOpenWebview, setPushOpenWebview] = useState(false);
  //console.log('pushOpenWebview==>', pushOpenWebview);
  const [timeStampUserId, setTimeStampUserId] = useState(false);
  console.log('timeStampUserId==>', timeStampUserId);
  const [checkAsaData, setCheckAsaData] = useState(null);
  const [cloacaPass, setCloacaPass] = useState(null);
  console.log('cloacaPass==>', cloacaPass);

  const INITIAL_URL = `https://prime-wave-base.site/`;
  const URL_IDENTIFAIRE = `vNILHBtc`;

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([checkUniqVisit(), getData()]); // Виконуються одночасно
      //onInstallConversionDataCanceller(); // Виклик до зміни isDataReady
      setIsDataReady(true); // Встановлюємо, що дані готові
    };

    fetchData();
  }, []); ///

  useEffect(() => {
    const finalizeProcess = async () => {
      if (isDataReady) {
        await generateLink(); // Викликати generateLink, коли всі дані готові
        console.log('Фінальна лінка сформована!');
      }
    };

    finalizeProcess();
  }, [isDataReady]);

  // uniq_visit
  const checkUniqVisit = async () => {
    const uniqVisitStatus = await AsyncStorage.getItem('uniqVisitStatus');
    let storedTimeStampUserId = await AsyncStorage.getItem('timeStampUserId');

    // додати діставання таймштампу з асінк сторідж

    if (!uniqVisitStatus) {
      // Генеруємо унікальний ID користувача з timestamp
      /////////////Timestamp + user_id generation
      const timestamp_user_id = `${new Date().getTime()}-${Math.floor(
        1000000 + Math.random() * 9000000,
      )}`;
      setTimeStampUserId(timestamp_user_id);
      console.log('timeStampUserId==========+>', timeStampUserId);

      // Зберігаємо таймштамп у AsyncStorage
      await AsyncStorage.setItem('timeStampUserId', timestamp_user_id);

      await fetch(
        `${INITIAL_URL}${URL_IDENTIFAIRE}?utretg=uniq_visit&jthrhg=${timestamp_user_id}`,
      );
      OneSignal.User.addTag('timestamp_user_id', timestamp_user_id);
      console.log('унікальний візит!!!');
      setUniqVisit(false);
      await AsyncStorage.setItem('uniqVisitStatus', 'sent');

      // додати збереження таймштампу в асінк сторідж
    } else {
      if (storedTimeStampUserId) {
        setTimeStampUserId(storedTimeStampUserId);
        console.log('Відновлений timeStampUserId:', storedTimeStampUserId);
      }
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('App');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('Дані дістаються в AsyncStorage');
        setRoute(parsedData.route);
        setResponseToPushPermition(parsedData.responseToPushPermition);
        setUniqVisit(parsedData.uniqVisit);
        setOneSignalId(parsedData.oneSignalId);
        setSab1(parsedData.sab1);
        setAtribParam(parsedData.atribParam);
        setAdServicesAtribution(parsedData.adServicesAtribution);
        setCheckAsaData(parsedData.checkAsaData);
        setCompleteLink(parsedData.completeLink);
        setFinalLink(parsedData.finalLink);
        setCloacaPass(parsedData.cloacaPass);
        await performAppsFlyerOperationsContinuously();
      } else {
        // Якщо дані не знайдені в AsyncStorage
        const results = await Promise.all([
          fetchAdServicesAttributionData(),
          requestOneSignallFoo(),
        ]);

        // Результати виконаних функцій
        console.log('Результати функцій:', results);
      }
    } catch (e) {
      //console.log('Помилка отримання даних в getData:', e);
    }
  };

  const setData = async () => {
    try {
      const data = {
        route,
        responseToPushPermition,
        uniqVisit,
        oneSignalId,
        sab1,
        atribParam,
        adServicesAtribution,
        finalLink,
        completeLink,
        checkAsaData,
        cloacaPass,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('App', jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  useEffect(() => {
    setData();
  }, [
    route,
    responseToPushPermition,
    uniqVisit,
    oneSignalId,
    sab1,
    atribParam,
    adServicesAtribution,
    finalLink,
    completeLink,
    checkAsaData,
    cloacaPass,
  ]);

  const fetchAdServicesAttributionData = async () => {
    try {
      const adServicesAttributionData =
        await AppleAdsAttribution.getAdServicesAttributionData();
      //console.log('adservices' + adServicesAttributionData);

      // Извлечение значений из объекта
      ({ attribution } = adServicesAttributionData); // Присваиваем значение переменной attribution
      ({ keywordId } = adServicesAttributionData);

      setAdServicesAtribution(attribution);

      setAtribParam(attribution ? 'asa' : '');
      setCheckAsaData(JSON.stringify(adServicesAttributionData));

      console.log(`Attribution: ${attribution}` + `KeywordId:${keywordId}`);
    } catch (error) {
      const { message } = error;
      //Alert.alert(message); // --> Some error message
    } finally {
      console.log('Attribution');
    }
  };

  ///////// OneSignall
  const requestPermission = () => {
    return new Promise((resolve, reject) => {
      try {
        OneSignal.Notifications.requestPermission(true).then(res => {
          setResponseToPushPermition(res);

          const maxRetries = 5; // Кількість повторних спроб
          let attempts = 0;

          const fetchOneSignalId = () => {
            OneSignal.User.getOnesignalId()
              .then(deviceState => {
                if (deviceState) {
                  setOneSignalId(deviceState);
                  resolve(deviceState); // Розв'язуємо проміс, коли отримано ID
                } else if (attempts < maxRetries) {
                  attempts++;
                  setTimeout(fetchOneSignalId, 1000); // Повторна спроба через 1 секунду
                } else {
                  reject(new Error('Failed to retrieve OneSignal ID'));
                }
              })
              .catch(error => {
                if (attempts < maxRetries) {
                  attempts++;
                  setTimeout(fetchOneSignalId, 1000);
                } else {
                  console.error('Error fetching OneSignal ID:', error);
                  reject(error);
                }
              });
          };

          fetchOneSignalId(); // Викликаємо першу спробу отримання ID
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  // Виклик асинхронної функції requestPermission() з використанням async/await
  const requestOneSignallFoo = async () => {
    try {
      await requestPermission();
      // Якщо все Ok
    } catch (error) {
      console.log('err в requestOneSignallFoo==> ', error);
    }
  };

  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal ініціалізація
  OneSignal.initialize('25be33e4-71d4-48be-a94e-0983a78f9928');
  //OneSignal.Debug.setLogLevel(OneSignal.LogLevel.Verbose);

  // Встановлюємо цей ID як OneSignal External ID
  useEffect(() => {
    if (timeStampUserId) {
      console.log(
        'OneSignal.login із таймштампом:',
        timeStampUserId,
        'полетів',
      );
      OneSignal.login(timeStampUserId);
    }
  }, [timeStampUserId]);

  // event push_open_browser & push_open_webview
  const pushOpenWebViewOnce = useRef(false); // Стан, щоб уникнути дублювання

  useEffect(() => {
    // Додаємо слухач подій
    const handleNotificationClick = async event => {
      if (pushOpenWebViewOnce.current) {
        // Уникаємо повторної відправки івента
        return;
      }

      let storedTimeStampUserId = await AsyncStorage.getItem('timeStampUserId');
      //console.log('storedTimeStampUserId', storedTimeStampUserId);

      // Виконуємо fetch тільки коли timeStampUserId є
      if (event.notification.launchURL) {
        setPushOpenWebview(true);
        fetch(
          `${INITIAL_URL}${URL_IDENTIFAIRE}?utretg=push_open_browser&jthrhg=${storedTimeStampUserId}`,
        );
        //console.log('Івент push_open_browser OneSignal');
        //console.log(
        //  `${INITIAL_URL}${URL_IDENTIFAIRE}?utretg=push_open_browser&jthrhg=${storedTimeStampUserId}`,
        //);
      } else {
        setPushOpenWebview(true);
        fetch(
          `${INITIAL_URL}${URL_IDENTIFAIRE}?utretg=push_open_webview&jthrhg=${storedTimeStampUserId}`,
        );
        //console.log('Івент push_open_webview OneSignal');
        //console.log(
        //  `${INITIAL_URL}${URL_IDENTIFAIRE}?utretg=push_open_webview&jthrhg=${storedTimeStampUserId}`,
        //);
      }

      pushOpenWebViewOnce.current = true; // Блокування повторного виконання
      setTimeout(() => {
        pushOpenWebViewOnce.current = false; // Зняття блокування через певний час
      }, 2500); // Затримка, щоб уникнути подвійного кліку
    };

    OneSignal.Notifications.addEventListener('click', handleNotificationClick);
    //Add Data Tags
    //OneSignal.User.addTag('timeStampUserId', timeStampUserId);

    return () => {
      // Видаляємо слухача подій при розмонтуванні
      OneSignal.Notifications.removeEventListener(
        'click',
        handleNotificationClick,
      );
    };
  }, []);

  ///////// Route useEff
  useEffect(() => {
    // чекаємо, поки прочитаємо AsyncStorage
    if (!isDataReady) return;

    // якщо вже є route або клоака вже проходила успішно – нічого не робимо
    if (route || cloacaPass) return;

    const checkUrl = `${INITIAL_URL}${URL_IDENTIFAIRE}`;
    //console.log('checkUrl==========+>', checkUrl);

    const targetData = new Date('2026-01-31T08:08:00'); //дата з якої поч працювати webView
    const currentData = new Date(); //текущая дата

    if (currentData <= targetData) {
      setRoute(false);
      return;
    }

    const fetchCloaca = async () => {
      try {
        const r = await fetch(checkUrl, {
          method: 'GET',
          headers: {
            'User-Agent':
              'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
          },
        });

        console.log('status по клоаке=++++++++++++=>', r.status);

        if (r.status !== 404) {
          setRoute(true);
          setCloacaPass(true); // 👈 збережеться в AsyncStorage через setData
        } else {
          setRoute(false);
        }
      } catch (e) {
        console.log('errar', e);
        setRoute(false);
      }
    };

    fetchCloaca();
  }, [isDataReady, route, cloacaPass]);

  ///////// Generate link
  const generateLink = async () => {
    try {
      console.log('Створення базової частини лінки');
      const baseUrl = [
        `${INITIAL_URL}${URL_IDENTIFAIRE}?${URL_IDENTIFAIRE}=1`,
        oneSignalId ? `oneSignalId=${oneSignalId}` : '',
        `jthrhg=${timeStampUserId}`,
      ]
        .filter(Boolean)
        .join('&');

      // Логіка обробки sab1
      let additionalParams = '';

      // Якщо sab1 undefined або пустий, встановлюємо subId1=atribParam
      additionalParams = `${
        atribParam ? `subId1=${atribParam}` : ''
      }&checkData=${checkAsaData}`;

      console.log('additionalParams====>', additionalParams);
      // Формування фінального лінку
      const product = `${baseUrl}&${additionalParams}${
        pushOpenWebview ? `&yhugh=${pushOpenWebview}` : ''
      }`;
      //(!addPartToLinkOnce ? `&yhugh=true` : ''); pushOpenWebview && '&yhugh=true'
      console.log('Фінальна лінка сформована');

      // Зберігаємо лінк в стейт
      setFinalLink(product);

      // Встановлюємо completeLink у true
      setTimeout(() => {
        setCompleteLink(true);
      }, 1000);
    } catch (error) {
      console.error('Помилка при формуванні лінку:', error);
    }
  };
  console.log('My product Url ==>', finalLink);

  ///////// Route
    const Route = ({ isFatch }) => {
      if (!completeLink) {
        // Показуємо тільки лоудери, поки acceptTransparency і completeLink не true
        return null;
      }
  
      if (isFatch) {
        return (
          <Stack.Navigator>
            <Stack.Screen
              initialParams={{
                responseToPushPermition,
                product: finalLink,
                timeStampUserId: timeStampUserId,
              }}
              name="ProductScreen"
              component={ProductScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        );
      }
      return (
        <Stack.Navigator
        //initialRouteName={getInitialRouteName()}
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

      {!isLoading ? (
        <View style={{ flex: 1, overflow: 'hidden' }}>
          {/* Контейнер шириною у 2 * screenWidth: два зображення поруч */}
          <Animated.View
            style={{
              flexDirection: 'row',
              width: screenWidth * 2,
              height: '100%',
              transform: [{ translateX: slideAnim }],
            }}
          >
            <Image
              style={{ width: screenWidth, height: '100%' }}
              source={require('../assets/img/1.png')}
              resizeMode="cover"
            />
            <Image
              style={{ width: screenWidth, height: '100%' }}
              source={require('../assets/img/2.png')}
              resizeMode="cover"
            />
          </Animated.View>
        </View>
      ) : (
          <Route isFatch={route} />
      )
      }

      
    </NavigationContainer>
  );
};

export default AppNavigator;



