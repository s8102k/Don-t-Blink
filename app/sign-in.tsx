import { GradientBackground } from '@/components/GradientBackground';
import { Logo } from '@/components/Logo';
import { NeonButton } from '@/components/NeonButton';
import { NeonInput } from '@/components/NeonInput';
import { SocialLoginButtons } from '@/components/SocialLoginButtons';
import { auth } from '@/config/firebase';
import { FONTS, Palette } from '@/constants/theme';
import { useSocialAuth } from '@/hooks/useSocialAuth';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Social Auth Hook
    const { handleGoogleSignIn, handleAppleSignIn, isLoading: isSocialLoading } = useSocialAuth();

    const handleSignIn = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.replace('/(tabs)/home'); // Navigate to home on success
        } catch (error: any) {
            console.log('Sign in error code:', error.code);
            let message = error.message;
            let title = 'Sign In Failed';
            let buttons = [{ text: 'OK' }];

            if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
                title = 'Account Not Found';
                message = 'This account does not exist. Please sign up before logging in.';
                buttons = [
                    { text: 'Cancel', style: 'cancel' as any },
                    { text: 'Sign Up', onPress: () => router.replace('/sign-up') }
                ] as any;
            } else if (error.code === 'auth/wrong-password') {
                message = 'Invalid password.';
            }

            Alert.alert(title, message, buttons);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GradientBackground>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoid}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <Logo />
                        <Text style={styles.title}>WELCOME BACK</Text>
                        <Text style={styles.subtitle}>Sign in to continue your streak</Text>
                    </View>

                    <View style={styles.form}>
                        <NeonInput
                            icon="envelope.fill"
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                        <NeonInput
                            icon="lock.fill"
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            isPassword
                        />

                        <View style={styles.forgotPassword}>
                            <Link href="/forgot-password" asChild>
                                <Text style={styles.linkText}>Forgot Password?</Text>
                            </Link>
                        </View>

                        <NeonButton
                            title="SIGN IN"
                            onPress={handleSignIn}
                            isLoading={isLoading}
                            style={{ marginTop: 20 }}
                        />

                        <SocialLoginButtons
                            onGooglePress={handleGoogleSignIn}
                            onApplePress={handleAppleSignIn}
                            isLoading={isLoading || isSocialLoading}
                        />

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Don't have an account? </Text>
                            <Link href={"/sign-up" as any} asChild>
                                <Text style={styles.linkTextBold}>Sign Up</Text>
                            </Link>
                        </View>

                        {/* TEMPORARY: Test Button for Reset Password UI */}
                        <Link href={{ pathname: "/reset-password", params: { oobCode: "TEST_MODE" } }} asChild>
                            <Text style={styles.debugLink}>
                                (Debug) Test Reset Password Screen
                            </Text>
                        </Link>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    keyboardAvoid: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 40,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontFamily: FONTS.bold,
        fontWeight: '900',
        color: Palette.textWhite,
        marginTop: 24,
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: FONTS.regular,
        color: Palette.textMuted,
        marginTop: 8,
    },
    form: {
        width: '100%',
    },
    forgotPassword: {
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    linkText: {
        color: Palette.primaryPink,
        fontFamily: FONTS.medium,
        fontSize: 14,
    },
    linkTextBold: {
        color: Palette.primaryPink,
        fontFamily: FONTS.bold,
        fontWeight: '700',
        fontSize: 14,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    footerText: {
        color: Palette.textMuted,
        fontFamily: FONTS.regular,
        fontSize: 14,
    },
    debugLink: {
        color: Palette.primaryPink,
        fontFamily: FONTS.medium,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 20,
        opacity: 0.5,
    },
});
