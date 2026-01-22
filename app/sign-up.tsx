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
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function SignUp() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Social Auth Hook
    const { handleGoogleSignIn, handleAppleSignIn, isLoading: isSocialLoading } = useSocialAuth();

    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = async () => {
        if (!name || !email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setIsLoading(true);
        try {
            const authEmail = `${name.replace(/\s+/g, '').toLowerCase()}@dontblink.app`;
            const userCredential = await createUserWithEmailAndPassword(auth, authEmail, password);
            await updateProfile(userCredential.user, {
                displayName: `${name}|${email}`
            });

            router.replace('/(tabs)/home'); // Navigate to home on success
        } catch (error: any) {
            Alert.alert('Sign Up Failed', error.message);
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
                        <Text style={styles.title}>CREATE ACCOUNT</Text>
                        <Text style={styles.subtitle}>Join the ultimate staring contest</Text>
                    </View>

                    <View style={styles.form}>
                        <NeonInput
                            icon="person.fill"
                            placeholder="Full Name"
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words"
                        />
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


                        <NeonButton
                            title="SIGN UP"
                            onPress={handleSignUp}
                            isLoading={isLoading}
                            style={{ marginTop: 20 }}
                        />

                        <SocialLoginButtons
                            onGooglePress={handleGoogleSignIn}
                            onApplePress={handleAppleSignIn}
                            isLoading={isLoading || isSocialLoading}
                        />

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Already have an account? </Text>
                            <Link href={"/sign-in" as any} asChild>
                                <Text style={styles.linkTextBold}>Sign In</Text>
                            </Link>
                        </View>
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
        marginBottom: 30,
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
});
