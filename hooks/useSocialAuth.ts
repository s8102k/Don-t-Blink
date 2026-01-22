import { auth } from '@/config/firebase';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, OAuthProvider, signInWithCredential } from 'firebase/auth';
import { useEffect, useState } from 'react';

// Initialize WebBrowser for Expo Auth Session
WebBrowser.maybeCompleteAuthSession();

export const useSocialAuth = () => {
    const [isLoading, setIsLoading] = useState(false);

    // Google Request
    const [request, response, promptAsync] = Google.useAuthRequest({
        // Placeholder IDs - User must replace these!
        iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
        androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
        webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            handleFirebaseSignIn(credential);
        }
    }, [response]);

    const handleFirebaseSignIn = async (credential: any) => {
        setIsLoading(true);
        try {
            await signInWithCredential(auth, credential);
            // Router navigation is handled by the auth state listener in the screen or global listener
        } catch (error: any) {
            console.error('Social Auth Error:', error);
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await promptAsync();
        } catch (e) {
            console.error("Google Prompt Error", e);
        }
    };

    const handleAppleSignIn = async () => {
        setIsLoading(true);
        try {
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
                await signInWithCredential(auth, firebaseCredential);
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
        request // return request object if needed for disabling button
    };
};
