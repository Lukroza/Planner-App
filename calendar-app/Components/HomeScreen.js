import React, {useState} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { storeUserInfo, getUserId, getInGroupStatus } from './Storage/userDataStorage'
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const [userId, setUserId] = useState('');
  const [inGroup, setInGroup] = useState(false);

  const randomizeAndStoreUserInfo = async () => {
    // Generate a random user ID (for simplicity, using a number between 1 and 10000)
    const randomUserId = Math.floor(Math.random() * 10000).toString();
    // Randomize inGroup status
    const randomInGroup = Math.random() < 0.5;

    // Store the new values
    await storeUserInfo(randomUserId, randomInGroup);

    // Update local state (optional, if you want to display or use the values in the UI)
    setUserId(randomUserId);
    setInGroup(randomInGroup);
  };

  // Function to display the stored user info (optional, for demonstration)
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
      {/* Button below is optional, for demonstration */}
      <Button
        title="Display Stored User Info"
        onPress={displayStoredUserInfo}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1, // The flex property specifies that the container will fill the whole screen.
    justifyContent: 'center', // This centers the content vertically within the container.
    alignItems: 'center', // This centers the content horizontally within the container.
    padding: 20, // Optional: Adds padding around the content for better appearance.
  },
});

export default HomeScreen;