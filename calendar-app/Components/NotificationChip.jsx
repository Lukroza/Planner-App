import React, { useEffect, useState, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { Portal } from 'react-native-paper';
import { GlobalSecondaryColor, GlobalTextColor } from '../Styles';

const NotificationChip = ({ message, isSuccess }) => {
    const [visible, setVisible] = useState(true);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const timer = setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true,
            }).start(() => setVisible(false));
        }, 2000);

        return () => clearTimeout(timer);
    }, [fadeAnim]);

    return (
        <Portal>
            <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
                {visible && <Chip icon={isSuccess ? "check" : "close"} selectedColor={GlobalSecondaryColor}>{message}</Chip>}
            </Animated.View>
        </Portal>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        fontSize: 20,
        top: 150,
        right: 90,
        zIndex: 9999,
    },
});

export default NotificationChip;