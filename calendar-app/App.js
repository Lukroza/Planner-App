import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import { GlobalColor, GlobalSecondaryColor, GlobalFont } from './Styles';
import RegistrationScreen from './Screens/RegistrationScreen';


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