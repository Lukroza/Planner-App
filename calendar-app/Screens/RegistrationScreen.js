import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TextInputBar from '../Components/TextInputBar';
import ButtonComp from '../Components/ButtonComp';
import { createUserApi } from '../Components/API/Users/UserRegister';

const RegistrationScreen = () => {
  const [username, setUsername] = useState('');

  const handleRegistration = async () => {
    try {
      await createUserApi({ username });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <SafeAreaProvider>
      <View>
      <TextInputBar
          label="Username"
          onChangeText={setUsername}
        />
        <ButtonComp text="Register" onPress={handleRegistration} />
      </View>
    </SafeAreaProvider>
  );
};

export default RegistrationScreen;
