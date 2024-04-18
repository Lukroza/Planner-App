import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Events from './Events';
import { getUserId } from './Storage/userDataStorage';
import { getAllEvents } from './API/Events/AllEventFetcher';

const CalendarComponent = ({ showEvents, onDayPress, eventMonthCount, getGroupId }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [calendarHeight, setCalendarHeight] = useState(350);
  const [events, setEvents] = useState({});
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [eventCount, setEventCount] = useState(null);
  const [currentDate, setCurrentDate] = useState(() => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  });

  useEffect(() => {
    fetchEventHeaders();
  }, [events]);

  useEffect(() => {
    if (currentDate) {
      fetchEventCount(currentDate);
    }
  }, [currentDate, fetchEventCount, events]);

  const fetchEventHeaders = async () => {
    const userId = await getUserId();
    const fetchedEvents = await getAllEvents({ userId });
    setEvents(fetchedEvents);
  };
  
  const filterLocalEvents = (id) => {
    setEvents(events.filter((event) => event.id !== id));
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
      console.error('Failed to fetch event count:', error);
    }
  }, [getGroupId, eventMonthCount]);

  useEffect(() => {
    if (selectedDate) {
      fetchEventCount(selectedDate);
      const filteredEvents = Object.values(events).filter((event) =>
        new Date(event.date).toLocaleDateString() === new Date(selectedDate).toLocaleDateString()
      );
      setSelectedEvents(filteredEvents);
    }
  }, [selectedDate, fetchEventCount, events]);

  const computeMarkedDates = () => {
    const dates = Object.keys(events).reduce((acc, curr) => {
      acc[curr] = { ...events[curr], marked: true, dotColor: 'red' };
      return acc;
    }, {});

    if (selectedDate) {
      dates[selectedDate] = {
        ...dates[selectedDate],
        selected: true,
        disableTouchEvent: true,
        selectedDotColor: 'orange',
      };
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
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
            if (onDayPress) {
              onDayPress(day.dateString);
            }
          }}
          onVisibleMonthsChange={(months) => {
            const currentSelectedDate = `${months[0].year}-${String(months[0].month).padStart(2, '0')}`;
            setCurrentDate(currentSelectedDate);
          }}
          markedDates={computeMarkedDates()}
        />
      </View>
      {showEvents && selectedDate && (
        <Events filterLocalEvents={filterLocalEvents} events={selectedEvents} selectedDate={selectedDate} calendarHeight={calendarHeight} />
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
  eventCountContainer: {
    
  },
  eventCountText: {
    
  },
});

export default CalendarComponent;