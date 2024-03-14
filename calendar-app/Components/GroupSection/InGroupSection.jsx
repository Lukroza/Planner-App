import React from "react";
import { Text, StyleSheet } from "react-native";
import { GlobalColor } from "../../Styles";
import TextInputBar from  "../TextInputBar";
import ButtonComp from '../ButtonComp';
import { View } from "react-native";

const GroupInput = ({}) => {
  return (
    <>
    <View style={styles.addContainer}>
        <TextInputBar label="Enter username" />
        <ButtonComp text="Add User" />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
    addContainer: {
        marginTop: 20,
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

export default GroupInput;

