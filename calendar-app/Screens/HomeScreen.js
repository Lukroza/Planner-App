import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../Components/Header';
import Calendar from '../Components/Calendar';
import { eventMonthCount } from '../Components/API/Events/EventMonthCount';
import { getGroupId } from '../Components/Storage/userDataStorage';

const HomeScreen = () => {
  const [eventCount, setEventCount] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

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
    fetchEventCount(selectedDate);
  }, [selectedDate, fetchEventCount]);


  return (
    <View style={styles.view}>
      <Header title={"Home"} />
      <Calendar showEvents={true} onDayPress={day => setSelectedDate(day)}/>
      {eventCount !== null && (
        <View style={styles.eventCountContainer}>
          <Text style={styles.eventCountText}>Events: {eventCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
      flex: 1,
      backgroundColor: '#2F3855',
  },
});

export default HomeScreen;