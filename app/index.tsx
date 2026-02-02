
import { GradientBackground } from '@/components/GradientBackground';
import { Logo } from '@/components/Logo';
import { ProgressBar } from '@/components/ProgressBar';
import { FONTS, useTheme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Splash() {
    const router = useRouter();
    const [progress, setProgress] = useState(0);
    const { theme } = useTheme();

    useEffect(() => {
        const duration = 2500; // 2.5 seconds splash
        const intervalTime = 50;
        const steps = duration / intervalTime;
        const stepSize = 1 / steps;

        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + stepSize;
                if (next >= 1) {
                    clearInterval(timer);
                    // Navigate to home
                    setTimeout(() => {
                        router.replace('/(tabs)/home' as any);
                    }, 200);
                    return 1;
                }
                return next;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, []);

    return (
        <GradientBackground>
            <StatusBar style="light" />
            <View style={styles.content}>
                <View style={styles.centerContent}>
                    <Logo />

                    <Text style={styles.dontText}>DON'T</Text>
                    <Text style={[styles.blinkText, { color: theme.primary }]}>BLINK</Text>

                    <Text style={styles.subtitle}>REAL-TIME FACE CHALLENGE</Text>

                    <View style={[styles.divider, { backgroundColor: theme.overlay }]} />

                    <Text style={styles.judgeText}>3 Seconds to Judge</Text>
                </View>

                <View style={styles.footer}>
                    <ProgressBar progress={progress} />
                    <Text style={styles.version}>v2.0.4 • BETA</Text>
                </View>
            </View>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 120,
        paddingBottom: 40,
    },
    centerContent: {
        alignItems: 'center',
    },
    dontText: {
        fontSize: 48,
        fontFamily: FONTS.bold,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 2,
        lineHeight: 52,
    },
    blinkText: {
        fontSize: 48,
        fontFamily: FONTS.bold,
        fontWeight: '900',
        letterSpacing: 2,
        marginTop: -8,
        lineHeight: 52,
    },
    subtitle: {
        color: '#AFAFAF',
        marginTop: 30,
        fontSize: 12,
        letterSpacing: 4,
        fontFamily: FONTS.medium,
        fontWeight: '600',
    },
    divider: {
        width: 40,
        height: 1,
        marginTop: 20,
    },
    judgeText: {
        color: '#666',
        marginTop: 15,
        fontSize: 14,
    },
    footer: {
        width: '100%',
        alignItems: 'center',
    },
    version: {
        color: '#666',
        fontSize: 10,
        marginTop: 20,
        letterSpacing: 2,
    },
});
