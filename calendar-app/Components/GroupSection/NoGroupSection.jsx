import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { GlobalColor } from "../../Styles";
import TextInputBar from "../TextInputBar";
import ButtonComp from '../ButtonComp';
import { storeUserInfo } from "../Storage/userDataStorage";
import { getInGroupStatus } from "../Storage/userDataStorage";
import Invites from './Invites';
import { getUserId } from "../Storage/userDataStorage";

async function getGroupStatus() {
  const inGroup = await getInGroupStatus();
  return inGroup;
}

async function getUser() {
  const userId = await getUserId();
  return userId;
}

const GroupInput = ({ setGroupName, handleCreateGroup, onRefresh }) => {
  const [inGroup, setInGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { 
    checkGroupStatus();
  }, []);

  const checkGroupStatus = async () => {
    setIsLoading(true);
    const inGroup = await getGroupStatus();
    setInGroup(inGroup);
    setIsLoading(false);
  };

  const updateGroupStatus = async (group_id) => {
    const userId = await getUser();
    await storeUserInfo(userId, true, true, group_id);
    onRefresh();
  };

  return (
    <View>
      <View style={styles.createContainer}>
      <TextInputBar label="Group Name" onChangeText={setGroupName}/>
      <ButtonComp text="Create" onPress={handleCreateGroup}/>
      </View>
      <View style={styles.inviteContainer}>
      {!inGroup && <Invites onAccept={updateGroupStatus} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  createContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
  },
  inviteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

});
export default GroupInput;