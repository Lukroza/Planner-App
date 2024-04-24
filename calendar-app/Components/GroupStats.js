import React, { useEffect, useState } from "react";
import { Modal, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { GlobalFont, GlobalHeaderColor, GlobalSecondaryColor } from "../Styles";
import { getGroupId } from "./Storage/userDataStorage";
import { eventMonthCount } from "./API/Events/EventMonthCount";

const CloseButton = ({ onPress }) => (
  <TouchableOpacity style={styles.closeButton} onPress={onPress}>
    <Text style={styles.closeButtonText}>×</Text>
  </TouchableOpacity>
);

async function getGroup() {
  const groupId = await getGroupId();
  return groupId;
}

async function getDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}`;
    return formattedDate;
}

const GroupStats = ({isVisible, onClose}) => {
  const [eventCount, setEventCount] = useState(0);
  const [date, setDate] = useState(0);
  const [groupId, setGroupId] = useState(null);

  useEffect(() => {
    getDate().then(setDate);
    getGroup().then(setGroupId);
  }, []);

  useEffect(() => {
    if (groupId !== null && date !== null) {
        eventMonthCount({groupId, date}).then(setEventCount);
    }
  }, [groupId, date]);

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
          <Text style={styles.title}>Group Stats</Text>
          <Text style={styles.descriptionText}>
          Event Count: {eventCount}
          </Text>
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
  title: {
    fontFamily: GlobalFont,
    color: GlobalHeaderColor,
    alignSelf: "center",
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
});

export default GroupStats;