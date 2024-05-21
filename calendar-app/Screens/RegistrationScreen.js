import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TextInputBar from "../Components/TextInputBar";
import ButtonComp from "../Components/ButtonComp";
import { createUserApi } from "../Components/API/Users/UserRegister";
import { storeUserInfo } from "../Components/Storage/userDataStorage";
import { GlobalColor, GlobalFont } from "../Styles";
import { loginUserAPI } from "../Components/API/Users/UsernameCheck";
import Toast from "react-native-toast-message";
import { HelperText, Text } from "react-native-paper";

const RegistrationScreen = ({ onRefresh }) => {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegistration = async () => {
    try {
      let response = await createUserApi({ username });
      response = response.replaceAll(`"`, "");
      await storeUserInfo(response, false, true, "0");
      onRefresh();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleLogin = async () => {
    const userData = await loginUserAPI({ username });
    if (userData != null) {
      if (userData.group_id !== null) {
        await storeUserInfo(userData.id, true, true, userData.group_id);
      } else {
        await storeUserInfo(userData.id, false, true, "0");
      }
      onRefresh();
    } else {
      setErrorMessage("User not found");
      console.log("User not found");
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <SafeAreaProvider>
        <View style={styles.container}>
          <TextInputBar label="Username" onChangeText={setUsername} />
          <HelperText style={styles.error} type="error" visible={errorMessage !== ""}>
            {errorMessage}
          </HelperText>
          <ButtonComp text="Login" onPress={handleLogin} />
          <ButtonComp text="Register" onPress={handleRegistration} />
        </View>
      </SafeAreaProvider>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalColor,
    gap: 20,
  },
  error: {
    fontFamily: GlobalFont,
    opacity: 0.6,
    fontSize: 20,
    fontWeight: 500,
    color: "red",
  },
});

export default RegistrationScreen;
