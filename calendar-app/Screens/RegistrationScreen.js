import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React, { useLayoutEffect } from 'react';
import Header from '../Components/Header';
import TextInputBar from '../Components/TextInputBar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ButtonComp from '../Components/ButtonComp';

const RegistrationScreen = () => {
  return (
    <SafeAreaProvider>
        <View>
        <TextInputBar  label={"Username"} />
        <ButtonComp  text={"Login"}/>
        <ButtonComp text={"Register"}/>
        </View>
    </SafeAreaProvider>

  );
};


export default RegistrationScreen;