import { React, useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { GlobalColor } from "../../Styles";
import TextInputBar from  "../TextInputBar";
import ButtonComp from '../ButtonComp';
import { getUserInvites } from "../API/Invites/UserInvites";
import { getGroupName } from "../API/Groups/GroupName";

const GroupInput = ({ setGroupName, handleCreateGroup, userId }) => {
  const [invites, setInvites] = useState(null);
  const [groupNames, setGroupNames] = useState({});

  useEffect(() => {
    const fetchInvitesAndGroupNames = async () => {
      const userInvites = await getUserInvites({ userId });
      setInvites(userInvites);

      const names = {};
      for (const invite of userInvites) {
        try {
          const groupNameData = await getGroupName({ groupId: invite.group_id });
          if (groupNameData && groupNameData.name) {
            names[invite.group_id] = groupNameData.name;
          }
        } catch (error) {
          console.error('Error fetching group name:', error);
          names[invite.group_id] = 'Unknown Group';
        }
      }
      setGroupNames(names);
    };

    fetchInvitesAndGroupNames();
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
              You have been invited to join {groupNames[invite.group_id]}
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
    backgroundColor: "#FFFFFF", 
  },
  topContainer: {
    padding: 20,
  },
  textInput: {
    marginVertical: 10,
  },
  createButton: {
    marginTop: 10,
    backgroundColor: "#0000FF", 
  },
  bottomContainer: {
    padding: 20,
  },
  invitationsText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  inviteContainer: {
    padding: 10,
    backgroundColor: "#E5E5E5", 
    borderRadius: 10,
    marginBottom: 10,
  },
  inviteText: {
    fontSize: 14,
    color: "#000000", 
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  buttonAccept: {
    padding: 10,
    backgroundColor: "#00FF00", 
    borderRadius: 5,
  },
  buttonDecline: {
    padding: 10,
    backgroundColor: "#FF0000",
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default GroupInput;