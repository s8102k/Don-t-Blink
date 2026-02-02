import { GradientBackground } from '@/components/GradientBackground';
import { FONTS, useTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Standard avatar size
const AVATAR_SIZE = 140;

export default function MatchmakingScreen() {
    const router = useRouter();
    const { width, height } = useWindowDimensions();
    const { theme } = useTheme();

    // Calculate dynamic size for radar to fit screen
    // Use the smaller of width or 60% of height to prevent overflow
    const size = Math.min(width, height * 0.6) - 40;

    // Animation values
    const ripple1Scale = useSharedValue(1);
    const ripple1Opacity = useSharedValue(0.5);

    const ripple2Scale = useSharedValue(1);
    const ripple2Opacity = useSharedValue(0.5);

    const orbitRotation = useSharedValue(0);

    const progressWidth = useSharedValue(0);

    useEffect(() => {
        // Ripple 1
        ripple1Scale.value = withRepeat(
            withTiming(2.8, { duration: 3000, easing: Easing.out(Easing.ease) }),
            -1,
            false
        );
        ripple1Opacity.value = withRepeat(
            withTiming(0, { duration: 3000, easing: Easing.out(Easing.ease) }),
            -1,
            false
        );

        // Ripple 2 (Delayed)
        ripple2Scale.value = withDelay(
            1500,
            withRepeat(
                withTiming(2.8, { duration: 3000, easing: Easing.out(Easing.ease) }),
                -1,
                false
            )
        );
        ripple2Opacity.value = withDelay(
            1500,
            withRepeat(
                withTiming(0, { duration: 3000, easing: Easing.out(Easing.ease) }),
                -1,
                false
            )
        );

        // Orbit Rotation
        orbitRotation.value = withRepeat(
            withTiming(360, { duration: 5000, easing: Easing.linear }),
            -1,
            false
        );

        // Progress Bar Simulation
        progressWidth.value = withRepeat(
            withTiming(100, { duration: 3000, easing: Easing.linear }),
            -1,
            true
        );

    }, []);

    // Animated Styles
    const r1Style = useAnimatedStyle(() => ({
        transform: [{ scale: ripple1Scale.value }],
        opacity: ripple1Opacity.value,
    }));

    const r2Style = useAnimatedStyle(() => ({
        transform: [{ scale: ripple2Scale.value }],
        opacity: ripple2Opacity.value,
    }));

    const orbitStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${orbitRotation.value}deg` }],
    }));

    const progressStyle = useAnimatedStyle(() => ({
        width: `${progressWidth.value}%`,
    }));

    return (
        <GradientBackground>
            <SafeAreaView style={styles.safeArea}>
                {/* Custom Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                        <Ionicons name="arrow-back" size={24} color={theme.textWhite} />
                    </TouchableOpacity>

                    <View style={[styles.statusBadge, { backgroundColor: theme.surface }]}>
                        <View style={[styles.statusDot, { backgroundColor: theme.primary }]} />
                        <Text style={styles.statusText}>ONLINE</Text>
                    </View>

                    <TouchableOpacity onPress={() => router.push('/settings')} style={styles.iconButton}>
                        <Ionicons name="settings-sharp" size={24} color={theme.textWhite} />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    {/* Radar / Avatar Section */}
                    {/* Explicitly sizing the container based on available space */}
                    <View style={[styles.radarContainer, { width: size, height: size }]}>
                        {/* Static Rings (Decorations) */}
                        <View style={[styles.ring, { width: size * 0.55, height: size * 0.55, borderColor: 'rgba(255,255,255,0.05)' }]} />
                        <View style={[styles.ring, { width: size * 0.75, height: size * 0.75, borderColor: 'rgba(255,255,255,0.03)' }]} />
                        <View style={[styles.ring, { width: size * 0.95, height: size * 0.95, borderColor: 'rgba(255,255,255,0.02)' }]} />

                        {/* Animated Ripples */}
                        <Animated.View style={[styles.ripple, r1Style, { width: AVATAR_SIZE + 20, height: AVATAR_SIZE + 20, borderRadius: (AVATAR_SIZE + 20) / 2, borderColor: theme.primary }]} />
                        <Animated.View style={[styles.ripple, r2Style, { width: AVATAR_SIZE + 20, height: AVATAR_SIZE + 20, borderRadius: (AVATAR_SIZE + 20) / 2, borderColor: theme.primary }]} />

                        {/* Orbiting Elements */}
                        <Animated.View style={[styles.orbitContainer, orbitStyle, { width: size * 0.7, height: size * 0.7 }]}>
                            {/* Moon/Face Icon */}
                            <View style={[styles.orbitIcon, { transform: [{ translateY: -size * 0.35 }] }]}>
                                <View style={[styles.orbitIconCircle, { borderColor: theme.primary, backgroundColor: theme.surface }]}>
                                    <Ionicons name="happy" size={20} color={theme.primary} style={{ opacity: 0.8 }} />
                                </View>
                            </View>
                            {/* Eye Icon */}
                            <View style={[styles.orbitIcon, { transform: [{ rotate: '120deg' }, { translateY: -size * 0.25 }] }]}>
                                <Ionicons name="eye" size={20} color="rgba(255,255,255,0.2)" />
                            </View>
                        </Animated.View>

                        {/* Central Avatar */}
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: 'https://img.freepik.com/free-vector/portrait-girl-white_1308-40859.jpg?t=st=1738441113~exp=1738444713~hmac=563da78d8a0c4f8742ca1d21c0ad197171d18228302dfb8417c2f0f5b119b48f&w=826' }}
                                style={styles.avatar}
                            />
                        </View>
                    </View>

                    {/* Status Text & Progress */}
                    <View style={styles.statusSection}>
                        <Text style={styles.findingText}>FINDING{'\n'}OPPONENT...</Text>
                        <Text style={styles.waitText}>
                            ESTIMATED WAIT: <Text style={{ color: theme.primary, fontWeight: 'bold' }}>3s</Text>
                        </Text>

                        {/* Stylized Progress Bar */}
                        <View style={[styles.probressBarTrack, { backgroundColor: theme.surface }]}>
                            {/* Background track gradient line essentially */}
                            <Animated.View style={[styles.progressBarFill, progressStyle, { backgroundColor: theme.primary }]} />
                        </View>
                    </View>

                    {/* Footer / Tip */}
                    <View style={styles.footer}>
                        <View style={styles.tipContainer}>
                            <Ionicons name="bulb" size={14} color={theme.primary} />
                            <Text style={[styles.tipLabel, { color: theme.primary }]}>TIP</Text>
                        </View>
                        <Text style={styles.tipText}>
                            Keep your eyes wide open. Blinking counts as a loss instantly.
                        </Text>

                        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
                            <Text style={styles.cancelButtonText}>CANCEL</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        zIndex: 10,
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.08)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 8,
    },
    statusText: {
        color: '#D0D0D0',
        fontSize: 10,
        fontFamily: FONTS.bold,
        letterSpacing: 2,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly', // Changed from space-between to avoid extremes
        paddingBottom: 20,
    },
    radarContainer: {
        justifyContent: 'center',
        marginTop: 20,
    },
    ring: {
        position: 'absolute',
        borderRadius: 999,
        borderWidth: 1,
    },
    ripple: {
        position: 'absolute',
        width: 140, // Match avatar size roughly
        height: 140,
        borderRadius: 70,
        borderWidth: 1,
    },
    orbitContainer: {
        position: 'absolute',
        // size handled inline
        justifyContent: 'center',
        alignItems: 'center',
    },
    orbitIcon: {
        position: 'absolute',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    orbitIconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    avatarContainer: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        borderWidth: 4,
        borderColor: '#000', // Inner dark border
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D8BFD8',
        zIndex: 5,
        overflow: 'hidden',
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: AVATAR_SIZE / 2,
        opacity: 0.9,
    },
    statusSection: {
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 40,
    },
    findingText: {
        fontSize: 32,
        fontFamily: FONTS.bold,
        fontWeight: '900',
        color: '#FFFFFF', // Palette.textWhite but explicit for clarity
        textAlign: 'center',
        letterSpacing: 1,
        marginBottom: 8,
        lineHeight: 34,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
    },
    waitText: {
        fontSize: 12,
        color: '#888',
        fontFamily: FONTS.medium,
        letterSpacing: 1.5,
        marginBottom: 30,
        textTransform: 'uppercase',
    },
    probressBarTrack: {
        width: 200, // Shorter width as per image
        height: 6,
        borderRadius: 3,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
    },
    footer: {
        alignItems: 'center',
        paddingHorizontal: 30,
        width: '100%',
    },
    tipContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    tipLabel: {
        fontSize: 10,
        fontFamily: FONTS.bold,
        letterSpacing: 2,
        marginLeft: 8,
    },
    tipText: {
        color: '#CCC',
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 18,
        marginBottom: 40,
        fontFamily: FONTS.regular,
        maxWidth: 250,
    },
    cancelButton: {
        backgroundColor: 'rgba(255,255,255,0.00)', // Transparent
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
        width: 160,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#EEE',
        fontFamily: FONTS.bold,
        fontSize: 13,
        letterSpacing: 2,
    },
});
