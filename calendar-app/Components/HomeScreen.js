import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from './Header';
import Footer from './Footer';

const HomeScreen = () => {
  return (
    <View>
      <Header title={"Home"} />
      <Text>Welcome to the Home Screen!</Text>
    </View>
  );
};


export default HomeScreen;