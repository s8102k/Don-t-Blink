import { IconSymbol } from '@/components/ui/icon-symbol';
import { FONTS, Palette } from '@/constants/theme';
import React, { useState } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, TouchableOpacity, View, ViewStyle } from 'react-native';

// Extract the name type from IconSymbol's props definition if possible, 
// or manually define it based on the keys we know are valid.
// Since IconSymbol expors IconSymbolName (but it wasn't exported in the file I saw, actually it was defined but not exported in the non-ios file? 
// Wait, looking back at icon-symbol.tsx: `type IconSymbolName = keyof typeof MAPPING;` is not exported.
// I should rely on the ComponentProps of IconSymbol or just 'any' for now to be safe, or modify icon-symbol to export it.
// Let's modify icon-symbol to export it? No, let's just use string and cast or assume valid for now to avoid back and forth.
// Actually, looking at the code for icon-symbol.tsx again: `export function IconSymbol({ name }: { name: IconSymbolName ... })`
// It doesn't export the type. I'll just use React.ComponentProps<typeof IconSymbol>['name'].

type IconName = React.ComponentProps<typeof IconSymbol>['name'];

interface NeonInputProps extends TextInputProps {
    icon?: IconName;
    isPassword?: boolean;
}

export function NeonInput({ icon, isPassword, style, ...props }: NeonInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={[
            styles.container,
            isFocused && styles.containerFocused,
            style as StyleProp<ViewStyle>
        ]}>
            {icon && (
                <View style={styles.iconContainer}>
                    <IconSymbol
                        name={icon}
                        size={20}
                        color={isFocused ? Palette.primaryPink : Palette.textMuted}
                    />
                </View>
            )}
            <TextInput
                style={styles.input}
                placeholderTextColor={Palette.textMuted}
                secureTextEntry={isPassword && !showPassword}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                selectionColor={Palette.primaryPink}
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
                        color={Palette.textMuted}
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
    containerFocused: {
        borderColor: Palette.primaryPink,
        shadowColor: Palette.primaryPink,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 4, // for android
    },
    iconContainer: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        height: '100%',
        color: Palette.textWhite,
        fontFamily: FONTS.medium,
        fontSize: 16,
        // @ts-ignore - Web only prop
        outlineStyle: 'none' as any,
    },
    eyeIcon: {
        padding: 8,
    },
});
