import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../Components/Header';
import Calendar from '../Components/Calendar';
import { getGroupEventCount } from '../Components/API/Groups/GroupEventCount';
import { getGroupId } from '../Components/Storage/userDataStorage';

const HomeScreen = () => {
  const [eventCount, setEventCount] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  const fetchEventCount = useCallback(async (date) => {
    try {
      const groupId = await getGroupId();
      if (groupId) {
        const count = await getGroupEventCount({ groupId, date });
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
}

  return (
    <View style={styles.view}>
      <Header title={"Home"} />
      <Calendar showEvents={true} onDayPress={day => handleDateChange(day)}/>
      {eventCount !== null && (
        <View style={styles.eventCountContainer}>
          <Text style={styles.eventCountText}>Event {eventCount}</Text>
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