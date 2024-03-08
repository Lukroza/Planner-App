import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import { GlobalColor, GlobalSecondaryColor, GlobalFont } from './Styles';
import RegistrationScreen from './Screens/RegistrationScreen';
import { useState } from 'react';
import Footer from './Components/Footer';


const App = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);
  
  const handleRefresh = () => {
    setRefreshKey(oldKey => oldKey + 1);
    setIsRegistered(true);
  };
  
  return (
    <SafeAreaProvider>
      {isRegistered ? (
        <Footer /> // Render Footer if isRegistered is true
      ) : (
        <RegistrationScreen key={refreshKey} onRefresh={handleRefresh} /> // Render RegistrationScreen if isRegistered is false
      )}
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