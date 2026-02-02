import { GradientBackground } from '@/components/GradientBackground';
import { MatchHistoryItem } from '@/components/MatchHistoryItem';
import { NeonButton } from '@/components/NeonButton';
import { NeonInput } from '@/components/NeonInput';
import { FONTS, useTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();

    // Mock user
    const user = {
        displayName: 'User',
        email: 'user@example.com',
        photoURL: null,
        uid: '123'
    };

    const displayNameParts = (user?.displayName || '').split('|');
    const realName = displayNameParts[0] || 'User';
    let realEmail = displayNameParts[1] || user?.email || '';

    // Hide system-generated emails
    if (realEmail.includes('@dontblink.app')) {
        realEmail = '';
    }

    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(realName);
    const [email, setEmail] = useState(realEmail);
    // Logic: If user has a photoURL, use it. Otherwise, defaults to empty (show icon).
    const [avatarUrl, setAvatarUrl] = useState(user?.photoURL || '');

    const [tempUsername, setTempUsername] = useState(username);
    const [tempAvatarUrl, setTempAvatarUrl] = useState(avatarUrl);

    const handleEditToggle = () => {
        if (isEditing) {
            // Cancel editing
            setTempUsername(username);
            setTempAvatarUrl(avatarUrl);
            setIsEditing(false);
        } else {
            // Start editing
            setTempUsername(username);
            setTempAvatarUrl(avatarUrl);
            setIsEditing(true);
        }
    };

    const handleSave = async () => {
        if (!user) return;

        try {
            // Reconstruct displayName with new username and existing real email
            // (Using the currently stored 'email' state which holds the Real Email)
            const newDisplayName = `${tempUsername}|${email}`;

            // Mock update
            // await updateProfile(user, {
            //     displayName: newDisplayName,
            //     photoURL: tempAvatarUrl
            // });
            console.log('Mock Updated Profile:', newDisplayName);

            setUsername(tempUsername);
            setAvatarUrl(tempAvatarUrl);
            setIsEditing(false);
            // Optional success feedback?
        } catch (error: any) {
            console.error('Update profile error:', error);
            // Alert can be added here if imported, but for now console error is consistent with previous patterns or we can stick to silent unless explicitly user facing
            alert('Failed to update profile: ' + error.message);
        }
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setTempAvatarUrl(result.assets[0].uri);
        }
    };


    const content = (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
        >
            {/* User Info */}
            <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                    {(isEditing ? tempAvatarUrl : avatarUrl) ? (
                        <Image
                            source={{ uri: isEditing ? tempAvatarUrl : avatarUrl }}
                            style={[styles.avatar, { borderColor: theme.primary }]}
                        />
                    ) : (
                        <View style={[styles.avatar, { backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', borderColor: theme.primary }]}>
                            <Ionicons name="person" size={40} color={theme.textMuted} />
                        </View>
                    )}
                    {!isEditing && (
                        <View style={[styles.levelBadge, { backgroundColor: theme.backgroundEnd, borderColor: theme.primary, shadowColor: theme.glow }]}>
                            <Text style={[styles.levelText, { color: theme.primary }]}>LVL 12</Text>
                        </View>
                    )}
                </View>

                {isEditing ? (
                    <View style={styles.editForm}>
                        <NeonInput
                            icon="person.fill"
                            placeholder="Username"
                            value={tempUsername}
                            onChangeText={setTempUsername}
                            editable={true}
                        />
                        {/* Email is read-only for now as it maps to auth credentials */}
                        <NeonInput
                            icon="envelope.fill"
                            placeholder="Email"
                            value={email}
                            editable={false}
                            style={{ opacity: 0.5 }}
                        />

                        <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
                            <View style={styles.uploadButtonContent}>
                                <Ionicons name="camera" size={20} color={theme.textMuted} />
                                <Text style={styles.uploadButtonText}>Change Avatar</Text>
                            </View>
                        </TouchableOpacity>
                        <NeonButton
                            title="SAVE CHANGES"
                            onPress={handleSave}
                            style={styles.saveButton}
                        />
                    </View>
                ) : (
                    <>
                        <Text style={[styles.username, { color: theme.textWhite }]}>{username}</Text>
                        <Text style={[styles.email, { color: theme.textMuted }]}>{email}</Text>
                        <Text style={[styles.joinDate, { color: theme.textMuted }]}>Member since Jan 2026</Text>
                    </>
                )}
            </View>

            {/* Stats Grid */}
            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={[styles.statLabel, { color: theme.textMuted }]}>WINS</Text>
                    <Text style={[styles.statValue, { color: theme.textWhite }]}>42</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={[styles.statLabel, { color: theme.textMuted }]}>WIN RATE</Text>
                    <Text style={[styles.statValue, { color: theme.textWhite }]}>68%</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={[styles.statLabel, { color: theme.textMuted }]}>STREAK</Text>
                    <Text style={[styles.statValue, { color: theme.textWhite }]}>5</Text>
                </View>
            </View>

            {/* Best Time */}
            <View style={styles.bestTimeContainer}>
                <View style={styles.bestTimeLabelRow}>
                    <Ionicons name="stopwatch" size={20} color={theme.primary} />
                    <Text style={[styles.bestTimeLabel, { color: theme.textWhite }]}>BEST TIME</Text>
                </View>
                <Text style={[styles.bestTimeValue, { color: theme.primary }]}>02:45.33</Text>
            </View>

            {/* Match History */}
            <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>RECENT MATCHES</Text>
            <View style={styles.historyList}>
                <MatchHistoryItem
                    result="WIN"
                    opponentName="StareKing"
                    score="01:30.22"
                    date="2 mins ago"
                />
                <MatchHistoryItem
                    result="WIN"
                    opponentName="Visionary"
                    score="00:55.10"
                    date="1 hour ago"
                />
                <MatchHistoryItem
                    result="LOSS"
                    opponentName="BlinkMaster"
                    score="00:12.05"
                    date="Yesterday"
                />
                <MatchHistoryItem
                    result="WIN"
                    opponentName="Newbie"
                    score="02:10.00"
                    date="3 days ago"
                />
            </View>
        </ScrollView>
    );

    return (
        <GradientBackground>
            <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: theme.textWhite }]}>PROFILE</Text>
                    <TouchableOpacity onPress={handleEditToggle}>
                        <Ionicons name={isEditing ? "close" : "pencil"} size={24} color={theme.primary} />
                    </TouchableOpacity>
                </View>

                {Platform.OS === 'ios' ? (
                    <KeyboardAvoidingView
                        behavior="padding"
                        style={{ flex: 1 }}
                    >
                        {content}
                    </KeyboardAvoidingView>
                ) : (
                    <View style={{ flex: 1 }}>
                        {content}
                    </View>
                )}
            </View>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontFamily: FONTS.bold,
        letterSpacing: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatarContainer: {
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
    },
    levelBadge: {
        position: 'absolute',
        bottom: -5,
        alignSelf: 'center',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
    },
    levelText: {
        fontFamily: FONTS.bold,
        fontSize: 10,
    },
    editForm: {
        width: '100%',
        gap: 12,
        marginBottom: 20,
    },
    saveButton: {
        marginTop: 10,
    },
    username: {
        fontSize: 24,
        fontFamily: FONTS.bold,
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        fontFamily: FONTS.regular,
        marginBottom: 8,
    },
    uploadButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        height: 56,
        marginBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    uploadButtonText: {
        fontFamily: FONTS.medium,
        fontSize: 16,
    },

    joinDate: {
        fontSize: 12,
        fontFamily: FONTS.regular,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statBox: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    statLabel: {
        fontFamily: FONTS.bold,
        fontSize: 10,
        marginBottom: 4,
        letterSpacing: 1,
    },
    statValue: {
        fontFamily: FONTS.bold,
        fontSize: 20,
    },
    bestTimeContainer: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bestTimeLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bestTimeLabel: {
        fontFamily: FONTS.bold,
        fontSize: 14,
        marginLeft: 8,
        letterSpacing: 1,
    },
    bestTimeValue: {
        fontFamily: FONTS.mono,
        fontSize: 24,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontFamily: FONTS.bold,
        fontSize: 12,
        letterSpacing: 1,
        marginBottom: 12,
    },
    historyList: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingBottom: 4, // compensator for last item border
    },
});
