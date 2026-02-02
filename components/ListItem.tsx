import React from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface ListItemProps {
    label: string;
    icon?: keyof typeof Ionicons.glyphMap;
    type?: 'toggle' | 'link';
    value?: boolean;
    onValueChange?: (value: boolean) => void;
    onPress?: () => void;
    isLast?: boolean;
}

export const ListItem = ({ label, icon, type = 'link', value, onValueChange, onPress, isLast }: ListItemProps) => {
    return (
        <TouchableOpacity
            style={[styles.container, isLast && styles.lastContainer]}
            onPress={type === 'link' ? onPress : undefined}
            activeOpacity={type === 'link' ? 0.7 : 1}
            disabled={type === 'toggle'}
        >
            <View style={styles.leftContent}>
                {icon && (
                    <View style={styles.iconContainer}>
                        <Ionicons name={icon} size={20} color="#fff" />
                    </View>
                )}
                <Text style={styles.label}>{label}</Text>
            </View>

            <View style={styles.rightContent}>
                {type === 'toggle' ? (
                    <Switch
                        value={value}
                        onValueChange={onValueChange}
                        trackColor={{ false: '#3E3E3E', true: Colors.dark.secondary }} // Using secondary pink for toggle
                        thumbColor={Colors.dark.text}
                        ios_backgroundColor="#3E3E3E"
                    />
                ) : (
                    <Ionicons name="chevron-forward" size={20} color="#666" />
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        // separated by border if not last? 
        // The screenshot shows them in a block, maybe no dividers or subtle ones.
        // We'll proceed without dividers for now, relies on container spacing.
    },
    lastContainer: {
        borderBottomWidth: 0,
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#3E3646', // Slightly lighter than card
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    label: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
