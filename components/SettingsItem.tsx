import { FONTS, useTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    type?: 'toggle' | 'link' | 'button';
    value?: boolean;
    onValueChange?: (value: boolean) => void;
    onPress?: () => void;
    isDestructive?: boolean;
}

export function SettingsItem({
    icon,
    label,
    type = 'link',
    value = false,
    onValueChange,
    onPress,
    isDestructive = false
}: Props) {
    const { theme } = useTheme();
    const iconColor = isDestructive ? '#FF453A' : theme.textWhite;
    const textColor = isDestructive ? '#FF453A' : theme.textWhite;

    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor: theme.surface }]}
            onPress={type !== 'toggle' ? onPress : undefined}
            activeOpacity={type === 'toggle' ? 1 : 0.7}
            disabled={type === 'toggle'}
        >
            <View style={[styles.iconContainer, { backgroundColor: theme.overlay }]}>
                <Ionicons name={icon} size={20} color={iconColor} />
            </View>

            <Text style={[styles.label, { color: textColor }]}>{label}</Text>

            <View style={styles.actionContainer}>
                {type === 'toggle' && (
                    <Switch
                        value={value}
                        onValueChange={onValueChange}
                        trackColor={{ false: '#3A3A3C', true: theme.primary }}
                        thumbColor={theme.textWhite}
                        ios_backgroundColor="#3A3A3C"
                    />
                )}
                {type === 'link' && (
                    <Ionicons name="chevron-forward" size={20} color={theme.textMuted} />
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    label: {
        flex: 1,
        fontSize: 16,
        fontFamily: FONTS.medium,
        letterSpacing: 0.5,
    },
    actionContainer: {
        marginLeft: 8,
    },
});
