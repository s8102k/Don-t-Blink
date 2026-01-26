import { auth } from '@/config/firebase';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';
import { GoogleAuthProvider, OAuthProvider, signInWithCredential } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const useSocialAuth = (onAuthSuccess?: () => void) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
        });
    }, []);

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            const idToken = response.data?.idToken;
            const credential = GoogleAuthProvider.credential(idToken);
            await handleFirebaseSignIn(credential);
        } catch (error: any) {
            console.error('Google Sign-In Error:', error);
            if (error.code === 'SIGN_IN_CANCELLED') {
                // User cancelled the login flow
            } else if (error.code === 'IN_PROGRESS') {
                // Operation (e.g. sign in) is in progress already
                alert('Sign in is already in progress');
            } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
                // Play services not available or outdated
                alert('Google Play Services not available');
            } else {
                alert('Google Sign-In failed');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleFirebaseSignIn = async (credential: any) => {
        try {
            await signInWithCredential(auth, credential);
            if (onAuthSuccess) {
                onAuthSuccess();
            }
        } catch (error: any) {
            console.error('Firebase Auth Error:', error);
            alert(error.message);
        }
    };

    const handleAppleSignIn = async () => {
        setIsLoading(true);
        try {
            const isAvailable = await AppleAuthentication.isAvailableAsync();
            if (!isAvailable) {
                alert('Apple Sign-In is not available on this device');
                setIsLoading(false);
                return;
            }

            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });

            const { identityToken } = credential;
            if (identityToken) {
                const provider = new OAuthProvider('apple.com');
                const firebaseCredential = provider.credential({
                    idToken: identityToken,
                    // rawNonce: ... (needed for verified security, simplified here)
                });
                await handleFirebaseSignIn(firebaseCredential);
            }
        } catch (e: any) {
            if (e.code === 'ERR_CANCELED') {
                // User canceled
            } else {
                console.error("Apple Sign In Error", e);
                alert("Apple Sign In Failed");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        handleGoogleSignIn,
        handleAppleSignIn,
        isLoading,
    };
};

