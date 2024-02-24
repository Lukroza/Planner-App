import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import Header from './Components/Header'; // Assume your file is named Header.js
import Footer from './Components/Footer'; 


const App = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header />
        {

        }
        <Footer />
      </View>
      </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the View fills the entire screen
    backgroundColor: '#2F3855', // Sets the background color of the entire container
  },
});

export default App;
