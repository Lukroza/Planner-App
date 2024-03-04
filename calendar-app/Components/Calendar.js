import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';

const App = () => {
  const [selected, setSelected] = useState('');
  const [calendarHeight, setCalendarHeight] = useState(350);
  const [events, setEvents] = useState({
    '2024-03-20': { events: [{ name: 'Event 1', time: '10:00 AM' }, { name: 'Event 2', time: '02:00 PM' }] },
    '2024-03-22': { events: [{ name: 'Event 3', time: '12:00 PM' }, { name: 'Event 4', time: '04:00 PM' }] },
  });

  const renderEvents = () => {
    if (events[selected] && events[selected].events) {
      return events[selected].events.map((event, index) => (
        <View key={index} style={styles.event}>
          <Text style={styles.eventText}>{event.name} at {event.time}</Text>
        </View>
      ));
    } else {
      return <Text>No Events</Text>;
    }
  };
  

  const markedDates = Object.keys(events).reduce((acc, curr) => {
    acc[curr] = {...events[curr], marked: true, dotColor: 'red'};
    return acc;
  }, {});

  if (selected) {
    markedDates[selected] = {...markedDates[selected], selected: true, disableTouchEvent: true, selectedDotColor: 'orange'};
  }

  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={styles.container}>
      <View
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setCalendarHeight(height);
        }}
      >
        <Calendar
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          markedDates={markedDates}
        />
      </View>
      <ScrollView style={[styles.eventsContainer, { maxHeight: windowHeight - calendarHeight - 5 }]}>
        {renderEvents()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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

export default App;
