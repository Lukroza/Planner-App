import * as SecureStore from 'expo-secure-store';

export async function storeUserInfo(userId, inGroup, isLoggedIn, groupId) {
  try {
    await SecureStore.setItemAsync('userId', userId.toString());
    await SecureStore.setItemAsync('inGroup', JSON.stringify(inGroup));
    await SecureStore.setItemAsync('isLoggedIn', JSON.stringify(isLoggedIn));
    await SecureStore.setItemAsync('groupId', groupId.toString());
  } catch (error) {
    console.error('Error storing the user info', error);
  }
}

export async function getUserId() {
  try {
    const userId = await SecureStore.getItemAsync('userId');
    return userId;
  } catch (error) {
    console.error('Error retrieving the user ID', error);
  }
}

export async function getInGroupStatus() {
  try {
    const inGroup = await SecureStore.getItemAsync('inGroup');
    return JSON.parse(inGroup);
  } catch (error) {
    console.error('Error retrieving the inGroup status', error);
  }
}

export async function getIsLoggedIn() {
  try {
    const isLoggedIn = await SecureStore.getItemAsync('isLoggedIn');
    return JSON.parse(isLoggedIn);
  } catch (error) {
    console.error('Error retrieving the isLoggedIn status', error);
  }
}

export async function getGroupId() {
  try {
    const groupId = await SecureStore.getItemAsync('groupId');
    return groupId;
  } catch (error) {
    console.error('Error retrieving the group ID', error);
  }
}