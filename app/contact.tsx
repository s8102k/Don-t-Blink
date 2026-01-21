import { GradientBackground } from '@/components/GradientBackground';
import { FONTS, Palette } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ContactScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        Alert.alert('Message Sent', 'Thank you for reaching out! We will get back to you shortly.', [
            { text: 'OK', onPress: () => router.back() }
        ]);
    };

    return (
        <GradientBackground>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={Palette.textWhite} />
                    </TouchableOpacity>
                    <Text style={styles.title}>CONTACT SUPPORT</Text>
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.keyboardAvoid}
                >
                    <ScrollView contentContainerStyle={styles.content}>
                        <Text style={styles.subtitle}>
                            Have a question or feedback? Fill out the form below and we'll be in touch.
                        </Text>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your name"
                                placeholderTextColor={Palette.textMuted}
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor={Palette.textMuted}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Message</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="How can we help?"
                                placeholderTextColor={Palette.textMuted}
                                value={message}
                                onChangeText={setMessage}
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.submitButtonText}>SEND MESSAGE</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    keyboardAvoid: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
    backButton: {
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontFamily: FONTS.bold,
        color: Palette.textWhite,
        letterSpacing: 1,
    },
    content: {
        padding: 20,
    },
    subtitle: {
        fontSize: 14,
        color: Palette.textMuted,
        fontFamily: FONTS.regular,
        marginBottom: 32,
        lineHeight: 20,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 12,
        color: Palette.primaryPink,
        fontFamily: FONTS.bold,
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 8,
        padding: 16,
        color: Palette.textWhite,
        fontFamily: FONTS.regular,
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    textArea: {
        minHeight: 120,
    },
    submitButton: {
        backgroundColor: Palette.primaryPink,
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: Palette.primaryPink,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    submitButtonText: {
        color: Palette.textWhite,
        fontFamily: FONTS.bold,
        fontSize: 16,
        letterSpacing: 1,
    },
});
