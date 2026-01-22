import { GradientBackground } from '@/components/GradientBackground';
import { Logo } from '@/components/Logo';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { auth } from '@/config/firebase';
import { FONTS, Palette } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { sendEmailVerification, signOut } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, AppState, StyleSheet, Text, View } from 'react-native';

export default function VerifyEmail() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const user = auth.currentUser;
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        // Check function
        const checkVerification = async () => {
            if (auth.currentUser) {
                await auth.currentUser.reload();
                if (auth.currentUser.emailVerified) {
                    router.replace('/(tabs)/home');
                }
            }
        };

        // Poll for verification status every 3 seconds (fallback)
        const interval = setInterval(checkVerification, 3000);

        // check on mount
        checkVerification();

        // Check when app comes to foreground
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                console.log('App has come to the foreground! Checking verification...');
                checkVerification();
            }
            appState.current = nextAppState;
        });

        return () => {
            clearInterval(interval);
            subscription.remove();
        };
    }, []);

    const handleResendEmail = async () => {
        if (!user) return;
        setIsLoading(true);
        try {
            await sendEmailVerification(user);
            Alert.alert('Email Sent', 'A verification email has been sent to ' + user.email);
        } catch (error: any) {
            // 429 is rate limit
            if (error.code === 'auth/too-many-requests') {
                Alert.alert('Please Wait', 'You have sent too many requests. Please check your spam folder or wait a moment.');
            } else {
                Alert.alert('Error', error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckVerification = async () => {
        if (!user) return;
        setIsChecking(true);
        try {
            await user.reload();
            if (user.emailVerified) {
                router.replace('/(tabs)/home');
            } else {
                Alert.alert('Not Verified', 'Your email is not verified yet. Please check your inbox and click the link.');
            }
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setIsChecking(false);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        router.replace('/sign-in');
    };

    if (!user) {
        // Safety fallback if no user
        router.replace('/sign-in');
        return null;
    }

    return (
        <GradientBackground>
            <StatusBar style="light" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Logo />
                    <IconSymbol
                        name="envelope.fill"
                        size={80}
                        color={Palette.primaryPink}
                        style={styles.icon}
                    />
                    <Text style={styles.title}>VERIFY YOUR EMAIL</Text>
                    <Text style={styles.subtitle}>
                        We have sent a verification link to{'\n'}
                        <Text style={styles.emailText}>{user.email}</Text>
                    </Text>
                    <Text style={styles.instruction}>
                        Please check your inbox and click the link to verify your account.
                    </Text>
                </View>

                <View style={styles.actions}>
                    <Text style={[styles.instruction, { marginTop: 10, marginBottom: 30, color: Palette.primaryPink }]}>
                        Scanning for verification...
                    </Text>
                    <Text style={styles.linkText} onPress={handleLogout}>
                        Sign Out / Change Email
                    </Text>
                </View>
            </View>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
        paddingTop: 60,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    icon: {
        marginVertical: 30,
        textShadowColor: Palette.primaryPink,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
    },
    title: {
        fontSize: 28,
        fontFamily: FONTS.bold,
        fontWeight: '900',
        color: Palette.textWhite,
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        fontFamily: FONTS.regular,
        color: Palette.textMuted,
        marginBottom: 24,
        textAlign: 'center',
        lineHeight: 24,
    },
    emailText: {
        color: Palette.textWhite,
        fontFamily: FONTS.bold,
    },
    instruction: {
        fontSize: 14,
        fontFamily: FONTS.medium,
        color: Palette.textMuted,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    actions: {
        width: '100%',
        marginTop: 20,
    },
    linkText: {
        color: Palette.textMuted,
        fontFamily: FONTS.medium,
        fontSize: 14,
        textDecorationLine: 'underline',
        marginTop: 10,
    },
});
