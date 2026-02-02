import { GradientBackground } from '@/components/GradientBackground';
import { Logo } from '@/components/Logo';
import { FONTS, useTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const { theme } = useTheme();

    return (
        <GradientBackground>
            <View style={[styles.header, { marginTop: insets.top + 10 }]}>
                {/* Settings Button */}
                <Link href="/settings" asChild>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="settings-sharp" size={24} color={theme.textWhite} />
                    </TouchableOpacity>
                </Link>
            </View>

            <View style={styles.content}>
                <View style={styles.centerContent}>
                    <Logo />

                    <Text style={styles.dontText}>DON'T</Text>
                    <Text style={[styles.blinkText, { color: theme.primary }]}>BLINK</Text>

                    <Text style={styles.subtitle}>REAL-TIME FACE CHALLENGE</Text>

                    <View style={[styles.divider, { backgroundColor: theme.surface === '#001020' ? 'rgba(0, 240, 255, 0.2)' : '#3D2039' }]} />
                </View>

                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        style={[styles.playButton, { backgroundColor: theme.primary, shadowColor: theme.primary }]}
                        activeOpacity={0.8}
                        onPress={() => {
                            // Navigate to Game Flow
                            router.push('/matchmaking');
                        }}
                    >
                        <Text style={styles.playButtonText}>LET'S PLAY</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.playButton, { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.primary, marginTop: 16 }]}
                        activeOpacity={0.8}
                        onPress={() => {
                            router.push('/countdown');
                        }}
                    >
                        <Text style={[styles.playButtonText, { color: theme.primary }]}>SOLO PLAY</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.howToPlayButton}
                        activeOpacity={0.8}
                        onPress={() => {
                            router.push('/landing');
                        }}
                    >
                        <Text style={[styles.howToPlayText, { color: theme.textMuted }]}>HOW TO PLAY</Text>
                    </TouchableOpacity>

                    <Text style={styles.version}>v2.0.4 • BETA</Text>
                </View>
            </View>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 10,
        paddingHorizontal: 20,
        alignItems: 'flex-end',
    },
    iconButton: {
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 100,
        paddingBottom: 40,
    },
    centerContent: {
        alignItems: 'center',
    },
    dontText: {
        fontSize: 48,
        fontFamily: FONTS.bold,
        fontWeight: '900',
        color: '#FFFFFF', // Palette.textWhite but explicit
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
    actionContainer: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    playButton: {
        width: '100%',
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 24,
    },
    playButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: FONTS.bold,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    version: {
        color: '#666',
        fontSize: 10,
        letterSpacing: 2,
    },
    howToPlayButton: {
        marginBottom: 24,
        padding: 10,
    },
    howToPlayText: {
        color: '#AFAFAF',
        fontSize: 14,
        fontFamily: FONTS.medium,
        letterSpacing: 1.5,
        textDecorationLine: 'underline',
    },
});
