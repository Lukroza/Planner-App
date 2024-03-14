import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useLayoutEffect } from 'react';
import Header from '../Components/Header';
import TextInputBar from '../Components/TextInputBar';
import { getInGroupStatus, getUserId, storeUserInfo } from '../Components/Storage/userDataStorage';
import ButtonComp from '../Components/ButtonComp';
import { useState, useEffect } from 'react';
import { createGroup } from '../Components/API/Groups/GroupCreation';
import { ActivityIndicator } from 'react-native';
import { GlobalColor, GlobalSecondaryColor } from '../Styles'
import NoGroupSection from '../Components/GroupSection/NoGroupSection'

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getGroupStatus().then(setInGroup);
    getUser().then(setUserId);
  }, []);

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
            
            <Text>Cia probably geriau butu sukurt component kad ten InGroupView ir ten viska det galimai taip pat ir jei nera grupei</Text>
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