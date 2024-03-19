import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, FlatList, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import Header from '../Components/Header';
import { getInGroupStatus, getUserId, storeUserInfo, getGroupId } from '../Components/Storage/userDataStorage';
import { useState, useEffect } from 'react';
import { createGroup } from '../Components/API/Groups/GroupCreation';
import { ActivityIndicator } from 'react-native';
import { GlobalColor, GlobalFont, GlobalSecondaryColor, GlobalTextColor } from '../Styles';
import NoGroupSection from '../Components/GroupSection/NoGroupSection';
import InGroupSection from '../Components/GroupSection/InGroupSection';

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
  const [refreshKey, setRefreshKey] = useState(0);

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

  const handleRefresh = () => {
    setRefreshKey(oldKey => oldKey + 1);
    setInGroup(true);
  };

  return (
    <View style={styles.view}>
      <Header title={"Group"} />
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <View key={refreshKey} >
          {
            isLoading ? (
              <ActivityIndicator size="large" color={GlobalSecondaryColor} style={styles.topContainer} />
            ) : inGroup ? (
              <InGroupSection />
            ) : (
              <NoGroupSection setGroupName={setGroupName} handleCreateGroup={handleCreateGroup} onRefresh={handleRefresh} key={refreshKey} />
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