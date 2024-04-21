import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Events from './Events';
import { getUserId } from './Storage/userDataStorage';
import { getAllEvents } from './API/Events/AllEventFetcher';
import { GlobalBackgroundTextColor, GlobalColor, GlobalHeaderColor, GlobalSecondaryColor, GlobalTextColor } from '../Styles';

const CalendarComponent = ({ showEvents, onDayPress}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [calendarHeight, setCalendarHeight] = useState(350);
  const [events, setEvents] = useState({});
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    fetchEventHeaders();
  }, [events]);

  const fetchEventHeaders = async () => {
    const userId = await getUserId();
    const fetchedEvents = await getAllEvents({ userId });
    setEvents(fetchedEvents);
  };
  
  const filterLocalEvents = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  useEffect(() => {
    if (events) {
      const filteredEvents = Object.values(events).filter((event) =>
        new Date(event.date).toLocaleDateString() === new Date(selectedDate).toLocaleDateString()
      );
      setSelectedEvents(filteredEvents);
    }
  }, [selectedDate, events]);

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
          markedDates={computeMarkedDates()}
          theme={{
            calendarBackground: GlobalColor,
            backgroundColor: GlobalColor,
            monthTextColor: GlobalHeaderColor,
            selectedDayBackgroundColor: GlobalHeaderColor,
            selectedDayTextColor: GlobalColor,
            todayTextColor: GlobalHeaderColor,
            dayTextColor: GlobalTextColor,
            textDisabledColor: GlobalBackgroundTextColor,

          }}
        />
      </View>
      {showEvents && selectedDate && (
        <Events filterLocalEvents={filterLocalEvents} events={selectedEvents} selectedDate={selectedDate} calendarHeight={calendarHeight} />
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
    color: GlobalHeaderColor,
  },
});

export default CalendarComponent;