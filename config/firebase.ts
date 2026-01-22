import { initializeApp } from 'firebase/app';
import * as Auth from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence (optional, default is usually fine for React Native/Expo)
// For React Native/Expo, we often use getAuth(app)
// Note: You might need to install @react-native-async-storage/async-storage for persistence to work perfectly on native,
// but standard web persistence works out of the box for many cases or check specific expo-firebase docs if focusing on native.
// For standard JS SDK usage:
const auth = Auth.getAuth(app);

export { auth };

