import { Palette } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#1A0518', // Palette.backgroundEnd
                    borderTopColor: 'rgba(255,255,255,0.1)',
                    height: Platform.OS === 'ios' ? 88 : 60,
                    paddingBottom: Platform.OS === 'ios' ? 28 : 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: Palette.primaryPink,
                tabBarInactiveTintColor: Palette.textMuted,
                tabBarShowLabel: false,
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ color }) => <Ionicons name="grid" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="leaderboard"
                options={{
                    tabBarIcon: ({ color }) => <Ionicons name="trophy" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
