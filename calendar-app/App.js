import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import { GlobalColor, GlobalSecondaryColor, GlobalFont } from './Styles';
import RegistrationScreen from './Screens/RegistrationScreen';
import { useState, useEffect } from 'react';
import Footer from './Components/Footer';
import { getIsLoggedIn, getUserId, storeUserInfo } from './Components/Storage/userDataStorage'; 
import { Provider } from 'react-native-paper';
import { getUserById } from './Components/API/Users/UserGetById';

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
    getUser().then(setUserId); // Gets and sets the userID needed for the update of the user data
    checkLoginStatus(); // Checks if the user is logged in
  }, []);

  useEffect(() => { // Updates the user data if the user is logged in
    if (userId && isRegistered) { // If the user is logged in and the userId is updated then the user data is updated
      updateUserData(); // Updates the user data
    }
  }, [isRegistered]); // Depends on the isRegistered state
  
  const updateUserData = async () => {
    const userData = await getUserById({ userId }); // Gets the user data by the userId
    if(userData != null) { // If the user data is not null then updates the user info depending on if the user is in a group or not
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