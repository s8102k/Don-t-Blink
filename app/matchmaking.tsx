import { GradientBackground } from '@/components/GradientBackground';
import { FONTS, Palette } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const AVATAR_SIZE = 100;

export default function MatchmakingScreen() {
    const router = useRouter();
    const pulseScale = useSharedValue(1);
    const pulseOpacity = useSharedValue(0.3);

    useEffect(() => {
        pulseScale.value = withRepeat(
            withSequence(
                withTiming(1.5, { duration: 1500 }),
                withTiming(1, { duration: 1500 })
            ),
            -1,
            true
        );
        pulseOpacity.value = withRepeat(
            withSequence(
                withTiming(0, { duration: 1500 }),
                withTiming(0.3, { duration: 1500 })
            ),
            -1,
            true
        );
    }, []);

    const animatedPulseStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: pulseScale.value }],
            opacity: pulseOpacity.value,
        };
    });

    return (
        <GradientBackground>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={Palette.textWhite} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>MATCHMAKING</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.topSection}>
                        <Text style={styles.statusText}>FINDING OPPONENT...</Text>
                        <Text style={styles.subStatusText}>Estimated wait: 5s</Text>
                    </View>

                    <View style={styles.centerSection}>
                        {/* Pulse Effect */}
                        <Animated.View style={[styles.pulseCircle, animatedPulseStyle]} />

                        {/* User Avatar */}
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatar}>
                                <Ionicons name="person" size={40} color={Palette.textWhite} />
                            </View>
                            <Text style={styles.vsText}>VS</Text>
                            <View style={[styles.avatar, styles.opponentAvatar]}>
                                <Ionicons name="help" size={40} color="rgba(255,255,255,0.3)" />
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
                        <Text style={styles.cancelButtonText}>CANCEL</Text>
                    </TouchableOpacity>
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
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    backButton: {
        padding: 8,
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 16,
        color: 'white',
        fontFamily: FONTS.bold,
        letterSpacing: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 60,
    },
    topSection: {
        alignItems: 'center',
    },
    statusText: {
        fontSize: 24,
        fontFamily: FONTS.bold,
        color: Palette.textWhite,
        letterSpacing: 2,
        marginBottom: 8,
    },
    subStatusText: {
        fontSize: 14,
        color: Palette.textMuted,
        fontFamily: FONTS.medium,
        letterSpacing: 1,
    },
    centerSection: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: width, // Square container for centering
    },
    rotationContainer: {
        // Can add rotation later
    },
    pulseCircle: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: Palette.primaryPink,
        zIndex: 0,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        zIndex: 1,
    },
    avatar: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderWidth: 2,
        borderColor: Palette.primaryPink,
        alignItems: 'center',
        justifyContent: 'center',
    },
    opponentAvatar: {
        borderColor: 'rgba(255,255,255,0.1)',
        borderStyle: 'dashed',
    },
    vsText: {
        fontSize: 20,
        fontFamily: FONTS.bold,
        fontStyle: 'italic',
        color: Palette.primaryPink,
    },
    cancelButton: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    cancelButtonText: {
        color: Palette.textMuted,
        fontFamily: FONTS.medium,
        fontSize: 14,
        letterSpacing: 1,
    },
});
