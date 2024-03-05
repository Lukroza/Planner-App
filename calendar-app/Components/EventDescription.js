import React from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const EventDescription = ({ isVisible, onClose, event }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose} activeOpacity={1}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          <Text style={styles.eventName}>{event?.name}</Text>
          <Text style={styles.eventTime}>{event?.time}</Text>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>KEBAB TIME (Placeholder text)</Text> 
          <Text style={styles.attendeesTitle}>Attendees</Text>
          <Text style={styles.attendeesText}>Lukas, Ignas, Vilius, Jonas (Placeholder text)</Text>
          <TouchableOpacity style={styles.joinButton} onPress={() => {}}>
            <Text style={styles.joinButtonText}>Join</Text>
          </TouchableOpacity>
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
    backgroundColor: '#17161B',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  eventName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  eventTime: {
    color: 'white',
    fontSize: 18,
    marginBottom: 16,
  },
  descriptionTitle: {
    color: 'white',
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descriptionText: {
    color: 'white',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  attendeesTitle: {
    color: 'white',
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  attendeesText: {
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
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventDescription;
