import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Events from './Events';
import { getUserId } from './Storage/userDataStorage';
import { getAllEvents } from './API/Events/AllEventFetcher';

const App = ({ showEvents , onDayPress}) => {
  const [selected, setSelected] = useState('');
  const [calendarHeight, setCalendarHeight] = useState(350);
  const [events, setEvents] = useState({});
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    fetchEventHeaders();
  }, []);

  const fetchEventHeaders = async () => {
    const userId = await getUserId();

    const fetchedEvents = await getAllEvents({userId});
    setEvents(fetchedEvents);
  };

  useEffect(() => {
    if (events) {
      const filteredEvents = Object.values(events).filter(event =>
        new Date(event.date).toLocaleDateString() === new Date(selected).toLocaleDateString()
      );
      setSelectedEvents(filteredEvents);
    }
  }, [selected]);


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
        <Events events={selectedEvents} selectedDate={selected} calendarHeight={calendarHeight} />
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