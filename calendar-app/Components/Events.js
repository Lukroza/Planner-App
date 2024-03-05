import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';

const Events = ({ events, selectedDate, calendarHeight }) => {
  const renderEvents = () => {
    if (events[selectedDate] && events[selectedDate].events) {
      return events[selectedDate].events.map((event, index) => (
        <View key={index} style={styles.event}>
          <Text style={styles.eventText}>{event.name} at {event.time}</Text>
        </View>
      ));
    } else {
      return null;
    }
  };

  const windowHeight = Dimensions.get('window').height;

  return (
    <ScrollView style={[styles.eventsContainer, { maxHeight: windowHeight - calendarHeight - 5 }]}>
      {renderEvents()}
    </ScrollView>
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
});

export default Events;
