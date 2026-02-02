
import { NeonButton } from '@/components/NeonButton';
import { useTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useKeepAwake } from 'expo-keep-awake';

import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    Camera,
    useCameraDevice,
    useCameraPermission,
    useFrameProcessor,
} from 'react-native-vision-camera';
import { Face, useFaceDetector } from 'react-native-vision-camera-face-detector';
import { useRunOnJS } from 'react-native-worklets-core';

type GameState = 'ALIGN' | 'PLAYING' | 'GAME_OVER';

export default function GameScreen() {
    useKeepAwake();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('front');
    const { theme } = useTheme();

    const [gameState, setGameState] = useState<GameState>('ALIGN');
    const [score, setScore] = useState(0);
    const [statusMessage, setStatusMessage] = useState('ALIGN YOUR FACE');
    const [validationMessage, setValidationMessage] = useState('Position your face in the frame');
    const [countdown, setCountdown] = useState<number | null>(null);

    // Refs for logic consistency across renders
    const gameActiveRef = useRef(false);
    const timerRef = useRef<any>(null);
    const lastFaceDetectedTime = useRef<number>(Date.now());
    const faceLostTimeout = useRef<any>(null);

    // Auto-start validation refs
    const validFaceStartTime = useRef<number | null>(null);
    const isCountingDown = useRef(false);

    const { detectFaces } = useFaceDetector({
        performanceMode: 'accurate',
        classificationMode: 'all',
        contourMode: 'all',
        landmarkMode: 'all'
    });

    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, [hasPermission]);

    if (!hasPermission) return <View style={styles.container}><Text style={{ color: 'white', marginTop: 100, textAlign: 'center' }}>Requesting Permission...</Text></View>;
    if (device == null) return <View style={styles.container}><Text style={{ color: 'white', marginTop: 100, textAlign: 'center' }}>No Camera Device Found</Text></View>;

    const startGame = () => {
        setGameState('PLAYING');
        setScore(0);
        setStatusMessage('DON\'T BLINK!');
        gameActiveRef.current = true;
        isCountingDown.current = false;
        setCountdown(null);

        lastFaceDetectedTime.current = Date.now();

        // Start Timer for score
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setScore(s => s + 15); // 15 points per 100ms
        }, 100);

        // Watchdog for face lost (checked every 500ms in JS thread)
        if (faceLostTimeout.current) clearInterval(faceLostTimeout.current);
        faceLostTimeout.current = setInterval(() => {
            if (gameActiveRef.current && (Date.now() - lastFaceDetectedTime.current > 1000)) {
                handleGameOver('NO_FACE');
            }
        }, 500);
    };

    const startCountdown = () => {
        if (isCountingDown.current) return;
        isCountingDown.current = true;
        setValidationMessage("PERFECT! HOLD STILL");

        let count = 3;
        setCountdown(count);

        const countInterval = setInterval(() => {
            count--;
            if (count > 0) {
                setCountdown(count);
            } else {
                clearInterval(countInterval);
                startGame();
            }
        }, 1000);
    };

    const stopGame = () => {
        gameActiveRef.current = false;
        isCountingDown.current = false;
        validFaceStartTime.current = null;
        setCountdown(null);
        if (timerRef.current) clearInterval(timerRef.current);
        if (faceLostTimeout.current) clearInterval(faceLostTimeout.current);
    };

    const handleGameOver = (reason: 'BLINK' | 'NO_FACE') => {
        if (!gameActiveRef.current) return;
        stopGame();
        setGameState('GAME_OVER');
        if (reason === 'BLINK') {
            setStatusMessage('YOU BLINKED!');
            Alert.alert("GAME OVER", "You blinked!");
        } else {
            setStatusMessage('FACE LOST');
            Alert.alert("GAME OVER", "Face detection lost!");
        }
    };

    // Called from Worklet via runOnJS
    const onFaceDetected = (face: Face) => {
        lastFaceDetectedTime.current = Date.now();

        if (gameState === 'ALIGN' && !isCountingDown.current) {
            // Validation Logic
            const bounds = face.bounds;

            // Check tilt and rotation (Head Straight)
            const rotX = face.pitchAngle; // Tilt up/down
            const rotZ = face.rollAngle; // Tilt sideways
            const rotY = face.yawAngle;   // Turn left/right

            // Strict alignment check: User must look straight at the camera
            const isStraight = (Math.abs(rotZ) < 10 && Math.abs(rotX) < 10 && Math.abs(rotY) < 10);

            if (!isStraight) {
                setValidationMessage("ALIGN FACE STRAIGHT");
                validFaceStartTime.current = null;
                return;
            }

            // Heuristic Detection for Accessories

            // 1. CAP Detection (Pitch check + Shadows)
            // If user has to tilt head back significantly differently to show face, or shadows obscure specific landmarks.
            // Simplified: If pitch is unusually negative (looking up) while 'straight', or if we detect this behavior.
            const probablyHasCap = rotX < -15;

            // 2. HEADPHONES Detection (Ear Visibility + Width)
            // We use landmarks. If ears are not detected while looking straight, assume covered (headphones/hair).
            // Also check aspect ratio as secondary signal.
            const hasLeftEar = face.landmarks?.LEFT_EAR;
            const hasRightEar = face.landmarks?.RIGHT_EAR;
            const earsVisible = hasLeftEar && hasRightEar;

            // Check Width Ratio (Wide face = potential accessories)
            const faceRatio = bounds.width / bounds.height;
            const isUnusuallyWide = faceRatio > 0.85;

            const probablyHasHeadphones = (!earsVisible || isUnusuallyWide);

            if (probablyHasCap) {
                setValidationMessage("REMOVE CAP");
                validFaceStartTime.current = null;
            } else if (probablyHasHeadphones) {
                setValidationMessage("REMOVE HEADPHONES");
                validFaceStartTime.current = null;
            } else {
                // Face is good
                if (!validFaceStartTime.current) {
                    validFaceStartTime.current = Date.now();
                    setValidationMessage("HOLD STILL...");
                } else {
                    const duration = Date.now() - validFaceStartTime.current;
                    if (duration > 1500) { // 1.5 seconds of validity
                        startCountdown();
                    }
                }
            }
        }

        if (!gameActiveRef.current) return;

        // ML Kit Probabilities: 0.0 (closed) to 1.0 (open).
        const leftOpen = face.leftEyeOpenProbability;
        const rightOpen = face.rightEyeOpenProbability;

        if (leftOpen !== -1 && rightOpen !== -1) {
            // Threshold 0.4 implies closing.
            if (leftOpen < 0.4 && rightOpen < 0.4) {
                handleGameOver('BLINK');
            }
        }
    };

    const runOnJSDetected = useRunOnJS(onFaceDetected, [onFaceDetected]);

    const frameProcessor = useFrameProcessor((frame) => {
        'worklet';
        const faces = detectFaces(frame);

        if (faces.length > 0) {
            // Just take the first face
            const face = faces[0];
            runOnJSDetected(face);
        } else {
            // No face logic handled by JS watchdog
        }
    }, [detectFaces, runOnJSDetected]);

    return (
        <View style={styles.container}>
            <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                frameProcessor={frameProcessor}
                pixelFormat="yuv" // Recommended for ML Kit
            />

            <View style={[styles.uiOverlay, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => { stopGame(); router.replace('/(tabs)/home'); }}>
                        <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>

                    <View style={styles.liveBadge}>
                        <View style={[styles.liveDot, { backgroundColor: gameState === 'PLAYING' ? '#FF0000' : theme.primary }]} />
                        <Text style={styles.liveText}>{gameState === 'ALIGN' && countdown !== null ? 'STARTING' : gameState}</Text>
                    </View>

                    <View style={{ width: 40 }} />
                </View>

                {/* Central Overlay */}
                <View style={styles.instructionContainer}>
                    {gameState === 'ALIGN' && (
                        <>
                            {countdown !== null ? (
                                <Text style={[styles.timerText, { fontSize: 120 }]}>{countdown}</Text>
                            ) : (
                                <>
                                    <Text style={styles.alignFaceText}>{validationMessage || "ALIGN FACE"}</Text>
                                    <Text style={styles.subInstruction}>Remove caps & headphones</Text>
                                    <Text style={styles.subInstruction}>Ensure only your face is visible</Text>
                                </>
                            )}
                        </>
                    )}

                    {gameState === 'PLAYING' && (
                        <View>
                            <Text style={styles.timerText}>{score}</Text>
                            <Text style={styles.statusText}>{statusMessage}</Text>
                        </View>
                    )}

                    {gameState === 'GAME_OVER' && (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={[styles.alignFaceText, { color: '#FF453A' }]}>{statusMessage}</Text>
                            <Text style={styles.timerText}>Score: {score}</Text>
                            <NeonButton title="TRY AGAIN" onPress={() => {
                                setGameState('ALIGN');
                                isCountingDown.current = false;
                                validFaceStartTime.current = null;
                                setCountdown(null);
                                setValidationMessage('Position your face');
                            }} style={{ marginTop: 20, minWidth: 200 }} />
                        </View>
                    )}
                </View>

                {/* Face Frame (Only visible in ALIGN) */}
                {gameState === 'ALIGN' && countdown === null && (
                    <View style={styles.faceFrameContainer}>
                        <View style={[styles.faceFrame, {
                            width: windowWidth * 0.7,
                            height: windowWidth * 0.95,
                            borderColor: validationMessage === 'HOLD STILL...' ? '#00FF00' : theme.primary
                        }]} />
                    </View>
                )}

                {/* Bottom Spacer instead of Button */}
                <View style={{ height: 100 }} />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    uiOverlay: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    liveBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    liveText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    faceFrameContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
    },
    faceFrame: {
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
        borderRadius: 150,
        backgroundColor: 'transparent',
    },
    instructionContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    alignFaceText: {
        fontSize: 28,
        fontWeight: '900',
        color: 'white',
        letterSpacing: 1,
        marginBottom: 8,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
        textAlign: 'center',
    },
    subInstruction: {
        fontSize: 16,
        color: '#CCC',
        marginTop: 8,
        textAlign: 'center',
        fontWeight: '500',
    },
    timerText: {
        fontSize: 64,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    statusText: {
        fontSize: 24,
        color: '#FF007F', // Neon pink
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        letterSpacing: 2,
    },
    bottomControls: {
        width: '100%',
        paddingBottom: 20,
        alignItems: 'center',
        backgroundColor: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
        paddingHorizontal: 40,
    },
    shutterButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    shutterInner: {
        width: 64,
        height: 64,
        borderRadius: 32,
    },
    secondaryActionBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
