import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import { GlobalColor, GlobalSecondaryColor, GlobalFont } from './Styles';
import RegistrationScreen from './Screens/RegistrationScreen';
import { useState, useEffect } from 'react';
import AppNavigation from './Components/Footer';
import { getIsLoggedIn, getUserId, storeUserInfo } from './Components/Storage/userDataStorage'; 
import { Provider } from 'react-native-paper';
import { getUserById } from './Components/API/Users/UserGetById';
import ProfileScreen from './Screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';

async function getUser() {
  const userId = await getUserId();
  return userId;
}

const App = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);
  const [userId, setUserId] = useState(null);
  
  const handleRefresh = () => {
    setRefreshKey(oldKey => oldKey + 1);
    setIsRegistered(true);
  };

  useEffect(() => {
    checkLoginStatus();
    getUser().then(setUserId);
  }, [refreshKey]);

  useEffect(() => { 
    if (userId && isRegistered) { 
      updateUserData();
    }
  }, [userId]);
  
  const updateUserData = async () => {
    const userData = await getUserById({ userId });
    if(userData != null) {
      if(userData.group_id != null) {
        await storeUserInfo(userData.id, true, true, userData.group_id);
      }
      else{
        await storeUserInfo(userData.id, false, true, "0");
      }
    } 
  };

  const checkLoginStatus = async () => {
    const loggedIn = await getIsLoggedIn();
    if (loggedIn) {
      setIsRegistered(true);
    }
  };
  
  return (
    <Provider>
        <SafeAreaProvider>
          {isRegistered ? (
          <AppNavigation />
          ) : (
            <NavigationContainer>
                <RegistrationScreen key={refreshKey} onRefresh={handleRefresh} />
            </NavigationContainer>
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