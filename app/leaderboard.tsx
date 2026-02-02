import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const DUMMY_DATA = [
    { id: '1', name: '@blinkm...', score: 9450, rank: 1, avatar: 'https://placehold.co/100x100/FF00A8/FFF/png?text=1' },
    { id: '2', name: '@stareking', score: 8200, rank: 2, avatar: 'https://placehold.co/100x100/FFB84D/FFF/png?text=2' },
    { id: '3', name: '@eyesop...', score: 7800, rank: 3, avatar: 'https://placehold.co/100x100/666/FFF/png?text=3' },
    { id: '4', name: '@jessica_eyes', score: 7420, rank: 4, avatar: 'https://placehold.co/100x100/8B7355/FFF/png?text=J' },
    { id: '5', name: '@dontblink_tom', score: 6950, rank: 5, avatar: 'https://placehold.co/100x100/D4A574/FFF/png?text=T' },
    { id: '6', name: '@cyber_gazer', score: 6210, rank: 6, avatar: 'https://placehold.co/100x100/9B8B7E/FFF/png?text=C' },
    { id: '7', name: '@sarah_winks', score: 5800, rank: 7, avatar: 'https://placehold.co/100x100/B8A490/FFF/png?text=S' },
    { id: '8', name: '@you', score: 4240, rank: 243, avatar: 'https://placehold.co/100x100/FF00A8/FFF/png?text=U' },
    { id: '9', name: '@blink_183', score: 4920, rank: 9, avatar: 'https://placehold.co/100x100/A0A0A0/FFF/png?text=B' },
];

const TabButton = ({ title, active, onPress }: { title: string, active: boolean, onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} style={[styles.tabBtn, active && styles.tabBtnActive]}>
        <Text style={[styles.tabText, active && styles.tabTextActive]}>{title}</Text>
    </TouchableOpacity>
);

export default function LeaderboardScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Weekly');

    const topThree = DUMMY_DATA.slice(0, 3);
    const restList = DUMMY_DATA.slice(3);

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Leaderboard</Text>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/settings' as any)}>
                    <Ionicons name="settings-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.tabsContainer}>
                <TabButton title="WEEKLY" active={activeTab === 'Weekly'} onPress={() => setActiveTab('Weekly')} />
                <TabButton title="GLOBAL" active={activeTab === 'Global'} onPress={() => setActiveTab('Global')} />
                <TabButton title="FRIENDS" active={activeTab === 'Friends'} onPress={() => setActiveTab('Friends')} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Podium Section */}
                <View style={styles.podiumContainer}>
                    {/* 2nd Place */}
                    <View style={[styles.podiumItem, { marginTop: 40 }]}>
                        <View style={styles.podiumAvatarContainer}>
                            <Image source={{ uri: topThree[1].avatar }} style={styles.podiumAvatar} />
                            <View style={styles.rankBadgeSecondary}><Text style={styles.rankText}>2</Text></View>
                        </View>
                        <Text style={styles.podiumName}>{topThree[1].name}</Text>
                        <Text style={styles.podiumScore}>{topThree[1].score}</Text>
                    </View>

                    {/* 1st Place */}
                    <View style={[styles.podiumItem, { zIndex: 10 }]}>
                        <View style={styles.crownIcon}><Ionicons name="trophy" size={24} color="#FFD700" /></View>
                        <View style={[styles.podiumAvatarContainer, styles.firstPlaceRing]}>
                            <Image source={{ uri: topThree[0].avatar }} style={styles.podiumAvatar} />
                            <View style={styles.rankBadgePrimary}><Text style={styles.rankText}>1</Text></View>
                        </View>
                        <Text style={[styles.podiumName, { fontSize: 16 }]}>{topThree[0].name}</Text>
                        <Text style={[styles.podiumScore, { fontSize: 14 }]}>{topThree[0].score}</Text>
                    </View>

                    {/* 3rd Place */}
                    <View style={[styles.podiumItem, { marginTop: 50 }]}>
                        <View style={styles.podiumAvatarContainer}>
                            <Image source={{ uri: topThree[2].avatar }} style={styles.podiumAvatar} />
                            <View style={styles.rankBadgeSecondary}><Text style={styles.rankText}>3</Text></View>
                        </View>
                        <Text style={styles.podiumName}>{topThree[2].name}</Text>
                        <Text style={styles.podiumScore}>{topThree[2].score}</Text>
                    </View>
                </View>

                {/* List Section */}
                <View style={styles.listContainer}>
                    {restList.map((item) => (
                        <View key={item.id} style={styles.listItem}>
                            <Text style={styles.listRank}>{item.rank}</Text>
                            <Image source={{ uri: item.avatar }} style={styles.listAvatar} />
                            <Text style={styles.listName}>{item.name}</Text>
                            <Text style={styles.listScore}>{item.score}</Text>
                        </View>
                    ))}
                </View>

            </ScrollView>

            {/* My Rank Footer */}
            <View style={styles.footerRank}>
                <Text style={styles.footerRankNumber}>243</Text>
                <Image source={{ uri: 'https://placehold.co/100x100/FF00A8/FFF/png?text=U' }} style={styles.listAvatar} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.listName}>@you</Text>
                    <Text style={styles.upPlacesText}>↑ Up 3 places</Text>
                </View>
                <Text style={styles.listScore}>4,240</Text>
            </View>

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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    backBtn: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: 1,
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: '#1E1624',
        marginHorizontal: 20,
        borderRadius: 25,
        padding: 4,
    },
    tabBtn: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 20,
    },
    tabBtnActive: {
        backgroundColor: '#332E38',
    },
    tabText: {
        color: '#888',
        fontSize: 12,
        fontWeight: 'bold',
    },
    tabTextActive: {
        color: '#fff',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    podiumContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    podiumItem: {
        alignItems: 'center',
        width: 100,
    },
    crownIcon: {
        marginBottom: -10,
        zIndex: 10,
    },
    podiumAvatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#333',
        marginBottom: 10,
        position: 'relative',
    },
    firstPlaceRing: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: Colors.dark.primary,
        shadowColor: Colors.dark.primary,
        shadowOpacity: 0.6,
        shadowRadius: 15,
    },
    podiumAvatar: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    rankBadgePrimary: {
        position: 'absolute',
        bottom: -10,
        alignSelf: 'center',
        backgroundColor: '#FFD700',
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rankBadgeSecondary: {
        position: 'absolute',
        bottom: -10,
        alignSelf: 'center',
        backgroundColor: '#444',
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#666',
    },
    rankText: {
        color: '#000',
        fontSize: 12,
        fontWeight: 'bold',
    },
    podiumName: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 4,
    },
    podiumScore: {
        color: Colors.dark.primary,
        fontWeight: 'bold',
        fontSize: 12,
    },
    listContainer: {
        paddingHorizontal: 20,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E1624',
        padding: 15,
        borderRadius: 15,
        marginBottom: 10,
    },
    listRank: {
        color: '#666',
        fontWeight: 'bold',
        fontSize: 16,
        width: 30,
        textAlign: 'center',
    },
    listAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 15,
    },
    listName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
    },
    listScore: {
        color: Colors.dark.primary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    footerRank: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#2D2235',
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#332E38',
    },
    footerRankNumber: {
        color: '#666',
        fontWeight: 'bold',
        fontSize: 16,
        width: 30,
        textAlign: 'center',
    },
    upPlacesText: {
        color: '#4CAF50',
        fontSize: 12,
        marginTop: 2,
    }
});
