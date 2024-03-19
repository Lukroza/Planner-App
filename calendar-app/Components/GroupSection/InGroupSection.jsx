import React, { useEffect, useState } from "react";
import { Alert, View, StyleSheet, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
import TextInputBar from "../TextInputBar";
import ButtonComp from '../ButtonComp';
import { loginUserAPI } from '../API/Users/UsernameCheck';
import { inviteToGroup } from '../API/Invites/InviteToGroup';
import { getGroupMembers } from '../API/Groups/GroupMembers';
import { getGroupId } from "../Storage/userDataStorage";
import { GlobalColor, GlobalFont, GlobalSecondaryColor, GlobalTextColor } from '../../Styles';

async function getGroup() {
  const groupId = await getGroupId();
  return groupId;
}

const GroupInput = () => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState([]);


  useEffect(() => {
    const fetchGroupMembers = async () => {
      setIsLoading(true);
      const groupId = await getGroup();
      if (groupId) {
        const groupMembers = getGroupMembers({ groupId }).then((data) => {
          setMembers(data);
        });
        setMembers(groupMembers);
      }
      setIsLoading(false);
    }
    fetchGroupMembers();
  }, []);

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
        const group_id = await getGroupId();
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

  const renderMember = ({ item }) => (
    <View style={styles.memberItem}>
        <Text style={styles.memberText}>{item.username}</Text>
        <TouchableOpacity onPress={() => alert('Remove member')}>
          <Text style={styles.removeIcon}>×</Text>
        </TouchableOpacity>
    </View>    
  );

  return (
    <>
      <View style={styles.addContainer}>
        <TextInputBar label="Enter username" onChangeText={setUsername} />
        <ButtonComp text="Add User" onPress={handleSendInvite} />
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>Members</Text>
        <FlatList
          data={members}
          renderItem={renderMember}
          keyExtractor={item => item.id}
          style={styles.membersList}
        />
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
  container: {
    backgroundColor: '#8EBBFF',
    borderRadius: 10,
    padding: 10,
    margin: 20,
    alignItems: 'stretch',
  },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#8EBBFF',
  },
  memberText: {
    color: GlobalTextColor,
    fontSize: 20,
  },
  removeIcon: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 8,
  },
  membersList: {
    flexGrow: 0,
  },
  header: {
    color: GlobalTextColor,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default GroupInput;
