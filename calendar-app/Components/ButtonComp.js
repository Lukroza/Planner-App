import * as React from "react";
import { Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import {
  GlobalAccentColor,
  GlobalBorderColor,
  GlobalColor,
  GlobalFont,
  GlobalHeaderColor,
  GlobalSecondaryColor,
  GlobalTextColor,
} from "../Styles";

const ButtonComp = ({ text, onPress, color = GlobalAccentColor }) => (
  <Button
    style={[styles.buttonStyle, { backgroundColor: color }]}
    mode="contained"
    onPress={onPress}
  >
    {text}
  </Button>
);

const styles = StyleSheet.create({
  buttonStyle: {
    width: 150,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: GlobalBorderColor,
    color: GlobalHeaderColor,
  },
});

export default ButtonComp;
