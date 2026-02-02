import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    withSequence,
    Easing
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const PulsingEye = () => {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    useEffect(() => {
        scale.value = withRepeat(
            withSequence(
                withTiming(1.1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
                withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            false
        );
        opacity.value = withRepeat(
            withSequence(
                withTiming(0.7, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
                withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            false
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    return (
        <Animated.View style={[styles.eyeContainer, animatedStyle]}>
            <View style={styles.eyeCircle}>
                <Ionicons name="eye" size={60} color={Colors.dark.primary} />
            </View>
        </Animated.View>
    );
};

const ProgressBar = ({ progress }: { progress: number }) => {
    const progressWidth = useSharedValue(0);

    useEffect(() => {
        progressWidth.value = withTiming(progress, {
            duration: 500,
            easing: Easing.out(Easing.ease)
        });
    }, [progress]);

    const animatedStyle = useAnimatedStyle(() => ({
        width: `${progressWidth.value}%`,
    }));

    return (
        <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>LOADING ASSETS</Text>
                <Text style={styles.progressPercent}>{Math.round(progress)}%</Text>
            </View>
            <View style={styles.progressBarContainer}>
                <Animated.View style={[styles.progressBarFill, animatedStyle]} />
            </View>
        </View>
    );
};

export default function LoadingScreen() {
    const router = useRouter();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate asset loading
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    // Navigate to main screen after loading completes
                    setTimeout(() => {
                        router.replace('/');
                    }, 500);
                    return 100;
                }
                return prev + 5;
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.content}>

                {/* Eye Icon */}
                <PulsingEye />

                {/* Title */}
                <View style={styles.titleContainer}>
                    <Text style={styles.titleWhite}>DON'T</Text>
                    <Text style={styles.titlePink}>BLINK</Text>
                </View>

                {/* Subtitle */}
                <Text style={styles.subtitle}>REAL-TIME FACE CHALLENGE</Text>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Tagline */}
                <Text style={styles.tagline}>3 Seconds to Judge</Text>

            </View>

            {/* Progress Bar */}
            <View style={styles.footer}>
                <ProgressBar progress={progress} />
                <Text style={styles.version}>v2.0.4 • BETA</Text>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D1B2E',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    eyeContainer: {
        marginBottom: 60,
    },
    eyeCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 0, 168, 0.1)',
        borderWidth: 2,
        borderColor: 'rgba(255, 0, 168, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.dark.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    titleWhite: {
        fontSize: 48,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: 2,
        textTransform: 'uppercase',
        lineHeight: 52,
    },
    titlePink: {
        fontSize: 48,
        fontWeight: '900',
        color: Colors.dark.primary,
        letterSpacing: 2,
        textTransform: 'uppercase',
        lineHeight: 52,
    },
    subtitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#888',
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginBottom: 20,
    },
    divider: {
        width: 60,
        height: 2,
        backgroundColor: Colors.dark.primary,
        marginBottom: 15,
    },
    tagline: {
        fontSize: 14,
        fontWeight: '400',
        color: '#aaa',
        letterSpacing: 0.5,
    },
    footer: {
        paddingHorizontal: 30,
        paddingBottom: 40,
        width: '100%',
    },
    progressContainer: {
        marginBottom: 15,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    progressLabel: {
        fontSize: 11,
        fontWeight: 'bold',
        color: Colors.dark.primary,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },
    progressPercent: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#666',
        letterSpacing: 1,
    },
    progressBarContainer: {
        width: '100%',
        height: 6,
        backgroundColor: '#1E1624',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: Colors.dark.primary,
        borderRadius: 3,
    },
    version: {
        fontSize: 11,
        fontWeight: '400',
        color: '#555',
        textAlign: 'center',
        letterSpacing: 1,
        textTransform: 'uppercase',
    }
});
