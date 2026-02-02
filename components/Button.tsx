import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline';
    icon?: keyof typeof Ionicons.glyphMap;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

export const Button = ({ title, variant = 'primary', icon, style, textStyle, ...props }: ButtonProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                variant === 'primary' && styles.primaryContainer,
                style
            ]}
            activeOpacity={0.8}
            {...props}
        >
            <Text style={[styles.text, textStyle]}>{title}</Text>
            {icon && <Ionicons name={icon} size={24} color="white" style={styles.icon} />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 56,
        borderRadius: 28, // Fully rounded capsular
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    primaryContainer: {
        backgroundColor: Colors.dark.primary,
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    icon: {
        marginLeft: 8,
    }
});
