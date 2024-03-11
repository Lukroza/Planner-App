import React from "react";
import { Text, StyleSheet } from "react-native";
import { GlobalColor } from "../../Styles";
import TextInputBar from  "../TextInputBar";
import ButtonComp from '../ButtonComp';
import { View } from "react-native";

const GroupInput = ({ setGroupName, handleCreateGroup }) => {
  return (
    <>
      <View style={styles.topContainer}>
        <TextInputBar label="Group Name" onChangeText={setGroupName} />
        <ButtonComp text="Create" onPress={handleCreateGroup} />
      </View>
      <View style={styles.bottomContainer}>
        <Text>
          Invitations
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: GlobalColor,
  },
  topContainer: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
    padding: 20,
    gap: 20,
    alignSelf: "center",
  },
  bottomContainer: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
    padding: 20,
    gap: 20,
    alignSelf: "center",
  },
});
export default GroupInput;
