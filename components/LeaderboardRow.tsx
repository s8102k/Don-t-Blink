import { FONTS, Palette } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface LeaderboardRowProps {
    rank: number;
    username: string;
    score: number;
    avatarUrl?: string;
    isCurrentUser?: boolean;
}

export function LeaderboardRow({ rank, username, score, avatarUrl, isCurrentUser }: LeaderboardRowProps) {
    const getRankColor = (r: number) => {
        switch (r) {
            case 1: return '#FFD700'; // Gold
            case 2: return '#C0C0C0'; // Silver
            case 3: return '#CD7F32'; // Bronze
            default: return Palette.textWhite;
        }
    };

    const isTop3 = rank <= 3;
    const rankColor = getRankColor(rank);

    return (
        <View style={[styles.container, isCurrentUser && styles.currentUserContainer]}>
            <View style={styles.rankContainer}>
                {isTop3 ? (
                    <Ionicons name="trophy" size={20} color={rankColor} />
                ) : (
                    <Text style={styles.rankText}>{rank}</Text>
                )}
            </View>

            <View style={styles.avatarContainer}>
                {avatarUrl ? (
                    <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                ) : (
                    <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarLetter}>{username.charAt(0).toUpperCase()}</Text>
                    </View>
                )}
            </View>

            <Text style={[styles.username, isCurrentUser && styles.currentUserName]} numberOfLines={1}>
                {username}
            </Text>

            <Text style={styles.score}>{score.toLocaleString()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        marginBottom: 8,
    },
    currentUserContainer: {
        backgroundColor: 'rgba(255, 0, 255, 0.15)',
        borderColor: Palette.primaryPink,
        borderWidth: 1,
    },
    rankContainer: {
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    rankText: {
        color: Palette.textMuted,
        fontFamily: FONTS.bold,
        fontSize: 16,
    },
    avatarContainer: {
        marginRight: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#3D2039',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarLetter: {
        color: Palette.textWhite,
        fontFamily: FONTS.bold,
        fontSize: 18,
    },
    username: {
        flex: 1,
        color: Palette.textWhite,
        fontFamily: FONTS.medium,
        fontSize: 16,
    },
    currentUserName: {
        color: Palette.primaryPink,
        fontFamily: FONTS.bold,
    },
    score: {
        color: Palette.primaryPink,
        fontFamily: FONTS.bold,
        fontSize: 16,
    },
});
