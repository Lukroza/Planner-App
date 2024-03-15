import React, { useState } from "react";
import { Alert, View, StyleSheet } from "react-native";
import TextInputBar from  "../TextInputBar";
import ButtonComp from '../ButtonComp';
import { getUserByUsername } from '../API/Users/getUserByUsername';
import { inviteToGroup } from '../API/Invites/InviteToGroup';

const GroupInput = () => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const handleSendInvite = async () => {
    if (!username) {
      Alert.alert('Please enter a username');
      return;
    }
    
    setIsLoading(true);
  try {
    const fetchedUser = await getUserByUsername(username);
    if (fetchedUser && fetchedUser.group_id) {
      Alert.alert('User already in a group');
      setIsLoading(false);
      return;
    }
    
    if (fetchedUser && !fetchedUser.group_id) {
      setUser(fetchedUser);
      const group_id = "cab0c88c-1426-4442-b919-c42ede76ba59"; // Hardcoded group id because of John's code :(
      await inviteToGroup({ user_id: fetchedUser.id, group_id });
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