import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import React from 'react';
import { View } from 'react-native';

export const toastConfig = {
    success: (props) => (
        <View style={{ marginTop: 30 }}>
            <BaseToast
                {...props}
                style={{ borderLeftColor: 'green' }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                text1Style={{
                    fontSize: 20,
                    fontWeight: '600'
                }}
                text2Style={{
                    fontSize: 13,
                    fontWeight: '400',
                    color: 'black'
                }}
            />
        </View>
    ),
    error: (props) => (
        <View style={{ marginTop: 30 }}>
            <ErrorToast
                {...props}
                style={{ borderLeftColor: 'red' }}
                text1Style={{
                    fontSize: 20,
                    fontWeight: '600'
                }}
                text2Style={{
                    fontSize: 13,
                    fontWeight: '400',
                    color: 'black'
                }}
            /></View>

    ),
};