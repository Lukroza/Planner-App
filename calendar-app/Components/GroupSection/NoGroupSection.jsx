import { React, useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { GlobalColor } from "../../Styles";
import TextInputBar from  "../TextInputBar";
import ButtonComp from '../ButtonComp';
import { getUserInvites } from "../API/Invites/UserInvites";

const GroupInput = ({ setGroupName, handleCreateGroup, userId }) => {
  const [invites, setInvites] = useState(null);

  useEffect(() => {
    const fetchInvites = async () => {
      const userInvites = await getUserInvites({ userId });
      setInvites(userInvites);
    };

    fetchInvites();
  }, [userId]);

  return (
    <>
      <View style={styles.topContainer}>
        <TextInputBar label="Group Name" onChangeText={setGroupName} style={styles.textInput}/>
        <ButtonComp text="Create" onPress={handleCreateGroup} style={styles.createButton}/>
      </View>
      <View style={styles.bottomContainer}>
        {invites && invites.map((invite, index) => (
          <View key={index} style={styles.inviteContainer}>
            <Text style={styles.inviteText}>
              You have been invited to join {invite.groupName}
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.buttonAccept}>
                <Text style={styles.buttonText}>✓</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonDecline}>
                <Text style={styles.buttonText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Replace with your global background color
  },
  topContainer: {
    padding: 20,
  },
  textInput: {
    marginVertical: 10,
  },
  createButton: {
    marginTop: 10,
    backgroundColor: "#0000FF", // Adjust to match the button color in the image
  },
  bottomContainer: {
    padding: 20,
  },
  inviteContainer: {
    padding: 10,
    backgroundColor: "#E5E5E5", // Adjust to match the invite background color in the image
    borderRadius: 10,
    marginBottom: 10,
  },
  inviteText: {
    fontSize: 14,
    color: "#000000", // Adjust to match the invite text color in the image
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  buttonAccept: {
    padding: 10,
    backgroundColor: "#00FF00", // Adjust to match the accept button color in the image
    borderRadius: 5,
  },
  buttonDecline: {
    padding: 10,
    backgroundColor: "#FF0000", // Adjust to match the decline button color in the image
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF", // Adjust to match the button text color in the image
    fontSize: 16,
  },
});

export default GroupInput;