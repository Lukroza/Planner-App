import * as SecureStore from 'expo-secure-store';

// Function to store the user ID and inGroup status
export async function storeUserInfo(userId, inGroup) {
  try {
    await SecureStore.setItemAsync('userId', userId.toString());
    await SecureStore.setItemAsync('inGroup', JSON.stringify(inGroup));
  } catch (error) {
    console.error('Error storing the user info', error);
  }
}

// Function to retrieve the user ID
export async function getUserId() {
  try {
    const userId = await SecureStore.getItemAsync('userId');
    return userId;
  } catch (error) {
    console.error('Error retrieving the user ID', error);
  }
}

// Function to retrieve the inGroup status
export async function getInGroupStatus() {
  try {
    const inGroup = await SecureStore.getItemAsync('inGroup');
    return JSON.parse(inGroup);
  } catch (error) {
    console.error('Error retrieving the inGroup status', error);
  }
}
