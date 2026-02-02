import { IconSymbol } from '@/components/ui/icon-symbol';
import { FONTS, useTheme } from '@/constants/theme';
import React, { useState } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, TouchableOpacity, View, ViewStyle } from 'react-native';

type IconName = React.ComponentProps<typeof IconSymbol>['name'];

interface NeonInputProps extends TextInputProps {
    icon?: IconName;
    isPassword?: boolean;
}

export function NeonInput({ icon, isPassword, style, value, onChangeText, ...props }: NeonInputProps) {
    const { theme } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={[
            styles.container,
            isFocused && {
                borderColor: theme.primary,
                shadowColor: theme.primary,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.5,
                shadowRadius: 8,
                elevation: 4,
            },
            style as StyleProp<ViewStyle>
        ]}>
            {icon && (
                <View style={styles.iconContainer}>
                    <IconSymbol
                        name={icon}
                        size={20}
                        color={isFocused ? theme.primary : theme.textMuted}
                    />
                </View>
            )}
            <TextInput
                style={[styles.input, { color: theme.textWhite }]}
                placeholderTextColor={theme.textMuted}
                secureTextEntry={isPassword && !showPassword}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                selectionColor={theme.primary}
                value={value}
                onChangeText={onChangeText}
                {...props}
            />
            {isPassword && (
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                >
                    <IconSymbol
                        name={showPassword ? 'eye.slash.fill' : 'eye.fill'}
                        size={20}
                        color={theme.textMuted}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        height: 56,
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    iconContainer: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        height: '100%',
        fontFamily: FONTS.medium,
        fontSize: 16,
        textAlignVertical: 'center',
        // @ts-ignore - Web only prop
        outlineStyle: 'none' as any,
    },
    eyeIcon: {
        padding: 8,
    },
});
