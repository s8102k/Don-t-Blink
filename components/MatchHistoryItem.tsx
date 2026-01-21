import { FONTS, Palette } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MatchHistoryItemProps {
    result: 'WIN' | 'LOSS';
    opponentName: string;
    score: string;
    date: string;
}

export function MatchHistoryItem({ result, opponentName, score, date }: MatchHistoryItemProps) {
    const isWin = result === 'WIN';

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <View style={[styles.resultIcon, isWin ? styles.winIcon : styles.lossIcon]}>
                    <Ionicons
                        name={isWin ? "trophy" : "close"}
                        size={16}
                        color={Palette.textWhite}
                    />
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.opponent}>vs {opponentName}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>

            <View style={styles.scoreContainer}>
                <Text style={[styles.resultText, isWin ? styles.winText : styles.lossText]}>
                    {result}
                </Text>
                <Text style={styles.score}>{score}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    iconContainer: {
        marginRight: 16,
    },
    resultIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    winIcon: {
        backgroundColor: '#4CAF50', // Green
    },
    lossIcon: {
        backgroundColor: '#F44336', // Red
    },
    infoContainer: {
        flex: 1,
    },
    opponent: {
        color: Palette.textWhite,
        fontFamily: FONTS.bold,
        fontSize: 16,
        marginBottom: 2,
    },
    date: {
        color: Palette.textMuted,
        fontFamily: FONTS.medium,
        fontSize: 12,
    },
    scoreContainer: {
        alignItems: 'flex-end',
    },
    resultText: {
        fontFamily: FONTS.bold,
        fontSize: 14,
        letterSpacing: 1,
        marginBottom: 2,
    },
    winText: {
        color: '#4CAF50',
    },
    lossText: {
        color: '#F44336',
    },
    score: {
        color: Palette.textMuted,
        fontFamily: FONTS.regular,
        fontSize: 12,
    },
});
