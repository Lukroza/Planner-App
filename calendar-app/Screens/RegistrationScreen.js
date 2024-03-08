import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TextInputBar from '../Components/TextInputBar';
import ButtonComp from '../Components/ButtonComp';
import { createUserApi } from '../Components/API/Users/UserRegister';
import { storeUserInfo } from '../Components/Storage/userDataStorage';

const RegistrationScreen = (props) => {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegistration = async () => {
    try {
      await createUserApi({ username }).then(async (response) => {
        await storeUserInfo(response, false, true, "0");
        props.onRefresh();
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <TextInputBar 
          label="Username"
          onChangeText={setUsername}
        />
        <ButtonComp text="Register" onPress={handleRegistration} />
      </View>
    </SafeAreaProvider>
  );
};

//Made this styles temporary, to test it in the iOs.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
  },
});

export default RegistrationScreen;
