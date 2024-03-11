import { View, Text, StyleSheet } from 'react-native';
import React, { useLayoutEffect } from 'react';
import Header from '../Components/Header';
import TextInputBar from '../Components/TextInputBar';
import { getInGroupStatus, getUserId, storeUserInfo } from '../Components/Storage/userDataStorage';
import ButtonComp from '../Components/ButtonComp';
import { useState, useEffect } from 'react';
import { createGroup } from '../Components/API/Groups/GroupCreation';

async function getGroupStatus() {
    const inGroup = await getInGroupStatus();
    return inGroup;
}
async function getUser() {
    const userId = await getUserId();
    return userId;
}

const GroupScreen = () => {
  const [inGroup, setInGroup] = useState(null);
  const [userId, setUserId] = useState(null);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    getGroupStatus().then(setInGroup);
    getUser().then(setUserId);
  }, []);

  const handleCreateGroup = async () => {
    const groupData = {
      name: groupName,
      owner_id: userId,
  };
      await createGroup(groupData).then((response) => {
        storeUserInfo(userId, true, true, response);
        setInGroup(true);
      });
      
  };

  return (
    <View>
      <Header title={"Group"} />
      <View>
        {
          inGroup ? (
            <Text>You are in a group</Text>
          ) : (
            <Text>You are not in a group</Text>
          )
        }
        <TextInputBar 
          label="Group Name"
          onChangeText={setGroupName}
        />
        <ButtonComp text="Create" onPress={ handleCreateGroup} />
      </View>
    </View>
  );
};


export default GroupScreen;