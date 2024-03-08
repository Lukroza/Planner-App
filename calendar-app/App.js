import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import Header from './Components/Header'; 
import Footer from './Components/Footer'; 
import { GlobalColor, GlobalSecondaryColor, GlobalFont } from './Styles';

const App = () => {
  return (
    <SafeAreaProvider>
      <RegistrationScreen />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColor,
  },
  footerContainer: {
    flex: 0.1,
  },
});

export default App;