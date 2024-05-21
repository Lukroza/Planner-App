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
  GlobalAccentColor,
} from "../Styles";
import ButtonComp from "./ButtonComp";
import { IconButton, MD3Colors } from "react-native-paper";
import { useMemo } from "react";
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
  const [sortOrder, setSortOrder] = useState("asc");

  const styles = createStyles(calendarHeight);

  const handleEventPress = (item) => {
    setSelectedEvent(item);
    setIsModalVisible(true);
  };

  const deleteLocalEvent = () => {
    filterLocalEvents(selectedEvent.id);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      const timeA = a.from ? a.from.split(":") : ["00", "00"];
      const timeB = b.from ? b.from.split(":") : ["00", "00"];

      const minutesA = parseInt(timeA[0], 10) * 60 + parseInt(timeA[1], 10);
      const minutesB = parseInt(timeB[0], 10) * 60 + parseInt(timeB[1], 10);

      if (dateA < dateB) {
        return sortOrder === "asc" ? -1 : 1;
      } else if (dateA > dateB) {
        return sortOrder === "asc" ? 1 : -1;
      } else {
        if (minutesA < minutesB) {
          return sortOrder === "asc" ? -1 : 1;
        } else if (minutesA > minutesB) {
          return sortOrder === "asc" ? 1 : -1;
        } else {
          return 0;
        }
      }
    });
  }, [events, sortOrder]);

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
        <View style={styles.eventText}>
          <Text style={styles.eventDate}>{formattedDate}</Text>
          <Text style={styles.eventDate}>Attendees: {item.attendeeCount}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.sortContainer}>
        <Text style={styles.totalEvents}>Total events: {events.length}</Text>
        <TouchableOpacity style={styles.sortButton} onPress={toggleSortOrder}>
          <Text style={styles.sortLabel}> Sort events: </Text>
          <IconButton
            icon={sortOrder === "asc" ? "sort-descending" : "sort-ascending"}
            iconColor={"#FFFFFF"}
            size={24}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={sortedEvents}
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
    sortContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 5,
    },
    sortButton: {
      color: GlobalHeaderColor,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: GlobalAccentColor,
      borderRadius: 10,
      height: 35,
    },
    sortLabel: {
      color: "#FFFFFF",
      fontFamily: GlobalFont,
      fontSize: 16,
      marginLeft: 5,
    },
  });

export default Events;
