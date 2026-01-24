import { GradientBackground } from '@/components/GradientBackground';
import { Logo } from '@/components/Logo';
import { NeonButton } from '@/components/NeonButton';
import { NeonInput } from '@/components/NeonInput';
import { PasswordStrengthMeter } from '@/components/PasswordStrengthMeter';
import { auth } from '@/config/firebase';
import { FONTS, Palette } from '@/constants/theme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { confirmPasswordReset } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ResetPassword() {
    const router = useRouter();
    // 'oobCode' is the parameter Firebase sends in the deep link
    const { oobCode } = useLocalSearchParams<{ oobCode?: string }>();
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleReset = async () => {
        if (!password) {
            Alert.alert('Error', 'Please enter a new password');
            return;
        }

        if (password.length < 10) {
            Alert.alert('Weak Password', 'Password must be at least 10 characters long.');
            return;
        }

        if (!oobCode) {
            Alert.alert('Error', 'Invalid or missing reset code. Please try the "Forgot Password" link again.');
            return;
        }

        setIsLoading(true);
        try {
            await confirmPasswordReset(auth, oobCode, password);
            Alert.alert(
                'Success',
                'Your password has been changed successfully. You can now sign in.',
                [{ text: 'OK', onPress: () => router.replace('/sign-in') }]
            );
        } catch (error: any) {
            Alert.alert('Reset Failed', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!oobCode) {
        return (
            <GradientBackground>
                <View style={styles.container}>
                    <Text style={styles.errorText}>Invalid Link. Please request a new password reset.</Text>
                    <NeonButton title="Go to Sign In" onPress={() => router.replace('/sign-in')} style={{ marginTop: 20 }} />
                </View>
            </GradientBackground>
        )
    }

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
                        <Text style={styles.title}>NEW PASSWORD</Text>
                        <Text style={styles.subtitle}>Enter your new strong password</Text>
                    </View>

                    <View style={styles.form}>
                        <NeonInput
                            icon="lock.fill"
                            placeholder="New Password"
                            value={password}
                            onChangeText={setPassword}
                            isPassword
                        />

                        <PasswordStrengthMeter password={password} />

                        <NeonButton
                            title="RESET PASSWORD"
                            onPress={handleReset}
                            isLoading={isLoading}
                            style={{ marginTop: 20 }}
                        />
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
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
    errorText: {
        color: Palette.textWhite,
        fontFamily: FONTS.bold,
        fontSize: 18,
        textAlign: 'center',
    }
});
