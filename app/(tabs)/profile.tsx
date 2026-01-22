import { GradientBackground } from '@/components/GradientBackground';
import { MatchHistoryItem } from '@/components/MatchHistoryItem';
import { NeonButton } from '@/components/NeonButton';
import { NeonInput } from '@/components/NeonInput';
import { auth } from '@/config/firebase';
import { FONTS, Palette } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

import { signOut, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const user = auth.currentUser;

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

            await updateProfile(user, {
                displayName: newDisplayName,
                photoURL: tempAvatarUrl
            });

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

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error: any) {
            console.error('Logout error:', error);
            // Optional: Alert.alert('Error logging out', error.message);
        } finally {
            // Always navigate to sign-in
            router.replace('/sign-in');
        }
    };

    return (
        <GradientBackground>
            <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
                <View style={styles.header}>
                    <Text style={styles.title}>PROFILE</Text>
                    <TouchableOpacity onPress={handleEditToggle}>
                        <Ionicons name={isEditing ? "close" : "pencil"} size={24} color={Palette.primaryPink} />
                    </TouchableOpacity>
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
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
                                        style={styles.avatar}
                                    />
                                ) : (
                                    <View style={[styles.avatar, { backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }]}>
                                        <Ionicons name="person" size={40} color={Palette.textMuted} />
                                    </View>
                                )}
                                {!isEditing && (
                                    <View style={styles.levelBadge}>
                                        <Text style={styles.levelText}>LVL 12</Text>
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
                                            <Ionicons name="camera" size={20} color={Palette.textMuted} />
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
                                    <Text style={styles.username}>{username}</Text>
                                    <Text style={styles.email}>{email}</Text>
                                    <Text style={styles.joinDate}>Member since Jan 2026</Text>
                                </>
                            )}
                        </View>

                        {/* Stats Grid */}
                        <View style={styles.statsContainer}>
                            <View style={styles.statBox}>
                                <Text style={styles.statLabel}>WINS</Text>
                                <Text style={styles.statValue}>42</Text>
                            </View>
                            <View style={styles.statBox}>
                                <Text style={styles.statLabel}>WIN RATE</Text>
                                <Text style={styles.statValue}>68%</Text>
                            </View>
                            <View style={styles.statBox}>
                                <Text style={styles.statLabel}>STREAK</Text>
                                <Text style={styles.statValue}>5</Text>
                            </View>
                        </View>

                        {/* Best Time */}
                        <View style={styles.bestTimeContainer}>
                            <View style={styles.bestTimeLabelRow}>
                                <Ionicons name="stopwatch" size={20} color={Palette.primaryPink} />
                                <Text style={styles.bestTimeLabel}>BEST TIME</Text>
                            </View>
                            <Text style={styles.bestTimeValue}>02:45.33</Text>
                        </View>

                        {/* Match History */}
                        <Text style={styles.sectionTitle}>RECENT MATCHES</Text>
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

                        <NeonButton
                            title="LOG OUT"
                            onPress={handleLogout}
                            style={{ marginTop: 30, marginBottom: 20 }}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
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
        color: Palette.textWhite,
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
        borderColor: Palette.primaryPink,
    },
    levelBadge: {
        position: 'absolute',
        bottom: -5,
        alignSelf: 'center',
        backgroundColor: '#1A0518',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Palette.primaryPink,
    },
    levelText: {
        color: Palette.primaryPink,
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
        color: Palette.textWhite,
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        fontFamily: FONTS.regular,
        color: Palette.textMuted,
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
        color: Palette.textMuted,
        fontFamily: FONTS.medium,
        fontSize: 16,
    },

    joinDate: {
        fontSize: 12,
        fontFamily: FONTS.regular,
        color: Palette.textMuted,
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
        color: Palette.textMuted,
        fontFamily: FONTS.bold,
        fontSize: 10,
        marginBottom: 4,
        letterSpacing: 1,
    },
    statValue: {
        color: Palette.textWhite,
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
        color: Palette.textWhite,
        fontFamily: FONTS.bold,
        fontSize: 14,
        marginLeft: 8,
        letterSpacing: 1,
    },
    bestTimeValue: {
        color: Palette.primaryPink,
        fontFamily: FONTS.mono,
        fontSize: 24,
        fontWeight: 'bold',
    },
    sectionTitle: {
        color: Palette.textMuted,
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
