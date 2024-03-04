import { View, Text, StyleSheet } from 'react-native';
import React, { useLayoutEffect } from 'react';
import Header from './Header';

const GroupScreen = () => {
  return (
    
    <View>
      <Header title={"Group"} />
      <Text>Welcome to the Group Screen!</Text>
    </View>
  );
};


export default GroupScreen;