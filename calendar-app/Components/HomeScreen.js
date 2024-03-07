import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Header from './Header';
import Calendar from './Calendar';
import { GlobalColor, GlobalSecondaryColor, GlobalFont } from '../Styles';
import * as Font from 'expo-font';


const HomeScreen = () => {
  return (
    <View style={styles.view}>
      <Header title={"Home"} />
      <Calendar showEvents={true} onDayPress={null}/>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
      flex: 1,
      backgroundColor: GlobalColor,
  },
});

export default HomeScreen;