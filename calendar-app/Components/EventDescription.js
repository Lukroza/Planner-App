import React, { useEffect, useState } from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalFont, GlobalSecondaryColor } from '../Styles';
import { getEventDetails } from './API/Events/EventDetails';
import { getUserId } from './Storage/userDataStorage';
import { joinEvent } from './API/Events/JoinEvent';
import { getUserById } from './API/Users/UserGetById';

const CloseButton = ({ onPress }) => (
  <TouchableOpacity style={styles.closeButton} onPress={onPress}>
    <Text style={styles.closeButtonText}>×</Text>
  </TouchableOpacity>
);

async function getUser() {
  const userId = await getUserId();
  return userId;
}

async function getUsername(userId) {
  const username = await getUserById({ userId });
  return username.username;
}

const EventDescription = ({ isVisible, onClose, event }) => {
  const [eventDetails, setEventDetails] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    getUser().then(setUserId);
  }, []);

  useEffect(() => {
    if (userId !== null) {
      getUsername(userId).then(setUsername);
    }
  }, [userId]);

  useEffect(() => {
    if (event && username !== null) {
      getEventDetails({eventId: event.id}).then(setEventDetails);
    }
  }, [username]);

  const JoinEvent = async () => {
    await joinEvent({eventId: event.id, userId});
    getEventDetails({eventId: event.id}).then(setEventDetails);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={onClose}
        activeOpacity={1}>
        <View style={styles.modalContent}>
          <CloseButton onPress={onClose} />
          <Text style={styles.eventName}>{event?.name}</Text>
          <Text style={styles.eventTime}>{event?.time}</Text>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{eventDetails?.description}</Text>
          <Text style={styles.attendeesTitle}>Attendees</Text>
          <Text style={styles.attendeesText}>{eventDetails?.attendees.map(name => name + " ") || "Be The First One!"}</Text>
          { userId !== eventDetails?.userId && !eventDetails?.attendees?.includes(username) ? (
            <TouchableOpacity style={styles.joinButton} onPress={JoinEvent}>
            <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          ) : null }
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: GlobalSecondaryColor,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  eventName: {
    fontFamily: GlobalFont,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  eventTime: {
    fontFamily: GlobalFont,
    color: 'white',
    fontSize: 18,
    marginBottom: 16,
  },
  descriptionTitle: {
    fontFamily: GlobalFont,
    color: 'white',
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descriptionText: {
    fontFamily: GlobalFont,
    color: 'white',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  attendeesTitle: {
    fontFamily: GlobalFont,
    color: 'white',
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  attendeesText: {
    fontFamily: GlobalFont,
    color: 'white',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  joinButton: {
    backgroundColor: '#58a700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 2,
  },
  joinButtonText: {
    fontFamily: GlobalFont,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventDescription;
