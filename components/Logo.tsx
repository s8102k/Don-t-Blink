import { useTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export function Logo() {
    const { theme } = useTheme();

    return (
        <View style={styles.container}>
            <View style={[styles.glowContainer, {
                backgroundColor: theme.surface === '#001020' ? 'rgba(0, 240, 255, 0.1)' : 'rgba(42, 14, 38, 0.5)',
                borderColor: theme.overlay,
                shadowColor: theme.primary,
            }]}>
                <Ionicons name="eye" size={64} color={theme.primary} />
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
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        // Shadow/Glow effect
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 10,
    },
});
