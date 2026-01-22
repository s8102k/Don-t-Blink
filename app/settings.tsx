import { GradientBackground } from '@/components/GradientBackground';
import { SettingsItem } from '@/components/SettingsItem';
import { FONTS, Palette } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
    const router = useRouter();

    // Determine which "settings" items are toggles vs links based on the design
    const [soundEffects, setSoundEffects] = useState(true);
    const [music, setMusic] = useState(true);
    const [haptic, setHaptic] = useState(false);

    const [dailyChallenges, setDailyChallenges] = useState(true);
    const [friendRequests, setFriendRequests] = useState(false);

    const [publicProfile, setPublicProfile] = useState(true);

    return (
        <GradientBackground>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={Palette.textWhite} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.title}>SETTINGS</Text>
                        <Text style={styles.subtitle}>Manage your game experience</Text>
                    </View>
                </View>

                <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
                    {/* GAMEPLAY */}
                    <Text style={styles.sectionTitle}>GAMEPLAY</Text>
                    <SettingsItem
                        icon="volume-high"
                        label="Sound Effects"
                        type="toggle"
                        value={soundEffects}
                        onValueChange={setSoundEffects}
                    />
                    <SettingsItem
                        icon="musical-note"
                        label="Music"
                        type="toggle"
                        value={music}
                        onValueChange={setMusic}
                    />
                    <SettingsItem
                        icon="phone-portrait"
                        label="Haptic Feedback"
                        type="toggle"
                        value={haptic}
                        onValueChange={setHaptic}
                    />

                    {/* NOTIFICATIONS */}
                    <View style={styles.spacer} />
                    <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>
                    <SettingsItem
                        icon="trophy"
                        label="Daily Challenges"
                        type="toggle"
                        value={dailyChallenges}
                        onValueChange={setDailyChallenges}
                    />
                    <SettingsItem
                        icon="person-add"
                        label="Friend Requests"
                        type="toggle"
                        value={friendRequests}
                        onValueChange={setFriendRequests}
                    />

                    {/* SUPPORT */}
                    <View style={styles.spacer} />
                    <Text style={styles.sectionTitle}>SUPPORT</Text>
                    <SettingsItem
                        icon="help-circle"
                        label="Help Center"
                        type="link"
                        onPress={() => router.push('/help')}
                    />
                    <SettingsItem
                        icon="information-circle"
                        label="About Us"
                        type="link"
                        onPress={() => router.push('/about')}
                    />
                    <SettingsItem
                        icon="mail"
                        label="Contact Support"
                        type="link"
                        onPress={() => router.push('/contact')}
                    />

                    {/* ACCOUNT */}
                    <View style={styles.spacer} />
                    <Text style={styles.sectionTitle}>ACCOUNT</Text>
                    <SettingsItem
                        icon="eye"
                        label="Public Profile"
                        type="toggle"
                        value={publicProfile}
                        onValueChange={setPublicProfile}
                    />
                    <SettingsItem
                        icon="ban"
                        label="Blocked Users"
                        type="link"
                        onPress={() => { }}
                    />



                    <View style={styles.footer}>
                        <Text style={styles.footerText}>DON'T BLINK v1.0.4</Text>
                        <View style={styles.footerLinks}>
                            <TouchableOpacity><Text style={styles.footerLink}>Privacy Policy</Text></TouchableOpacity>
                            <Text style={styles.footerDot}>•</Text>
                            <TouchableOpacity><Text style={styles.footerLink}>Terms of Service</Text></TouchableOpacity>
                        </View>
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
        paddingBottom: 20,
        paddingTop: 10,
    },
    backButton: {
        marginBottom: 16,
    },
    title: {
        fontSize: 32,
        fontFamily: FONTS.bold,
        color: Palette.textWhite,
        letterSpacing: 1,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#8A8A8E', // Muted text
        fontFamily: FONTS.regular,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 12,
        fontFamily: FONTS.bold,
        color: '#D0A0C0', // Muted pinkish/purple
        marginBottom: 12,
        marginTop: 8,
        letterSpacing: 1,
    },
    spacer: {
        height: 24,
    },
    footer: {
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 20,
    },
    footerText: {
        color: '#534658',
        fontSize: 12,
        fontFamily: FONTS.bold,
        letterSpacing: 1.5,
        marginBottom: 12,
    },
    footerLinks: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerLink: {
        color: '#8A8A8E',
        fontSize: 12,
    },
    footerDot: {
        color: '#8A8A8E',
        marginHorizontal: 8,
    },
});
