import { View, Text, StyleSheet } from 'react-native';
import React, { useLayoutEffect } from 'react';
import Header from '../Components/Header';
import TextInputBar from '../Components/TextInputBar';

const GroupScreen = () => {
  return (
    
    <View>
      <Header title={"Group"} />
      <Text>Welcome to the Group Screen!</Text>
    </View>
  );
};


export default GroupScreen;