import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Events from './Events';
import { getUserId } from './Storage/userDataStorage';
import { getAllEvents } from './API/Events/AllEventFetcher';

const App = ({ showEvents, onDayPress, eventMonthCount, getGroupId } ) => {
  const [selected, setSelected] = useState('');
  const [calendarHeight, setCalendarHeight] = useState(350);
  const [events, setEvents] = useState({});
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [eventCount, setEventCount] = useState(null);

  useEffect(() => {
    fetchEventHeaders();
  }, []);

  const fetchEventHeaders = async () => {
    const userId = await getUserId();
    const fetchedEvents = await getAllEvents({userId});
    setEvents(fetchedEvents);
  };

  const fetchEventCount = useCallback(async (date) => {
    try {
      const groupId = await getGroupId();
      if (groupId) {
        const count = await eventMonthCount({ groupId, date });
        setEventCount(count);
      } else {
        console.log('GroupId not found');
      }
    } catch (error) {
      console.error("Failed to fetch event count:", error);
    }
  }, []);

  useEffect(() => {
    if (selected) {
      fetchEventCount(selected);
      const filteredEvents = Object.values(events).filter(event =>
        new Date(event.date).toLocaleDateString() === new Date(selected).toLocaleDateString()
      );
      setSelectedEvents(filteredEvents);
    }
  }, [selected, fetchEventCount]);


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
      {eventCount !== null && (
        <View style={styles.eventCountContainer}>
          <Text style={styles.eventCountText}>Events this month: {eventCount}</Text>
        </View>
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