import { GradientBackground } from '@/components/GradientBackground';
import { LeaderboardRow } from '@/components/LeaderboardRow';
import { FONTS, Palette } from '@/constants/theme';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Mock Data
const LEADERBOARD_DATA = [
    { id: '1', username: 'BlinkMaster', score: 12500, rank: 1, avatarUrl: 'https://i.pravatar.cc/150?u=1' },
    { id: '2', username: 'EyeChampion', score: 11200, rank: 2, avatarUrl: 'https://i.pravatar.cc/150?u=2' },
    { id: '3', username: 'StareKing', score: 10500, rank: 3, avatarUrl: 'https://i.pravatar.cc/150?u=3' },
    { id: '4', username: 'NoBlinkY', score: 9800, rank: 4, avatarUrl: 'https://i.pravatar.cc/150?u=4' },
    { id: '5', username: 'LaserFocus', score: 9200, rank: 5 },
    { id: '6', username: 'WideEyed', score: 8700, rank: 6 },
    { id: '7', username: 'Watcher', score: 8100, rank: 7 },
    { id: '8', username: 'SeeAll', score: 7600, rank: 8 },
    { id: '9', username: 'EagleEye', score: 7200, rank: 9 },
    { id: '10', username: 'Visionary', score: 6800, rank: 10 },
];

const CURRENT_USER = { id: '42', username: 'You', score: 5400, rank: 42 };

export default function LeaderboardScreen() {
    const insets = useSafeAreaInsets();
    const [filter, setFilter] = useState<'global' | 'friends'>('global');

    return (
        <GradientBackground>
            <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
                <Text style={styles.title}>LEADERBOARD</Text>

                {/* Filter Toggle */}
                <View style={styles.filterContainer}>
                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'global' && styles.filterActive]}
                        onPress={() => setFilter('global')}>
                        <Text style={[styles.filterText, filter === 'global' && styles.filterTextActive]}>GLOBAL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'friends' && styles.filterActive]}
                        onPress={() => setFilter('friends')}>
                        <Text style={[styles.filterText, filter === 'friends' && styles.filterTextActive]}>FRIENDS</Text>
                    </TouchableOpacity>
                </View>

                {/* List */}
                <FlatList
                    data={LEADERBOARD_DATA}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <LeaderboardRow
                            rank={item.rank}
                            username={item.username}
                            score={item.score}
                            avatarUrl={item.avatarUrl}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />

                {/* User Rank Footer */}
                <View style={[styles.userRankFooter, { paddingBottom: insets.bottom + 10 }]}>
                    <LeaderboardRow
                        rank={CURRENT_USER.rank}
                        username={CURRENT_USER.username}
                        score={CURRENT_USER.score}
                        isCurrentUser
                    />
                </View>
            </View>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 32,
        fontFamily: FONTS.bold,
        color: Palette.textWhite,
        letterSpacing: 1,
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    filterContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        padding: 4,
        marginHorizontal: 20,
        marginBottom: 20,
    },
    filterButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 8,
    },
    filterActive: {
        backgroundColor: Palette.primaryPink,
    },
    filterText: {
        color: Palette.textMuted,
        fontFamily: FONTS.bold,
        fontSize: 12,
        letterSpacing: 1,
    },
    filterTextActive: {
        color: Palette.textWhite,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 100, // Space for footer
    },
    userRankFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1A0518',
        paddingHorizontal: 20,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
});
