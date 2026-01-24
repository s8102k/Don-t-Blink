import { GradientBackground } from '@/components/GradientBackground';
import { Logo } from '@/components/Logo';
import { NeonButton } from '@/components/NeonButton';
import { NeonInput } from '@/components/NeonInput';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { auth } from '@/config/firebase';
import { FONTS, Palette } from '@/constants/theme';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ForgotPassword() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleResetPassword = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email address');
            return;
        }

        setIsLoading(true);
        try {
            await sendPasswordResetEmail(auth, email, {
                handleCodeInApp: true,
                url: 'https://don-t-blink-39c5d.firebaseapp.com/reset-password', // Using standard Firebase domain pattern or placeholder
                iOS: {
                    bundleId: 'com.dontblink.app',
                },
                android: {
                    packageName: 'com.dontblink.app',
                    installApp: true,
                    minimumVersion: '1',
                },
            });
            setIsSubmitted(true);
        } catch (error: any) {
            console.log('Reset password error:', error.code, error.message);
            let message = 'Failed to send reset email. Please try again.';
            if (error.code === 'auth/user-not-found') {
                message = 'No account found with this email.';
            } else if (error.code === 'auth/invalid-email') {
                message = 'Please enter a valid email address.';
            }
            Alert.alert('Error', message);
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
                        <Text style={styles.title}>RESET PASSWORD</Text>
                        {!isSubmitted && (
                            <Text style={styles.subtitle}>Enter your email to receive a reset link</Text>
                        )}
                    </View>

                    {isSubmitted ? (
                        <View style={styles.successContainer}>
                            <IconSymbol
                                name="checkmark.circle.fill"
                                size={100}
                                color={Palette.primaryPink}
                                style={styles.successIcon}
                            />
                            <Text style={styles.successTitle}>Check Your Email</Text>
                            <Text style={styles.successMessage}>
                                We have sent a password reset link to{'\n'}
                                <Text style={styles.emailText}>{email}</Text>
                            </Text>

                            <Link href="/sign-in" asChild>
                                <NeonButton
                                    title="BACK TO SIGN IN"
                                    onPress={() => { }} // Using Link asChild, so this is just for style
                                    style={{ marginTop: 30, width: '100%' }}
                                />
                            </Link>

                            <View style={styles.footer}>
                                <Text style={styles.footerText}>Didn't receive the email? </Text>
                                <Text
                                    style={styles.linkTextBold}
                                    onPress={() => setIsSubmitted(false)}
                                >
                                    Try again
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.form}>
                            <NeonInput
                                icon="envelope.fill"
                                placeholder="Email Address"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />

                            <NeonButton
                                title="SEND RESET LINK"
                                onPress={handleResetPassword}
                                isLoading={isLoading}
                                style={{ marginTop: 20 }}
                            />

                            <View style={styles.footer}>
                                <Link href="/sign-in" asChild>
                                    <Text style={styles.linkText}>Back to Sign In</Text>
                                </Link>
                            </View>
                        </View>
                    )}
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
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        fontFamily: FONTS.regular,
        color: Palette.textMuted,
        marginTop: 8,
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    successContainer: {
        alignItems: 'center',
        width: '100%',
    },
    successIcon: {
        marginBottom: 24,
        textShadowColor: Palette.primaryPink,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
    },
    successTitle: {
        fontSize: 24,
        fontFamily: FONTS.bold,
        color: Palette.textWhite,
        marginBottom: 12,
        textAlign: 'center',
    },
    successMessage: {
        fontSize: 16,
        fontFamily: FONTS.regular,
        color: Palette.textMuted,
        textAlign: 'center',
        lineHeight: 24,
    },
    emailText: {
        color: Palette.textWhite,
        fontFamily: FONTS.bold,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
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
    footerText: {
        color: Palette.textMuted,
        fontFamily: FONTS.regular,
        fontSize: 14,
    },
});
