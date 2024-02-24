import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import Header from './Components/Header'; 
import Footer from './Components/Footer'; 

const App = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header />
        <Footer />
      </View>
      </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#2F3855', 
  },
});

export default App;
