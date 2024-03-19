import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { getUserInvites } from "../API/Invites/UserInvites";
import { getGroupName } from "../API/Groups/GroupName";
import { declineInvite } from "../API/Invites/DeclineInvite";
import { acceptInvite } from "../API/Invites/AcceptInvite";
import { getUserId } from "../Storage/userDataStorage";

async function getUser() {
  const userId = await getUserId();
  return userId;
}

const Invites = ({ onAccept, onDecline }) => {
  const [invites, setInvites] = useState(null);
  const [groupNames, setGroupNames] = useState({});

  useEffect(() => { 
    fetchInvitesAndGroupNames();
  }, []);

  const fetchInvitesAndGroupNames = async () => {
    const userId = await getUser();
    const userInvites = await getUserInvites({ userId });
    setInvites(userInvites);

    const names = {};
    for (const invite of userInvites) {
      const groupNameData = await getGroupName({ groupId: invite.group_id });
      names[invite.group_id] = groupNameData.name;
    }
    setGroupNames(names);
  };

  const handleDeclineInvite = async (inviteId) => {
    await declineInvite({ invite_id: inviteId });
    fetchInvitesAndGroupNames();
  };

  const handleAcceptInvite = async (inviteId, group_id) => {
    await acceptInvite({ invite_id: inviteId });
    onAccept(group_id);
  };

  const renderInvites = () => {
    return invites.map((invite, index) => (
      <View key={index} >
        <Text>
          You have been invited to join {groupNames[invite.group_id]}
        </Text>
        <View >
          <TouchableOpacity  onPress={() => handleAcceptInvite(invite.id, invite.group_id)}>
            <Text >✓</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => handleDeclineInvite(invite.id)}>
            <Text >✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    ));
  };

  return (
    <View>
      {invites && renderInvites()}
    </View>
  );
};

// Jonai good luck :)

export default Invites;