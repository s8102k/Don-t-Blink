import { GradientBackground } from '@/components/GradientBackground';
import { MatchHistoryItem } from '@/components/MatchHistoryItem';
import { FONTS, Palette } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const insets = useSafeAreaInsets();

    return (
        <GradientBackground>
            <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
                <View style={styles.header}>
                    <Text style={styles.title}>PROFILE</Text>
                    <Ionicons name="pencil" size={24} color={Palette.primaryPink} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* User Info */}
                    <View style={styles.profileHeader}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: 'https://i.pravatar.cc/150?u=42' }}
                                style={styles.avatar}
                            />
                            <View style={styles.levelBadge}>
                                <Text style={styles.levelText}>LVL 12</Text>
                            </View>
                        </View>
                        <Text style={styles.username}>You</Text>
                        <Text style={styles.joinDate}>Member since Jan 2026</Text>
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
                </ScrollView>
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
    username: {
        fontSize: 24,
        fontFamily: FONTS.bold,
        color: Palette.textWhite,
        marginBottom: 4,
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
