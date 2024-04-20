import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import EventDescription from './EventDescription';
import { GlobalColor, GlobalSecondaryColor,GlobalFont, GlobalTextColor, GlobalHeaderColor } from '../Styles';

const Events = ({ events, selectedDate, calendarHeight, filterLocalEvents }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const styles = createStyles(calendarHeight);

  const handleEventPress = (item) => {
    setSelectedEvent(item);
    setIsModalVisible(true);
  };

  const deleteLocalEvent = () => {
    filterLocalEvents(selectedEvent.id);
  };

  const renderEvent = ({ item }) => (
    <TouchableOpacity onPress={() => handleEventPress(item)} style={styles.event}>
      <Text style={styles.eventText}>{item.name} at {item.from}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderEvent}
        keyExtractor={(item, index) => item.id || index.toString()}
        ListEmptyComponent={<Text style={styles.noEventsText}>No events</Text>}
      />
      {isModalVisible && (
        <EventDescription 
          deleteLocalEvent={deleteLocalEvent}
          isVisible={isModalVisible} 
          event={selectedEvent} 
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </View>
  );
};

const createStyles = (calendarHeight) => StyleSheet.create({
  container: {
    flex: 1,
  },
  eventsContainer: {
    maxHeight: Dimensions.get('window').height - calendarHeight - 5,
    backgroundColor: GlobalColor,
    padding: 10,
  },
  event: {
    backgroundColor: GlobalSecondaryColor,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  eventText: {
    color: GlobalTextColor,
    fontFamily: GlobalFont,
  },
  noEventsText: {
    fontFamily: GlobalFont,
    textAlign: 'center',
    color: GlobalHeaderColor,
    marginTop: 20,
  },
});

export default Events;
