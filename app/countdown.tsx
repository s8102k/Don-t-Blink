
import { GradientBackground } from '@/components/GradientBackground';
import { FONTS, useTheme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

export default function CountdownScreen() {
    const router = useRouter();
    const [count, setCount] = useState(3);
    const { width } = useWindowDimensions();
    const { theme } = useTheme();

    const pulse = useSharedValue(1);

    useEffect(() => {
        // Pulse animation
        pulse.value = withRepeat(
            withTiming(1.2, { duration: 500, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );

        // Countdown logic
        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    // Navigate to game screen after a short delay to show "1" or "GO"
                    setTimeout(() => {
                        router.replace('/game');
                    }, 200);
                    return 0; // Show 1 then go
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pulse.value }],
    }));

    return (
        <GradientBackground>
            <View style={styles.container}>
                {/* Background Rings */}
                <View style={[styles.ring, { width: width * 0.85, height: width * 0.85, borderColor: theme.glowTransparent, opacity: 0.3 }]} />
                <View style={[styles.ring, { width: width * 0.65, height: width * 0.65, borderColor: theme.glowTransparent, opacity: 0.5 }]} />

                {/* Top Text */}
                <Text style={[styles.getReady, { color: theme.textMuted }]}>GET READY</Text>

                {/* Countdown Text */}
                <Animated.View style={[styles.countContainer, animatedStyle]}>
                    <Text style={[styles.countText, { color: theme.primary, textShadowColor: theme.primary }]}>
                        {count > 0 ? count : ''}
                    </Text>
                </Animated.View>

                {/* Bottom Text */}
                <View style={styles.bottomTextContainer}>
                    <Text style={[styles.dontBlink, { color: theme.textWhite }]}>DON’T BLINK</Text>
                    <Text style={[styles.subText, { color: theme.textMuted }]}>Judge the faces in 3 seconds</Text>
                </View>
            </View>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ring: {
        position: 'absolute',
        borderRadius: 999,
        borderWidth: 1,
        alignSelf: 'center',
    },
    getReady: {
        marginTop: -100, // Pull it up a bit
        fontSize: 14,
        color: '#666',
        fontFamily: FONTS.medium,
        letterSpacing: 4,
        marginBottom: 80,
        textTransform: 'uppercase',
    },
    countContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 80,
    },
    countText: {
        fontSize: 160,
        fontFamily: FONTS.bold,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 30,
        fontWeight: '900',
    },
    bottomTextContainer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 80,
    },
    dontBlink: {
        fontSize: 24,
        fontFamily: FONTS.bold,
        letterSpacing: 2,
        marginBottom: 8,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    subText: {
        fontSize: 12,
        color: '#666',
        fontFamily: FONTS.regular,
        letterSpacing: 0.5,
    },
});
