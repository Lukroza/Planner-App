import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import EventDescription from "./EventDescription";
import {
  GlobalColor,
  GlobalSecondaryColor,
  GlobalFont,
  GlobalTextColor,
  GlobalHeaderColor,
} from "../Styles";

const Events = ({
  events,
  calendarHeight,
  filterLocalEvents,
  showAttendees,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [ownerUsername, setOwnerUsername] = useState(null);

  const styles = createStyles(calendarHeight);

  const handleEventPress = (item) => {
    setSelectedEvent(item);
    setIsModalVisible(true);
  };

  const deleteLocalEvent = () => {
    console.log("Deleting event");
    filterLocalEvents(selectedEvent.id);
  };

  const renderEvent = ({ item }) => {
    const date = new Date(item.date);
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    return (
      <TouchableOpacity
        onPress={() => handleEventPress(item)}
        style={styles.event}
      >
        <View style={styles.eventText}>
          <Text style={styles.eventNameText}>{item.name}</Text>
          <Text style={styles.eventTimeText}>{item.from}</Text>
        </View>
        <View>
          <Text style={styles.eventDate}>{formattedDate}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.totalEvents}>Total events: {events.length}</Text>
      <FlatList
        data={events}
        renderItem={renderEvent}
        keyExtractor={(item, index) => item.id || index.toString()}
        ListEmptyComponent={<Text style={styles.noEventsText}>No events</Text>}
      />
      {isModalVisible && (
        <EventDescription
          showAttendees={showAttendees}
          deleteLocalEvent={deleteLocalEvent}
          isVisible={isModalVisible}
          event={selectedEvent}
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </View>
  );
};

const createStyles = (calendarHeight) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: "90%",
      alignSelf: "center",
    },
    eventsContainer: {
      maxHeight: Dimensions.get("window").height - calendarHeight - 5,
      backgroundColor: GlobalColor,
      padding: 10,
    },
    event: {
      backgroundColor: GlobalSecondaryColor,
      padding: 15,
      margin: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#ddd",
      justifyContent: "center",
      height: 70,
    },
    eventText: {
      color: GlobalTextColor,
      fontFamily: GlobalFont,
    },
    noEventsText: {
      fontFamily: GlobalFont,
      textAlign: "center",
      color: GlobalHeaderColor,
      marginTop: 20,
    },
    eventNameText: {
      color: GlobalHeaderColor,
      fontFamily: GlobalFont,
      fontWeight: "bold",
      fontSize: 20,
    },
    eventTimeText: {
      color: "white",
      fontFamily: GlobalFont,
      fontSize: 16,
    },
    eventText: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
    },
    eventDate: {
      color: "white",
      fontFamily: GlobalFont,
      fontSize: 16,
      marginTop: 5,
    },
    totalEvents: {
      fontFamily: GlobalFont,
      color: GlobalHeaderColor,
      fontSize: 16,
      marginBottom: 5,
      textAlign: "center",
      fontWeight: "bold",
    },
  });

export default Events;
