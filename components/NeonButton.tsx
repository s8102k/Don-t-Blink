import { FONTS, useTheme } from '@/constants/theme';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface NeonButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline';
    isLoading?: boolean;
}

export function NeonButton({ title, variant = 'primary', isLoading, style, disabled, ...props }: NeonButtonProps) {
    const { theme } = useTheme();
    const isPrimary = variant === 'primary';
    const isOutline = variant === 'outline';

    return (
        <TouchableOpacity
            style={[
                styles.container,
                isPrimary && {
                    backgroundColor: theme.primary,
                    shadowColor: theme.primary,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                    elevation: 6,
                },
                isOutline && {
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderColor: theme.primary,
                },
                disabled && styles.disabled,
                style
            ]}
            disabled={disabled || isLoading}
            activeOpacity={0.8}
            {...props}
        >
            {isLoading ? (
                <ActivityIndicator color={isPrimary ? '#FFFFFF' : theme.primary} />
            ) : (
                <Text style={[
                    styles.text,
                    isPrimary && styles.textPrimary,
                    isOutline && { color: theme.primary },
                    disabled && styles.textDisabled
                ]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 16,
        paddingHorizontal: 24,
    },
    disabled: {
        opacity: 0.6,
    },
    text: {
        fontFamily: FONTS.bold,
        fontSize: 16,
        letterSpacing: 1,
        fontWeight: '700',
    },
    textPrimary: {
        color: '#FFFFFF',
    },
    textDisabled: {
        color: '#CCCCCC',
    },
});
