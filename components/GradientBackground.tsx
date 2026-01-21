import { Palette } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';

interface Props {
    children: React.ReactNode;
    style?: ViewStyle;
}

export function GradientBackground({ children, style }: Props) {
    return (
        <LinearGradient
            colors={[Palette.backgroundStart, Palette.backgroundEnd]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={[styles.container, style]}
        >
            {children}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
