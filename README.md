# Welcome to your Expo app 👋

This is a Login With OTP App project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

A mobile application built with React Native and Expo to help login on a app using otp. The app focuses on ease of use, clean UI and a better user experience.

## Features

📊 Login Using OTP

🕒 Detailed Toasts for better User Experience

🩻 Skeleton Screens For better User Experience

🎨 Clean and responsive UI using NativeWind (Tailwind CSS)

📱 Smooth navigation using Expo Router

## Tech Stack

- Frontend: React Native

- Framework: Expo

- Navigation: Expo Router

- State Management: Zustand

- Styling: NativeWind (Tailwind CSS)

- Language: TypeScript

## Packages and Dependencies used (Main)

- expo

- react

- react-native

- expo-router

- zustand

- nativewind

- tailwindcss

- @expo/vector-icons

- react-native-safe-area-context


## How To Run The Project

1. Install the Expo-Go app in your mobile device from the appstore or the playstore

2. Clone the Project in your system

   Open a terminal and run:
   ```bash
   git clone https://github.com/Shubhgoyal-1/Registration-OTP-_StapuBox.git
   ```

3. Move into the Project Directory  
   ```bash
   cd LoginWithOtp
   ```
4. Install the Packages
   ```bash
   npm install
   ```
   This will install all libraries used in the project including Expo, React Native, navigation, styling, and state management tools.
5. Run and start the Developement Server
   ```bash
   npx expo start
   ```
   After running this command:

      -> A QR code will appear in the terminal

      -> Expo Dev Tools will open in the browser

6. Open the Expo Go app in your mobile device

   Android: Open Expo Go and scan the QR code

   iOS: Scan the QR code using the Camera app

📌Important Condition : 
Make sure the Phone and laptop are on the same Wi-Fi network
   
## 2nd Approach
1. Download the APK file
   
   [`Install`](https://expo.dev/accounts/ishubhgoyal/projects/LoginWithOtp/builds/4a57e5cf-ced8-4b00-98ef-ecadba0c10c8)

2. Enable Unknown Sources (Android)

   ->Go to Settings → Security

   ->Enable Install unknown apps

   ->Allow your browser or file manager
   
3. Install the APK

   Open the downloaded APK file


## Decisions
1. Added Toasts for better User Experience 

2. Added Loader and skeleton screen while verifying the otp 

3. Changed the way of inputing the otp from an array of TextInput to a single TextInput

4. Added a dropdown for country codes

## Known Issues 
1. SMS retrieving API is not working as EXPO is being used but auto read from keyboard can be used .

2. Robust Error states cannot be maintained as i will have to remove the SSH security

3. Offline Cache is not being used now but can easily be tracked using AsyncStorage.

👨‍💻 Author

Shubh Goyal

B.Tech Student | React Native Developer


   
