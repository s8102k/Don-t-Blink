import { initializeApp } from 'firebase/app';
import * as Auth from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDO-VJON4-M3bripR2mOxAbXLwFQ0tg-04",
    authDomain: "don-t-blink-39c5d.firebaseapp.com",
    projectId: "don-t-blink-39c5d",
    storageBucket: "don-t-blink-39c5d.firebasestorage.app",
    messagingSenderId: "883915038356",
    appId: "1:883915038356:web:24b6940cf6959067b41e81",
    measurementId: "G-NEQF60TNBE"
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

