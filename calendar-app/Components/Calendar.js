import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Events from "./Events";
import { getUserId } from "./Storage/userDataStorage";
import { getAllEvents } from "./API/Events/AllEventFetcher";
import {
  GlobalBackgroundTextColor,
  GlobalColor,
  GlobalHeaderColor,
  GlobalSecondaryColor,
  GlobalTextColor,
} from "../Styles";
import { useFocusEffect } from '@react-navigation/native';

const CalendarComponent = ({ showEvents, onDayPress }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [calendarHeight, setCalendarHeight] = useState(350);
  const [events, setEvents] = useState({});
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    getUserId().then(setUserId);
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (userId) {
        fetchEventHeaders();
      }
    }, [userId])
  );

  const fetchEventHeaders = async () => {
    if (!userId) {
      return;
    }
    const fetchedEvents = await getAllEvents({ userId });
    setEvents(fetchedEvents);
  };

  const filterLocalEvents = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  useEffect(() => {
    if (events) {
      const filteredEvents = Object.values(events).filter(
        (event) =>
          new Date(event.date).toLocaleDateString() ===
          new Date(selectedDate).toLocaleDateString()
      );
      setSelectedEvents(filteredEvents);
    }
  }, [selectedDate, events]);

  const computeMarkedDates = () => {
    const dates = Object.values(events).reduce((acc, curr) => {
      const date = new Date(curr.date);
      date.setDate(date.getDate() + 1);
      const dateKey = date.toISOString().split("T")[0];
      if (!acc[dateKey]) {
        acc[dateKey] = { ...curr, marked: true, dotColor: "green", count: 1 };
      } else {
        let count = acc[dateKey].count + 1;
        let dotColor;
        if (count <= 2) {
          dotColor = "green";
        } else if (count <= 4) {
          dotColor = "yellow";
        } else {
          dotColor = "red";
        }
        acc[dateKey] = {
          ...acc[dateKey],
          ...curr,
          marked: true,
          dotColor,
          count,
        };
      }
      return acc;
    }, {});

    if (selectedDate) {
      dates[selectedDate] = {
        ...dates[selectedDate],
        selected: true,
        disableTouchEvent: true,
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
            textMonthFontWeight: "bold",
          }}
        />
      </View>
      <View style={styles.line} />
      {showEvents && selectedDate && (
        <Events
          filterLocalEvents={filterLocalEvents}
          events={selectedEvents}
          selectedDate={selectedDate}
          calendarHeight={calendarHeight}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eventCountContainer: {},
  eventCountText: {
    color: GlobalHeaderColor,
  },
  line: {
    flex: 0,
    height: 2,
    backgroundColor: "#F4F4FC",
    marginHorizontal: 30,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default CalendarComponent;
