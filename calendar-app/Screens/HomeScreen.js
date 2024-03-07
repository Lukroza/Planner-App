import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../Components/Header';
import Calendar from '../Components/Calendar';

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