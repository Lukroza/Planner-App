import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, FlatList, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import Header from '../Components/Header';
import TextInputBar from '../Components/TextInputBar';
import { getInGroupStatus, getUserId, storeUserInfo, getGroupId } from '../Components/Storage/userDataStorage';
import ButtonComp from '../Components/ButtonComp';
import { useState, useEffect } from 'react';
import { createGroup } from '../Components/API/Groups/GroupCreation';
import { ActivityIndicator } from 'react-native';
import { GlobalColor, GlobalFont, GlobalSecondaryColor, GlobalTextColor } from '../Styles';
import NoGroupSection from '../Components/GroupSection/NoGroupSection';
import { getGroupMembers } from '../Components/API/Groups/GroupMembers';
import InGroupSection from '../Components/GroupSection/InGroupSection'

async function getGroupStatus() {
    const inGroup = await getInGroupStatus();
    return inGroup;
}
async function getUser() {
    const userId = await getUserId();
    return userId;
}
async function getGroup() {
  const groupId = await getGroupId();
  return groupId;
}

const GroupScreen = () => {
  const [inGroup, setInGroup] = useState(null);
  const [userId, setUserId] = useState(null);
  const [groupName, setGroupName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [groupId, setGroupId] = useState(null);

  useEffect(() => {
    getGroupStatus().then(setInGroup);
    getUser().then(setUserId);
    getGroup().then(setGroupId);
    
    handleGetMembers();
  }, []);

  const handleGetMembers = async () => {
    await getGroupMembers({ groupId })
      .then((data) => {
        setMembers(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCreateGroup = async () => {
    setIsLoading(true);

    const groupData = {
      name: groupName,
      owner_id: userId,
    };
    
    await createGroup(groupData).then((response) => {
      storeUserInfo(userId, true, true, response);
      setInGroup(true);
      setIsLoading(false);
    });
  };

  return (
    <View style={styles.view}>
      <Header title={"Group"} />
      <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
      <View>

        {
          isLoading ? (
            <ActivityIndicator size="large" color={GlobalSecondaryColor}  style={styles.topContainer}/> 
          ) : inGroup ? (
            <InGroupSection />
          ) : (
            <NoGroupSection setGroupName={setGroupName} handleCreateGroup={handleCreateGroup} />
          )
        }
      </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
      flex: 1,
      backgroundColor: GlobalColor,
  },
  topContainer: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
    padding: 20,
    gap: 20,
    alignSelf: 'center',
  },
});

export default GroupScreen;