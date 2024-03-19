import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { GlobalColor } from "../../Styles";
import TextInputBar from "../TextInputBar";
import ButtonComp from '../ButtonComp';
import { getUserInvites } from "../API/Invites/UserInvites";
import { getGroupName } from "../API/Groups/GroupName";
import { declineInvite } from "../API/Invites/DeclineInvite";
import { acceptInvite } from "../API/Invites/AcceptInvite";
import { storeUserInfo } from "../Storage/userDataStorage";

const GroupInput = ({ setGroupName, handleCreateGroup, userId, onRefresh }) => {
  const [invites, setInvites] = useState(null);
  const [groupNames, setGroupNames] = useState({});

  useEffect(() => { //CIA BLOGAI NES USER ID BUNA NULL IS PRADZIU TD PRISIJUNGIA IR TAMP KAZKOKS IR DEL TO FETCHINA NORS NE GRUPEJ
    fetchInvitesAndGroupNames();
  }, [userId]);

  const fetchInvitesAndGroupNames = async () => {
    const userInvites = await getUserInvites({ userId: userId });
    setInvites(userInvites);

    const names = {};
    for (const invite of userInvites) {
      const groupNameData = await getGroupName({ groupId: invite.group_id });
      names[invite.group_id] = groupNameData.name;
    }
    setGroupNames(names);
  };

  const updateGroupStatus = (group_id) => {
    storeUserInfo(userId, true, true, group_id);
  };

  const handleDeclineInvite = async (inviteId) => {
    await declineInvite({ invite_id: inviteId });
    fetchInvitesAndGroupNames();
  };

  const handleAcceptInvite = async (inviteId, group_id) => {
    await acceptInvite({ invite_id: inviteId });
    updateGroupStatus(group_id);
    onRefresh();
  };

  const renderInvites = () => {
    return invites.map((invite, index) => (
      <View key={index} style={styles.inviteContainer}>
        <Text style={styles.inviteText}>
          You have been invited to join {groupNames[invite.group_id]}
        </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttonAccept} onPress={() => handleAcceptInvite(invite.id, invite.group_id)}>
            <Text style={styles.buttonText}>✓</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDecline} onPress={() => handleDeclineInvite(invite.id)}>
            <Text style={styles.buttonText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    ));
  };

  return (
    <>
      <View style={styles.topContainer}>
        <TextInputBar label="Group Name" onChangeText={setGroupName} style={styles.textInput} />
        <ButtonComp text="Create" onPress={handleCreateGroup} style={styles.createButton} />
      </View>
      <View style={styles.bottomContainer}>
        {invites && renderInvites()}
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