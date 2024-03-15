import React, { useState } from "react";
import { Alert, View, StyleSheet } from "react-native";
import TextInputBar from "../TextInputBar";
import ButtonComp from '../ButtonComp';
import { loginUserAPI } from '../API/Users/UsernameCheck';
import { inviteToGroup } from '../API/Invites/InviteToGroup';
import { getUserId } from "../Storage/userDataStorage";

const GroupInput = () => {
  const [username, setUsername] = useState('');

  const handleSendInvite = async () => {
    if (!username) {
      Alert.alert('Please enter a username');
      return;
    }
    
    try {
      const fetchedUser = await loginUserAPI({ username });
      if (fetchedUser && fetchedUser.group_id) {
        Alert.alert('User already in a group');
        return;
      }
      
      if (fetchedUser && !fetchedUser.group_id) {
        const group_id = await getUserId();
        await inviteToGroup({ user_id: fetchedUser.id, group_id });
        Alert.alert('Invitation sent!');
      } else {
        Alert.alert('User not found');
      }
    } catch (error) {
      Alert.alert('Failed to send invitation');
      console.error(error);
    }
  };

  return (
    <View style={styles.addContainer}>
      <TextInputBar label="Enter username" onChangeText={setUsername}/>
      <ButtonComp text="Add User" onPress={handleSendInvite} />
    </View>
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
