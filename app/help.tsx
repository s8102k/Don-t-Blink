import { GradientBackground } from '@/components/GradientBackground';
import { FONTS, useTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HelpScreen() {
    const router = useRouter();
    const { theme } = useTheme();

    return (
        <GradientBackground>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={theme.textWhite} />
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: theme.textWhite }]}>HELP CENTER</Text>
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.section}>
                        <Text style={[styles.question, { color: theme.primary }]}>How do I play?</Text>
                        <Text style={[styles.answer, { color: theme.textWhite }]}>
                            Keep your eyes open! The goal is to not blink for as long as possible while the camera tracks your eyes.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.question, { color: theme.primary }]}>How is scoring calculated?</Text>
                        <Text style={[styles.answer, { color: theme.textWhite }]}>
                            Your score is based on the duration you can hold your stare. You get bonus points for clear lighting and steady focus.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.question, { color: theme.primary }]}>Why is the camera needed?</Text>
                        <Text style={[styles.answer, { color: theme.textWhite }]}>
                            We use the front-facing camera solely to detect your eye movement and blinks in real-time. No video is recorded or stored.
                        </Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={[styles.question, { color: theme.primary }]}>Can I play offline?</Text>
                        <Text style={[styles.answer, { color: theme.textWhite }]}>
                            Yes! You can practice offline, but you need an internet connection to update the global leaderboard.
                        </Text>
                    </View>
                </ScrollView>
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
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    backButton: {
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontFamily: FONTS.bold,
        letterSpacing: 1,
    },
    content: {
        padding: 20,
    },
    section: {
        marginBottom: 24,
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: 16,
        borderRadius: 12,
    },
    question: {
        fontSize: 16,
        fontFamily: FONTS.bold,
        marginBottom: 8,
    },
    answer: {
        fontSize: 14,
        fontFamily: FONTS.regular,
        lineHeight: 22,
    },
});
