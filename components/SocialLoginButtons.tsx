import { FONTS, Palette } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SocialLoginButtonsProps {
    onGooglePress: () => void;
    onApplePress: () => void;
    isLoading?: boolean;
}

export const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
    onGooglePress,
    onApplePress,
    isLoading = false
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>Or continue with</Text>
                <View style={styles.divider} />
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.socialButton}
                    onPress={onGooglePress}
                    disabled={isLoading}
                    activeOpacity={0.8}
                >
                    <Ionicons name="logo-google" size={24} color={Palette.textWhite} />
                    <Text style={styles.buttonText}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.socialButton}
                    onPress={onApplePress}
                    disabled={isLoading}
                    activeOpacity={0.8}
                >
                    <Ionicons name="logo-apple" size={24} color={Palette.textWhite} />
                    <Text style={styles.buttonText}>Apple</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 24,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    dividerText: {
        color: Palette.textMuted,
        marginHorizontal: 10,
        fontFamily: FONTS.regular,
        fontSize: 14,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 16,
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        gap: 10,
    },
    buttonText: {
        color: Palette.textWhite,
        fontFamily: FONTS.medium,
        fontSize: 16,
    },
});
