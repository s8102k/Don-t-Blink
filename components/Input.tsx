import React from 'react';
import { StyleSheet, TextInput, View, Text, TextInputProps } from 'react-native';
import { Colors } from '../constants/Colors';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
}

export const Input = ({ label, error, style, ...props }: InputProps) => {
    return (
        <View style={styles.wrapper}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputContainer}>
                <TextInput
                    placeholderTextColor={Colors.dark.textSecondary}
                    style={[styles.input, style]}
                    {...props}
                />
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 20,
        width: '100%',
    },
    label: {
        color: Colors.dark.text,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    inputContainer: {
        backgroundColor: '#2A242F', // Slightly lighter than background
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#38303F',
        paddingHorizontal: 16,
        paddingVertical: 4, // TextInput has its own height/padding, this container adds structure
    },
    input: {
        color: Colors.dark.text,
        fontSize: 16,
        height: 50,
    },
    error: {
        color: Colors.dark.error,
        fontSize: 12,
        marginTop: 4,
    },
});
