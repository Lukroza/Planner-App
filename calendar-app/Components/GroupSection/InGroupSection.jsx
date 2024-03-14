import React, { useState } from "react";
import { Alert, View, StyleSheet } from "react-native";
import TextInputBar from  "../TextInputBar";
import ButtonComp from '../ButtonComp';
import { getUserIdByUsername } from '../API/Users/getUserIdByUsername';
import { inviteToGroup } from '../API/Invites/InviteToGroup';

const GroupInput = ({}) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendInvite = async () => {
    if (username) {
      setIsLoading(true);
      try {
        const user_id = await getUserIdByUsername(username);
        const group_id = "cab0c88c-1426-4442-b919-c42ede76ba59"; // hardcoded for now because of John's work.
        if (user_id) {
          await inviteToGroup({ user_id, group_id });
          Alert.alert('Invitation sent!');
        } else {
          Alert.alert('User not found');
        }
      } catch (error) {
        Alert.alert('Failed to send invitation');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      Alert.alert('Please enter a username');
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