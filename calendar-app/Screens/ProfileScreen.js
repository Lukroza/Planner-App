import {
  GlobalColor,
  GlobalTextColor,
  GlobalRedButtonColor,
  GlobalAccentColor,
} from "../Styles";
import {
  storeUserInfo,
  getUserId,
  getGroupId,
} from "../Components/Storage/userDataStorage";
import ButtonComp from "../Components/ButtonComp";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { getGroupName } from "../Components/API/Groups/GroupName";
import { getInGroupStatus } from "../Components/Storage/userDataStorage";
import { getUserById } from "../Components/API/Users/UserGetById";
import Toast from "react-native-toast-message";
import { useNavigation, CommonActions } from "@react-navigation/native";
import GroupStats from "../Components/GroupStats";
import { updateUsername } from "../Components/API/Users/UpdateUsername";
import { IconButton, MD3Colors } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

const ProfileScreen = () => {
  const [groupNameData, setGroupName] = useState("");
  const [inGroup, setInGroup] = useState(null);
  const [username, setUsername] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const isFocused = useIsFocused(); 

  async function getGroupStatus() {
    const inGroup = await getInGroupStatus();
    return inGroup;
  }

  const fetchGroupName = async () => {
    const groupId = await getGroupId();
    const groupNameData = await getGroupName({ groupId });
    setGroupName(groupNameData);
  };

  async function fetchUsername() {
    const userId = await getUserId();
    const user = await getUserById({ userId });
    if (user) {
      setUsername(user.username);
    }
  }

  useEffect(() => {
    fetchUsername();
    getGroupStatus().then(setInGroup);
    if(inGroup)
      {
        fetchGroupName();
      }
  }, [isFocused]);

  const handleUsernameChange = async () => {
    if (newUsername === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Username cannot be empty",
      });
      return;
    }

    try {
      const userId = await getUserId();
      await updateUsername({ userId, newUsername });
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Username updated",
      });
      setUsername(newUsername);
      setNewUsername("");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
  };

  const navigation = useNavigation();

  const handleLogOut = () => {
    storeUserInfo("0", false, false, "0");
    Toast.show({
      type: "success",
      text1: "Logged out",
      text2: "You have been logged out",
    });
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Registration" }],
      })
    );
  };

  return (
    <View style={styles.wrapper}>
      <Header title={"Profile"} />
      <View style={styles.container}>
        <Text style={styles.topLine}>About You</Text>
        <View style={styles.segment}>
          <Text style={styles.value}>Username:</Text>
          <TextInput
            placeholderTextColor={"white"}
            style={styles.input}
            placeholder={username}
            value={newUsername}
            onChangeText={setNewUsername}
          />
          <IconButton
            icon={"pencil"}
            iconColor={"#FFFFFF"}
            size={24}
            onPress={handleUsernameChange}
          />
        </View>
        <View style={styles.segment}>
          <Text style={styles.value}>Group:</Text>
          {inGroup ? (
            <Text style={styles.value}>{groupNameData.name}</Text>
          ) : (
            <Text style={styles.value}>Not in a group</Text>
          )}
        </View>
        <View style={styles.segment}>
          <Text style={styles.value}>Email:</Text>
          <Text style={styles.value}></Text>
        </View>
        {inGroup && (
          <View style={styles.buttonContainer}>
            <ButtonComp text="GroupStats" onPress={() => setModalVisible(true)} />
            <GroupStats
              isVisible={isModalVisible}
              onClose={() => setModalVisible(false)}
            />
          </View>
        )}
        </View>
        <View style={styles.buttonContainer}>
          <ButtonComp
            text="Log Out"
            onPress={handleLogOut}
            color={GlobalRedButtonColor}
          />
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: GlobalColor,
    flex: 1,
  },
  topLine: {
    color: "#79AD79",
    fontSize: 20,
    fontWeight: "600",
  },
  container: {
    margin: 20,
    gap: 5,
  },
  value: {
    color: GlobalTextColor,
    fontSize: 16,
  },
  segment: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  input: {
    color: "white",
    borderRadius: 10,
    width: "50%",
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: GlobalAccentColor,
    borderWidth: 2,
  },
  buttonContainer: {
    justifyContent: "center",
    padding: 10,
    alignItems: "center",
  },
});

export default ProfileScreen;
