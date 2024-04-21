import React, { useState } from 'react';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TextInputBar from '../Components/TextInputBar';
import ButtonComp from '../Components/ButtonComp';
import { createUserApi } from '../Components/API/Users/UserRegister';
import { storeUserInfo } from '../Components/Storage/userDataStorage';
import { GlobalColor } from '../Styles';
import { loginUserAPI } from '../Components/API/Users/UsernameCheck';
import { useNavigation } from '@react-navigation/native';

const RegistrationScreen = (props) => {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegistration = async () => {
    try {
      await createUserApi({ username }).then(async (response) => {
        await storeUserInfo(response, false, true, "0");
        navigation.navigate('Home');
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const navigation = useNavigation();

  const handleLogin = async () => {
    const userData = await loginUserAPI({username});
    if(userData != null) {
      if(userData.group_id !== null) {
        await storeUserInfo(userData.id, true, true, userData.group_id);
      }
      else{
        await storeUserInfo(userData.id, false, true, "0");
      }
      navigation.navigate('Home');
    } 
    else {
      console.log("User not found");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
    <SafeAreaProvider>
      <View style={styles.container}>
        <TextInputBar 
          label="Username"
          onChangeText={setUsername}
        />
        <ButtonComp text="Login" onPress={handleLogin}/>
        <ButtonComp text="Register" onPress={handleRegistration} />
      </View>
    </SafeAreaProvider>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: GlobalColor,
    gap: 20,
  },
});

export default RegistrationScreen;