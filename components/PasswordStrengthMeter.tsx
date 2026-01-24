import { FONTS, Palette } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface PasswordStrengthMeterProps {
    password: string;
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
    // Password Strength Logic
    const calculateStrength = (pass: string) => {
        let score = 0;
        if (!pass) return 0;

        // Length check (up to 40% of score)
        if (pass.length > 5) score += 10;
        if (pass.length > 9) score += 30; // Boost for hitting 10 char requirement

        // Complexity checks (60% of score)
        if (/[A-Z]/.test(pass)) score += 15;
        if (/[0-9]/.test(pass)) score += 15;
        if (/[^A-Za-z0-9]/.test(pass)) score += 30;

        return Math.min(100, score);
    };

    const strength = calculateStrength(password);

    const getStrengthColor = (score: number) => {
        if (score < 40) return '#FF4444'; // Red
        if (score < 80) return '#FFCC00'; // Yellow
        return '#00CC66'; // Green
    };

    const getStrengthText = (score: number) => {
        if (score === 0) return '';
        if (score < 40) return 'Weak';
        if (score < 80) return 'Medium';
        return 'Strong';
    };

    if (password.length === 0) return null;

    return (
        <View style={styles.strengthContainer}>
            <View style={styles.strengthBarBg}>
                <View
                    style={[
                        styles.strengthBarFill,
                        {
                            width: `${strength}%`,
                            backgroundColor: getStrengthColor(strength)
                        }
                    ]}
                />
            </View>
            <View style={styles.strengthLabels}>
                <Text style={styles.strengthText}>
                    {password.length < 10 ? 'Must be at least 10 characters' : getStrengthText(strength)}
                </Text>
                <Text style={[styles.strengthText, { color: getStrengthColor(strength) }]}>
                    {strength}%
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    strengthContainer: {
        marginTop: 8,
        marginBottom: 16,
    },
    strengthBarBg: {
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    strengthBarFill: {
        height: '100%',
        borderRadius: 2,
    },
    strengthLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 6,
    },
    strengthText: {
        color: Palette.textMuted,
        fontSize: 12,
        fontFamily: FONTS.medium,
    },
});
