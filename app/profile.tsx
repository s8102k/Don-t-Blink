import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

const MATCH_HISTORY = [
    { id: '1', result: 'WIN', opponent: 'SpeedDemon', time: '2 mins ago' },
    { id: '2', result: 'LOSS', opponent: 'BlinkMaster', time: '15 mins ago' },
    { id: '3', result: 'WIN', opponent: 'EyeSpy', time: '1 hour ago' },
];

export default function ProfileScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>PROFILE</Text>
                <TouchableOpacity onPress={() => router.push('/settings' as any)} style={styles.iconBtn}>
                    <Ionicons name="settings-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Profile Header */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatarRing}>
                            <Image source={{ uri: 'https://placehold.co/150x150/F5DEB3/333/png?text=👤' }} style={styles.avatar} />
                        </View>
                        <TouchableOpacity style={styles.editBadge}>
                            <Ionicons name="pencil" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.username}>FaceJudge_99</Text>
                    <View style={styles.levelBadge}>
                        <Text style={styles.levelText}>Lvl 12</Text>
                        <View style={styles.levelDivider} />
                        <Text style={styles.rankText}>MASTER WATCHER</Text>
                    </View>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>WINS</Text>
                        <Text style={styles.statValue}>142</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>RANK</Text>
                        <Text style={styles.statValue}>#405</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>RATIO</Text>
                        <Text style={[styles.statValue, { color: Colors.dark.primary }]}>78%</Text>
                    </View>
                </View>

                {/* CTA */}
                <View style={styles.ctaSection}>
                    <TouchableOpacity style={styles.playButton} onPress={() => router.push('/countdown' as any)}>
                        <Text style={styles.playButtonText}>Play Now</Text>
                        <Ionicons name="play" size={20} color="#fff" style={{ marginLeft: 8 }} />
                    </TouchableOpacity>

                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.secondaryButton}>
                            <Text style={styles.secondaryButtonText}>Edit Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondaryButton}>
                            <Text style={styles.secondaryButtonText}>Detailed Stats</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Match History */}
                <View style={styles.historySection}>
                    <View style={styles.historySectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Matches</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAllText}>VIEW ALL</Text>
                        </TouchableOpacity>
                    </View>

                    {MATCH_HISTORY.map((match) => (
                        <View key={match.id} style={styles.historyItem}>
                            <Image
                                source={{ uri: `https://placehold.co/50x50/444/fff/png?text=${match.opponent[0]}` }}
                                style={styles.opponentAvatar}
                            />
                            <View style={styles.historyInfo}>
                                <Text style={styles.opponentText}>vs. {match.opponent}</Text>
                                <Text style={styles.timeText}>{match.time}</Text>
                            </View>
                            <View style={[
                                styles.resultBadge,
                                { backgroundColor: match.result === 'WIN' ? 'rgba(0,209,80,0.2)' : 'rgba(255,59,48,0.2)' }
                            ]}>
                                <Text style={[
                                    styles.resultText,
                                    { color: match.result === 'WIN' ? '#00D150' : '#FF3B30' }
                                ]}>{match.result}</Text>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D1B2E',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    headerTitle: {
        color: Colors.dark.primary,
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    iconBtn: {
        padding: 8,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    profileCard: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    avatarRing: {
        width: 130,
        height: 130,
        borderRadius: 65,
        borderWidth: 4,
        borderColor: Colors.dark.primary,
        padding: 4,
        shadowColor: Colors.dark.primary,
        shadowOpacity: 0.6,
        shadowRadius: 20,
        backgroundColor: '#000',
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
    },
    editBadge: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: Colors.dark.primary,
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#2D1B2E',
    },
    username: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    levelBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    levelText: {
        color: Colors.dark.primary,
        fontWeight: 'bold',
        fontSize: 11,
        letterSpacing: 1,
    },
    levelDivider: {
        width: 1,
        height: 12,
        backgroundColor: '#666',
        marginHorizontal: 10,
    },
    rankText: {
        color: '#888',
        fontWeight: 'bold',
        fontSize: 11,
        letterSpacing: 1,
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 30,
        gap: 10,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingVertical: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    statLabel: {
        color: '#888',
        fontSize: 10,
        letterSpacing: 1,
        marginBottom: 8,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    statValue: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
    },
    ctaSection: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    playButton: {
        backgroundColor: Colors.dark.primary,
        paddingVertical: 18,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        shadowColor: Colors.dark.primary,
        shadowOpacity: 0.4,
        shadowRadius: 10,
    },
    playButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 10,
    },
    secondaryButton: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingVertical: 16,
        borderRadius: 25,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    secondaryButtonText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
    },
    historySection: {
        paddingHorizontal: 20,
    },
    historySectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 0.5,
    },
    viewAllText: {
        color: Colors.dark.primary,
        fontSize: 11,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 15,
        borderRadius: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    opponentAvatar: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        marginRight: 12,
    },
    historyInfo: {
        flex: 1,
    },
    opponentText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2,
    },
    timeText: {
        color: '#666',
        fontSize: 11,
    },
    resultBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        minWidth: 50,
        alignItems: 'center',
    },
    resultText: {
        fontWeight: 'bold',
        fontSize: 11,
        letterSpacing: 0.5,
    },
});
