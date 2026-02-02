import React from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Input } from '../components/Input';
import { Colors } from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';

export default function SupportScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header with back button */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.header}>Support</Text>

                    <Input
                        label="Your Name"
                        placeholder="Enter your name"
                    />

                    <Input
                        label="Email Address"
                        placeholder="name@example.com"
                        keyboardType="email-address"
                    />

                    <Input
                        label="Subject"
                        placeholder="Reason for contacting"
                    />

                    <Input
                        label="What went wrong?"
                        placeholder="Describe your issue in detail..."
                        multiline
                        numberOfLines={5}
                        style={{ height: 120, textAlignVertical: 'top' }}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.sendButton}>
                            <Text style={styles.sendButtonText}>Send Message</Text>
                            <Ionicons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
    },
    headerContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 24,
    },
    scrollContent: {
        padding: 24,
    },
    buttonContainer: {
        marginTop: 20,
    },
    sendButton: {
        backgroundColor: Colors.dark.primary,
        paddingVertical: 18,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.dark.primary,
        shadowOpacity: 0.4,
        shadowRadius: 10,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
});
