import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import { GlobalColor, GlobalSecondaryColor, GlobalFont } from './Styles';
import RegistrationScreen from './Screens/RegistrationScreen';
import { useState } from 'react';
import Footer from './Components/Footer';
import { getIsLoggedIn } from './Components/Storage/userDataStorage'; 
import { useEffect } from 'react';
import { Provider } from 'react-native-paper';


const App = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);
  
  const handleRefresh = () => {
    setRefreshKey(oldKey => oldKey + 1);
    setIsRegistered(true);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await getIsLoggedIn();
      if (loggedIn) {
        setIsRegistered(true);
      }
    };

    checkLoginStatus();
  }, []);


  
  return (
    <Provider>
    <SafeAreaProvider>
      {isRegistered ? (
        <Footer />
      ) : (
        <RegistrationScreen key={refreshKey} onRefresh={handleRefresh} />
      )}
    </SafeAreaProvider>
    </Provider>
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