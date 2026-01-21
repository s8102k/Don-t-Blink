import { GradientBackground } from '@/components/GradientBackground';
import { FONTS, Palette } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutScreen() {
    const router = useRouter();

    return (
        <GradientBackground>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={Palette.textWhite} />
                    </TouchableOpacity>
                    <Text style={styles.title}>ABOUT US</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Ionicons name="eye" size={80} color={Palette.primaryPink} />
                        <Text style={styles.appName}>DON'T BLINK</Text>
                        <Text style={styles.version}>Version 2.0.4</Text>
                    </View>

                    <Text style={styles.description}>
                        Don't Blink is the ultimate test of focus and endurance. Challenge your friends, climb the leaderboards, and prove you have the strongest gaze.
                    </Text>

                    <View style={styles.divider} />

                    <Text style={styles.creditsTitle}>Created by</Text>
                    <Text style={styles.creditsName}>The Don't Blink Team</Text>

                    <View style={styles.socials}>
                        <TouchableOpacity style={styles.socialIcon}>
                            <Ionicons name="logo-twitter" size={24} color={Palette.textMuted} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon}>
                            <Ionicons name="logo-instagram" size={24} color={Palette.textMuted} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon}>
                            <Ionicons name="globe-outline" size={24} color={Palette.textMuted} />
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
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
    backButton: {
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontFamily: FONTS.bold,
        color: Palette.textWhite,
        letterSpacing: 1,
    },
    content: {
        padding: 24,
        alignItems: 'center',
        flex: 1,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 20,
    },
    appName: {
        fontSize: 28,
        fontFamily: FONTS.bold,
        color: Palette.textWhite,
        marginTop: 16,
        letterSpacing: 2,
    },
    version: {
        fontSize: 14,
        fontFamily: FONTS.medium,
        color: Palette.textMuted,
        marginTop: 4,
    },
    description: {
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 24,
        color: 'rgba(255,255,255,0.8)',
        fontFamily: FONTS.regular,
        marginBottom: 32,
    },
    divider: {
        width: '40%',
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginBottom: 32,
    },
    creditsTitle: {
        fontSize: 12,
        color: Palette.primaryPink,
        fontFamily: FONTS.bold,
        marginBottom: 8,
        letterSpacing: 1,
    },
    creditsName: {
        fontSize: 16,
        color: Palette.textWhite,
        fontFamily: FONTS.medium,
        marginBottom: 32,
    },
    socials: {
        flexDirection: 'row',
        gap: 24,
    },
    socialIcon: {
        padding: 12,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 50,
    },
});
