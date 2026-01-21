import { Palette } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
    progress?: number; // 0 to 1
}

export function ProgressBar({ progress = 0.85 }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.labelContainer}>

                <Text style={styles.percent}>{Math.round(progress * 100)}%</Text>
            </View>
            <View style={styles.barBackground}>
                <LinearGradient
                    colors={[Palette.primaryPink, '#C70063']} // Gradient for bar
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.barFill, { width: `${progress * 100}%` }]}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 40,
        marginBottom: 40,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        color: '#D04090', // Muted pink
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    percent: {
        color: Palette.textMuted,
        fontSize: 12,
    },
    barBackground: {
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        borderRadius: 2,
    },
});
