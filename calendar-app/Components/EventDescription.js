import React, { useEffect, useState } from "react";
import { Modal, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  GlobalFont,
  GlobalHeaderColor,
  GlobalRedButtonColor,
  GlobalSecondaryColor,
} from "../Styles";
import { getEventDetails } from "./API/Events/EventDetails";
import { getUserId } from "./Storage/userDataStorage";
import { joinEvent } from "./API/Events/JoinEvent";
import { leaveEvent } from "./API/Events/LeaveEvent";
import { getUserById } from "./API/Users/UserGetById";
import { deleteEvent } from "./API/Events/DeleteEvent";
import ButtonComp from "./ButtonComp";
import Toast from "react-native-toast-message";

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

const EventDescription = ({
  deleteLocalEvent,
  isVisible,
  onClose,
  event,
  showAttendees = true,
}) => {
  const [eventDetails, setEventDetails] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [ownerUsername, setOwnerUsername] = useState(null);

  useEffect(() => {
    getUser().then(setUserId);
  }, []);

  useEffect(() => {
    if (userId !== null) {
      getUsername(userId).then((username) => {
        setUsername(username);
        if (event) {
          getEventDetails({ eventId: event.id }).then((details) => {
            setEventDetails(details),
              getUsername(details.userId).then(setOwnerUsername);
          });
        }
      });
    }
  }, [event, userId]);

  const DeleteEvent = async () => {
    try {
      await deleteEvent({ eventId: event.id, userId: userId });
      deleteLocalEvent();
      onClose();
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Event deleted",
      });
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong",
      });
    }
  };

  const JoinEvent = async () => {
    setButtonDisabled(true);
    await joinEvent({ eventId: event.id, userId });
    getEventDetails({ eventId: event.id }).then(setEventDetails);
    setTimeout(() => setButtonDisabled(false), 5000); // 5 seconds cooldown
    event.attendeeCount += 1;
  };

  const LeaveEvent = async () => {
    setButtonDisabled(true);
    await leaveEvent({ eventId: event.id, userId });
    getEventDetails({ eventId: event.id }).then(setEventDetails);
    setTimeout(() => setButtonDisabled(false), 5000); // 5 seconds cooldown
    event.attendeeCount -= 1;
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <View style={styles.modalContent}>
          <CloseButton onPress={onClose} />
          <Text style={styles.eventName}>{event?.name}</Text>
          <Text style={styles.eventTime}>
            {new Date(
              event?.time ? event.time : event.date
            ).toLocaleDateString()}
          </Text>
          <Text style={styles.descriptionTitle}>Created by</Text>
          <Text style={styles.descriptionText}>{ownerUsername}</Text>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            {eventDetails?.description}
          </Text>
          <Text style={styles.attendeesTitle}>Attendees</Text>
          <Text style={styles.attendeesText}>
            {userId &&
            eventDetails?.userId &&
            username &&
            eventDetails?.attendees
              ? showAttendees
                ? eventDetails?.attendees.length > 0
                  ? eventDetails?.attendees.map((name) => name + " ")
                  : "Be The First One!"
                : `People joined: ${eventDetails?.attendees.length}`
              : null}
          </Text>
          {userId &&
          eventDetails?.userId &&
          username &&
          eventDetails?.attendees ? (
            userId === eventDetails?.userId ? (
              <ButtonComp
                text="Delete Event"
                onPress={DeleteEvent}
                color={GlobalRedButtonColor}
              />
            ) : eventDetails?.attendees?.includes(username) ? (
              <TouchableOpacity
                disabled={isButtonDisabled}
                style={styles.leaveButton}
                onPress={LeaveEvent}
              >
                <Text style={styles.buttonText}>Leave</Text>
              </TouchableOpacity>
            ) : !eventDetails?.attendees?.includes(username) ? (
              <TouchableOpacity
                disabled={isButtonDisabled}
                style={styles.joinButton}
                onPress={JoinEvent}
              >
                <Text style={styles.buttonText}>Join</Text>
              </TouchableOpacity>
            ) : null
          ) : null}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: GlobalSecondaryColor,
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  eventName: {
    fontFamily: GlobalFont,
    color: GlobalHeaderColor,
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 8,
  },
  eventTime: {
    fontFamily: GlobalFont,
    color: "white",
    fontSize: 18,
    marginBottom: 16,
  },
  descriptionTitle: {
    fontFamily: GlobalFont,
    color: GlobalHeaderColor,
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  descriptionText: {
    fontFamily: GlobalFont,
    color: "white",
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  attendeesTitle: {
    fontFamily: GlobalFont,
    color: GlobalHeaderColor,
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  attendeesText: {
    fontFamily: GlobalFont,
    color: "white",
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  joinButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#58a700",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 2,
    width: "35%",
  },
  leaveButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF0000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 2,
    width: "35%",
  },
  buttonText: {
    fontFamily: GlobalFont,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EventDescription;
