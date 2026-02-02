
import { GradientBackground } from '@/components/GradientBackground';
import { FONTS, useTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function LandingScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();

    return (
        <GradientBackground>
            <View style={[styles.container, { paddingTop: insets.top }]}>
                {/* Header / Nav */}
                <View style={styles.navBar}>
                    <View style={styles.logoRow}>
                        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 8 }}>
                            <Ionicons name="arrow-back" size={24} color={theme.textWhite} />
                        </TouchableOpacity>
                        <Ionicons name="eye-outline" size={24} color={theme.textWhite} />
                        <Text style={[styles.logoText, { color: theme.textWhite }]}>DON'T BLINK</Text>
                    </View>
                    <TouchableOpacity style={[styles.playNowBtn, { backgroundColor: theme.primary, borderColor: theme.primary }]} onPress={() => router.push('/(tabs)/home')}>
                        <Text style={[styles.playNowText, { color: '#FFFFFF' }]}>Play Now</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* HERO SECTION */}
                    <View style={styles.heroSection}>
                        <Text style={styles.heroTitle}>DON'T{'\n'}<Text style={[styles.textPink, { color: theme.primary }]}>BLINK.</Text></Text>
                        <Text style={styles.heroSubtitle}>
                            The world's first AI-powered{'\n'}staring contest. Can you beat the{'\n'}clock?
                        </Text>

                        {/* Hero Image Mockup */}
                        <View style={styles.mockupContainer}>
                            <View style={[styles.mockupFrame, { borderColor: theme.glow }]}>
                                <View style={styles.mockupHeader}>
                                    <View style={[styles.liveBadge, { backgroundColor: theme.primary }]}><Text style={styles.liveText}>LIVE</Text></View>
                                </View>
                                {/* Wireframe Face Placeholder */}
                                <Image
                                    source={{ uri: 'https://img.freepik.com/free-vector/wireframe-human-head_1284-13175.jpg?w=740&t=st=1690000000~exp=1690000600~hmac=xyz' }} // Placeholder
                                    style={styles.mockupImage}
                                />
                                <View style={styles.mockupOverlay}>
                                    <View style={[styles.scanLine, { backgroundColor: theme.primary, shadowColor: theme.glow }]} />
                                    <Text style={[styles.timerText, { color: theme.primary }]}>00:03</Text>
                                    <Text style={styles.holdText}>HOLD YOUR GAZE...</Text>
                                    <View style={[styles.mockupBar, { backgroundColor: theme.primary }]} />
                                </View>
                            </View>
                        </View>

                        {/* App Store Button */}
                        <TouchableOpacity style={[styles.storeButton, { backgroundColor: theme.primary }]}>
                            <Ionicons name="logo-apple" size={24} color={theme.textWhite} />
                            <Text style={[styles.storeButtonText, { color: theme.textWhite }]}>Download on App Store</Text>
                        </TouchableOpacity>

                        <Text style={styles.webPlayText}>PLAY_INSTALLED</Text>
                    </View>

                    {/* HOW IT WORKS */}
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.textWhite }]}>HOW IT <Text style={{ color: theme.primary }}>WORKS</Text></Text>

                        <View style={styles.stepItem}>
                            <Text style={styles.stepNumber}>1</Text>
                            <Ionicons name="people-outline" size={40} color={theme.primary} />
                            <Text style={[styles.stepTitle, { color: theme.textWhite }]}>MATCH</Text>
                            <Text style={[styles.stepDesc, { color: theme.textMuted }]}>Find a global opponent in seconds.</Text>
                        </View>

                        <View style={styles.stepItem}>
                            <Text style={styles.stepNumber}>2</Text>
                            <Ionicons name="timer-outline" size={40} color={theme.primary} />
                            <Text style={[styles.stepTitle, { color: theme.textWhite }]}>COUNT DOWN</Text>
                            <Text style={[styles.stepDesc, { color: theme.textMuted }]}>3... 2... 1... Eyes locked on the screen.</Text>
                        </View>

                        <View style={styles.stepItem}>
                            <Text style={styles.stepNumber}>3</Text>
                            <Ionicons name="eye-off-outline" size={40} color={theme.primary} />
                            <Text style={[styles.stepTitle, { color: theme.textWhite }]}>DON'T BLINK</Text>
                            <Text style={[styles.stepDesc, { color: theme.textMuted }]}>The first person to blink loses.</Text>
                        </View>
                    </View>

                    {/* STATS */}
                    <View style={styles.statsCard}>
                        <Text style={styles.statsLabel}>TOTAL CHALLENGES</Text>
                        <Text style={styles.statsValue}>1.2M+</Text>
                        <Text style={styles.statsTrend}>📈 +12% this week</Text>
                    </View>

                    {/* FEATURES */}
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.textWhite }]}>THE ULTIMATE <Text style={{ color: theme.primary }}>STARE-{'\n'}DOWN</Text></Text>
                        <Text style={[styles.sectionSubtitle, { color: theme.textMuted }]}>Minimalist design meets cutting-edge neural eye tracking technology.</Text>

                        <View style={styles.featureRow}>
                            <View style={[styles.featureIconBox, { backgroundColor: theme.surface }]}>
                                <Ionicons name="scan-outline" size={24} color={theme.primary} />
                            </View>
                            <View style={styles.featureContent}>
                                <Text style={[styles.featureTitle, { color: theme.textWhite }]}>Face Tracking</Text>
                                <Text style={[styles.featureDesc, { color: theme.textMuted }]}>Subs millimeter eye position monitors every single twitch.</Text>
                            </View>
                        </View>

                        <View style={styles.featureRow}>
                            <View style={[styles.featureIconBox, { backgroundColor: theme.surface }]}>
                                <Ionicons name="bar-chart-outline" size={24} color={theme.primary} />
                            </View>
                            <View style={styles.featureContent}>
                                <Text style={[styles.featureTitle, { color: theme.textWhite }]}>Global Rankings</Text>
                                <Text style={[styles.featureDesc, { color: theme.textMuted }]}>Climb the ranks and become the world's best blinking human.</Text>
                            </View>
                        </View>

                        <View style={styles.featureRow}>
                            <View style={[styles.featureIconBox, { backgroundColor: theme.surface }]}>
                                <Ionicons name="videocam-outline" size={24} color={theme.primary} />
                            </View>
                            <View style={styles.featureContent}>
                                <Text style={[styles.featureTitle, { color: theme.textWhite }]}>Instant Replays</Text>
                                <Text style={[styles.featureDesc, { color: theme.textMuted }]}>Slow mo capture of the exact moment you lost focus.</Text>
                            </View>
                        </View>
                    </View>

                    {/* BOTTOM CTA */}
                    <View style={[styles.ctaBox, { backgroundColor: theme.surface, borderColor: theme.primary }]}>
                        <Text style={[styles.ctaTitle, { color: theme.textWhite }]}>READY TO LOSE?</Text>
                        <Text style={[styles.ctaSubtitle, { color: theme.textMuted }]}>Join thousands of challengers and put your focus to the test.</Text>

                        <TouchableOpacity style={[styles.ctaButton, { backgroundColor: theme.primary }]} onPress={() => router.push('/(tabs)/home')}>
                            <Ionicons name="rocket-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                            <Text style={[styles.ctaButtonText, { color: '#FFFFFF' }]}>Get Started Now</Text>
                        </TouchableOpacity>

                        <Text style={[styles.freeText, { color: theme.textMuted }]}>FREE TO PLAY ON IOS AND ANDROID</Text>
                    </View>

                    {/* FOOTER */}
                    <View style={styles.footer}>
                        <View style={styles.footerIcons}>
                            <Ionicons name="logo-twitter" size={20} color={theme.textMuted} style={styles.footerIcon} />
                            <Ionicons name="share-social" size={20} color={theme.textMuted} style={styles.footerIcon} />
                            <Ionicons name="help-circle" size={20} color={theme.textMuted} style={styles.footerIcon} />
                        </View>
                        <Text style={[styles.copyright, { color: theme.textMuted, opacity: 0.5 }]}>© 2026 DON'T BLINK LAB. ALL RIGHTS RESERVED.</Text>
                        <Text style={[styles.footerLinks, { color: theme.textMuted, opacity: 0.7 }]}>PRIVACY   TERMS   SUPPORT</Text>
                    </View>

                </ScrollView>
            </View>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logoText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    playNowBtn: {
        backgroundColor: 'rgba(255, 0, 127, 0.2)',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FF007F',
    },
    playNowText: {
        color: '#FF007F',
        fontSize: 12,
        fontWeight: 'bold',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    heroSection: {
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 40,
        marginBottom: 60,
    },
    heroTitle: {
        fontSize: 48,
        fontWeight: '900',
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 48,
        marginBottom: 16,
    },
    textPink: {
        color: '#FF007F',
    },
    heroSubtitle: {
        color: '#AFAFAF',
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 40,
    },
    mockupContainer: {
        width: 200,
        height: 380,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        padding: 8,
        backgroundColor: '#111',
        marginBottom: 40,
    },
    mockupFrame: {
        flex: 1,
        borderRadius: 18,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#000',
    },
    mockupImage: {
        width: '100%',
        height: '100%',
        opacity: 0.5,
    },
    mockupHeader: {
        position: 'absolute',
        top: 12,
        right: 12,
        zIndex: 10,
    },
    liveBadge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    liveText: {
        color: 'white',
        fontSize: 8,
        fontWeight: 'bold',
    },
    mockupOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        alignItems: 'center',
        backgroundColor: 'linear-gradient(to top, black, transparent)', // React Native doesn't support this directly in styles usually, but overlay helps
    },
    scanLine: {
        width: '100%',
        height: 2,
        marginBottom: 10,
        shadowOpacity: 1,
        shadowRadius: 5,
    },
    timerText: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: FONTS.mono,
        marginBottom: 4,
    },
    holdText: {
        color: '#AFAFAF',
        fontSize: 10,
        letterSpacing: 1,
        marginBottom: 10,
    },
    mockupBar: {
        width: '80%',
        height: 4,
        borderRadius: 2,
    },
    storeButton: {
        flexDirection: 'row',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 30,
        alignItems: 'center',
        gap: 8,
        marginBottom: 20,
    },
    storeButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    webPlayText: {
        color: 'rgba(255,255,255,0.5)',
        fontFamily: FONTS.mono,
        fontSize: 14,
        letterSpacing: 2,
    },
    section: {
        paddingHorizontal: 24,
        marginBottom: 60,
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#FFFFFF',
        marginBottom: 30,
        textAlign: 'center',
    },
    sectionSubtitle: {
        color: '#AFAFAF',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 22,
    },
    stepItem: {
        alignItems: 'center',
        marginBottom: 40,
    },
    stepNumber: {
        fontSize: 80,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.03)',
        position: 'absolute',
        top: -30,
    },
    stepTitle: {
        color: 'white',
        fontWeight: '900',
        fontSize: 20,
        marginTop: 12,
        marginBottom: 8,
    },
    stepDesc: {
        color: '#AFAFAF',
        textAlign: 'center',
        maxWidth: 200,
    },
    statsCard: {
        marginHorizontal: 20,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 20,
        padding: 24,
        marginBottom: 60,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    statsLabel: {
        color: '#AFAFAF',
        fontSize: 10,
        letterSpacing: 1,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    statsValue: {
        color: 'white',
        fontSize: 32,
        fontWeight: '900',
        marginBottom: 8,
    },
    statsTrend: {
        color: '#00FF94',
        fontSize: 12,
        fontWeight: 'bold',
    },
    featureRow: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 24,
        backgroundColor: 'rgba(20,20,30,0.5)',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    featureIconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    featureContent: {
        flex: 1,
    },
    featureTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    featureDesc: {
        color: '#AFAFAF',
        fontSize: 12,
        lineHeight: 18,
    },
    ctaBox: {
        marginHorizontal: 20,
        borderRadius: 24,
        padding: 30,
        alignItems: 'center',
        borderWidth: 1,
        marginBottom: 40,
    },
    ctaTitle: {
        color: 'white',
        fontSize: 28,
        fontWeight: '900',
        marginBottom: 12,
        textAlign: 'center',
    },
    ctaSubtitle: {
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
    },
    ctaButton: {
        flexDirection: 'row',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 16,
        width: '100%',
        justifyContent: 'center',
    },
    ctaButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    freeText: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 10,
        letterSpacing: 1,
    },
    footer: {
        alignItems: 'center',
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        marginTop: 20,
    },
    footerIcons: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 20,
    },
    footerIcon: {
        opacity: 0.7,
    },
    copyright: {
        color: 'rgba(255,255,255,0.3)',
        fontSize: 10,
        marginBottom: 12,
        letterSpacing: 1,
    },
    footerLinks: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 10,
        letterSpacing: 2,
    },
});
