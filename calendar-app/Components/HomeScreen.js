import React, {useState} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { storeUserInfo, getUserId, getInGroupStatus } from './Storage/userDataStorage'
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const [userId, setUserId] = useState('');
  const [inGroup, setInGroup] = useState(false);

  const randomizeAndStoreUserInfo = async () => {
    const randomUserId = Math.floor(Math.random() * 10000).toString();
    const randomInGroup = Math.random() < 0.5;
    await storeUserInfo(randomUserId, randomInGroup);
    setUserId(randomUserId);
    setInGroup(randomInGroup);
  };

  const displayStoredUserInfo = async () => {
    const storedUserId = await getUserId();
    const storedInGroupStatus = await getInGroupStatus();
    console.log(`Stored User ID: ${storedUserId}, In Group: ${storedInGroupStatus}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>User ID: {userId}</Text>
      <Text>In Group: {inGroup ? 'Yes' : 'No'}</Text>
      <Button
        title="Randomize and Store User Info"
        onPress={randomizeAndStoreUserInfo}
      />
      <Button
        title="Display Stored User Info"
        onPress={displayStoredUserInfo}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 40, 
  },
});

export default HomeScreen;