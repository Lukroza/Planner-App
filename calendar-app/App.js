import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Calendar from './Components/Calendar';
import CreateEvent from './Components/CreateEvent';

const App = () => {
  return (
    <SafeAreaProvider>
      <CreateEvent />
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