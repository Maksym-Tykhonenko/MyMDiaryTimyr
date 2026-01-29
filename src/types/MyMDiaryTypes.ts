export interface Mood {
  id: string;
  name: string;
  color: string;
  description: string;
  symbol: string;
  affirmations: string[];
}

export interface MoodEntry {
  id: string;
  date: string;
  mood: Mood;
  affirmation: string;
  createdAt: string;
}

export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
  hasCompletedOnboarding: boolean;
}

export type RootStackParamList = {
  Onboarding: undefined;
  Registration: undefined;
  Main: undefined;
  MoodSelection: undefined;
  MoodAffirmation: { mood: Mood };
  DiaryEntry: { entry?: DiaryEntry };
  DiaryList: undefined;
  EditProfile: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Calendar: undefined;
  Diary: undefined;
  Profile: undefined;
};

export type OnboardingStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
};

export type RegistrationStackParamList = {
  AvatarSelection: undefined;
  NameInput: { selectedAvatarUri?: string };
};



