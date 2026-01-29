# My Mood Flower Diary 🌸

A gentle space for women to connect with their emotions through daily mood tracking and personal reflection.

## Features

- **Mood Selection**: Choose from three beautiful flower moods (Pink Bloom, Blue Serenity, Golden Spirit)
- **Personalized Affirmations**: Receive supportive messages based on your chosen mood
- **Calendar Tracking**: Visualize your mood patterns over time
- **Personal Diary**: Write and save your thoughts and reflections
- **Beautiful UI**: Calming blue and white theme with cloud backgrounds

## Screenshots

The app includes:
- Home screen with mood selection
- Mood selection with flower options and descriptions
- Affirmation screen with personalized messages
- Calendar view for mood tracking
- Diary functionality for personal entries
- Profile screen with app information

## Getting Started

### Prerequisites

- Node.js (>= 18)
- React Native development environment set up
- iOS Simulator or Android Emulator

### Adding Your Images

**Background Image:**
- Place your background PNG image at: `src/assets/background.png`
- This will be used as the background for all screens

**Navigation Icons:**
- Place your PNG icons in the `src/assets/icons/` folder:
  - `home.png` - Home tab icon
  - `calendar.png` - Calendar tab icon  
  - `diary.png` - Diary tab icon
  - `profile.png` - Profile tab icon

**Flower Images:**
- Place your PNG flower images in the `src/assets/blume/` folder:
  - `pink.png` - Pink flower for Pink Bloom mood
  - `blue.png` - Blue flower for Blue Serenity mood
  - `yellow.png` - Yellow flower for Golden Spirit mood

### Installation

1. Install dependencies:
```bash
npm install
```

2. For iOS, install pods:
```bash
cd ios && pod install && cd ..
```

3. Start the Metro bundler:
```bash
npm start
```

4. Run the app:

For iOS:
```bash
npm run ios
```

For Android:
```bash
npm run android
```

## Project Structure

```
src/
├── assets/            # Images and assets
│   ├── background.png # Background image for all screens
│   ├── icons/         # Navigation icons
│   │   ├── home.png
│   │   ├── calendar.png
│   │   ├── diary.png
│   │   └── profile.png
│   └── blume/         # Flower images
│       ├── pink.png
│       ├── blue.png
│       └── yellow.png
├── components/        # Reusable UI components
│   ├── AppHeader.tsx
│   ├── CloudBackground.tsx
│   ├── FlowerIcon.tsx
│   └── PNGIcon.tsx
├── data/             # Static data
│   └── moods.ts
├── navigation/       # Navigation configuration
│   └── AppNavigator.tsx
├── screens/          # App screens
│   ├── Onboarding1Screen.tsx
│   ├── Onboarding2Screen.tsx
│   ├── Onboarding3Screen.tsx
│   ├── AvatarSelectionScreen.tsx
│   ├── NameInputScreen.tsx
│   ├── HomeScreen.tsx
│   ├── MoodSelectionScreen.tsx
│   ├── MoodAffirmationScreen.tsx
│   ├── CalendarScreen.tsx
│   ├── DiaryScreen.tsx
│   ├── DiaryEntryScreen.tsx
│   ├── DiaryListScreen.tsx
│   └── ProfileScreen.tsx
├── types/            # TypeScript type definitions
│   └── index.ts
└── utils/            # Utility functions
    └── storage.ts
```

## Technologies Used

- React Native
- TypeScript
- React Navigation
- AsyncStorage for data persistence
- React Native Calendars
- React Native Vector Icons
- React Native Linear Gradient

## Features in Detail

### Mood Selection
- Three mood options: Pink Bloom (warmth), Blue Serenity (calm), Golden Spirit (joy)
- Each mood has unique descriptions and symbolism
- Beautiful flower icons representing each mood

### Affirmations
- Personalized messages based on selected mood
- Share functionality to spread positivity
- Save to calendar for tracking

### Calendar
- Visual mood tracking over time
- Tap dates to view mood entries
- Color-coded mood indicators

### Diary
- Create, edit, and delete personal entries
- Search functionality
- Clean, intuitive interface

## Contributing

This is a personal project, but feel free to suggest improvements or report issues.

## License

This project is for personal use.