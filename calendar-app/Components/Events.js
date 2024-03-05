import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import EventDescription from './EventDescription'; // Assuming this is a React Native modal now

const Events = ({ events, selectedDate, calendarHeight }) => {
  const windowHeight = Dimensions.get('window').height;
  const data = events[selectedDate] ? events[selectedDate].events : [];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventPress = (item) => {
    setSelectedEvent(item);
    setIsModalVisible(true);
  };

  const renderEvent = ({ item }) => (
    <TouchableOpacity onPress={() => handleEventPress(item)}>
      <View style={styles.event}>
        <Text style={styles.eventText}>{item.name} at {item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderEvent}
        keyExtractor={(item, index) => item.id || index.toString()}
        style={[styles.eventsContainer, { maxHeight: windowHeight - calendarHeight - 5 }]}
        ListEmptyComponent={<Text style={styles.noEventsText}>No events</Text>}
      />
      {selectedEvent && (
        <EventDescription 
          isVisible={isModalVisible} 
          event={selectedEvent} 
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  eventsContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  event: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  eventText: {
    color: 'black',
  },
  noEventsText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});

export default Events;
