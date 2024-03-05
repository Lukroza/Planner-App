import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Events from './Events';

const App = ({ showEvents , onDayPress}) => {
  const [selected, setSelected] = useState('');
  const [calendarHeight, setCalendarHeight] = useState(350);
  const [events, setEvents] = useState({
    '2024-03-20': { events: [{ name: 'Event 11', time: '10:00 AM' }, { name: 'Event 12', time: '02:00 PM' }, { name: 'Event 11', time: '10:00 AM' }, { name: 'Event 12', time: '02:00 PM' }, { name: 'Event 11', time: '10:00 AM' }, { name: 'Event 12', time: '02:00 PM' }, { name: 'Event 11', time: '10:00 AM' }, { name: 'Event 12', time: '02:00 PM' }, { name: 'Event 11', time: '10:00 AM' }, { name: 'Event 12', time: '02:00 PM' }, { name: 'Event 11', time: '10:00 AM' }, { name: 'Event 12', time: '02:00 PM' }, { name: 'Event 11', time: '10:00 AM' }, { name: 'Event 12', time: '02:00 PM' }, { name: 'Event 11', time: '10:00 AM' }, { name: 'Event 12', time: '02:00 PM' }]  },
    '2024-03-22': { events: [{ name: 'Event 3', time: '12:00 PM' }, { name: 'Event 4', time: '04:00 PM' }] },
  });

  const computeMarkedDates = () => {
    const dates = Object.keys(events).reduce((acc, curr) => {
      acc[curr] = {...events[curr], marked: true, dotColor: 'red'};
      return acc;
    }, {});

    if (selected) {
      dates[selected] = {...dates[selected], selected: true, disableTouchEvent: true, selectedDotColor: 'orange'};
    }

    return dates;
  };

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
            if(onDayPress)
            {
              onDayPress(day.dateString);
            }
          }}
          markedDates={computeMarkedDates()}
        />
      </View>
      {showEvents && selected && (
        <Events events={events} selectedDate={selected} calendarHeight={calendarHeight} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;