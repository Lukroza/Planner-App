import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from './Header';
import Calendar from './Calendar';

const HomeScreen = () => {
  return (
    <View style={styles.view}>
      <Header title={"Home"} />
      <Calendar showEvents={true}/>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
      flex: 1,
      backgroundColor: '#2F3855',
  },
});

export default HomeScreen;