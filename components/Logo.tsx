import { Palette } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export function Logo() {
    return (
        <View style={styles.container}>
            <View style={styles.glowContainer}>
                <Ionicons name="eye" size={64} color={Palette.primaryPink} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    glowContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(42, 14, 38, 0.5)', // Subtle background
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 0, 127, 0.2)', // Pink barely visible border
        // Shadow/Glow effect
        shadowColor: Palette.primaryPink,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 10,
    },
});
