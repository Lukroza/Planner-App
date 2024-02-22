import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Components/Header'; // Assume your file is named Header.js

const App = () => {
  return (
      <View style={styles.container}>
        <Header />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the View fills the entire screen
    backgroundColor: '#2F3855', // Sets the background color of the entire container
  },
});

export default App;
