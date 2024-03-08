import { useEffect, useState } from 'react';
import store from 'react-native-simple-store';

export const useUserSettings = (userIDKey, inGroupKey) => {
  const [settings, setSettings] = useState({ userID: null, inGroup: null, isLoaded: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storedUserID, storedInGroup] = await Promise.all([
          store.get(userIDKey),
          store.get(inGroupKey),
        ]);

        setSettings((prevState) => ({
          ...prevState,
          userID: storedUserID !== null ? parseFloat(storedUserID) : null,
          inGroup: storedInGroup !== null ? storedInGroup : null,
          isLoaded: true,
        }));
      } catch (error) {
        logError('fetching user settings from store', error);
      }
    };

    fetchData();
  }, [userIDKey, inGroupKey]);

  const logError = (action, error) => {
    console.error(`Error ${action}:`, error);
  };

  const saveSetting = async (key, value, setter) => {
    try {
      await store.save(key, typeof value === 'number' ? value.toString() : value);
      setter(value);
    } catch (error) {
      logError(`saving ${key} to store`, error);
    }
  };

  const saveUserID = (newUserID) => {
    saveSetting(userIDKey, newUserID, (val) => setSettings((prevState) => ({ ...prevState, userID: val })));
  };

  const saveInGroup = (newInGroup) => {
    saveSetting(inGroupKey, newInGroup, (val) => setSettings((prevState) => ({ ...prevState, inGroup: val })));
  };

  return { ...settings, saveUserID, saveInGroup };
};