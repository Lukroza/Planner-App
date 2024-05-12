import * as React from "react";
import { TextInput } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import {
  GlobalColor,
  GlobalFont,
  GlobalHeaderColor,
  GlobalSecondaryColor,
  GlobalTextColor,
} from "../Styles";

const TextInputBar = ({ label, onChangeText, multiline, value }) => {
  return (
    <TextInput
      value={value}
      underlineColor="transparent"
      label={label}
      onChangeText={onChangeText}
      style={styles.textBar}
      textColor={GlobalTextColor}
      numberOfLines={multiline ? 4 : 1}
      multiline={multiline}
      activeOutlineColor={GlobalHeaderColor}
      theme={{
        colors: {
          primary: GlobalHeaderColor,
          underlineColor: "transparent",
          onSurfaceVariant: GlobalHeaderColor,
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  textBar: {
    backgroundColor: GlobalSecondaryColor,
    width: "90%",
    borderRadius: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    overflow: "hidden",
  },
});

export default TextInputBar;
