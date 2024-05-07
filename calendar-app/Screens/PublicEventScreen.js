import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../Components/Header";
import Calendar from "../Components/Calendar";
import { eventMonthCount } from "../Components/API/Events/EventMonthCount";
import { getGroupId } from "../Components/Storage/userDataStorage";
import { GlobalColor } from "../Styles";
import { useEffect, useState } from "react";
import { getAllPublicEvents } from "../Components/API/Events/PublicEventDetails";
import Events from "../Components/Events";
import { Text } from "react-native";
import { GlobalFont } from "../Styles";
import { useFocusEffect } from "@react-navigation/native";

const PublicEventScreen = () => {
  const [publicEvents, setPublicEvents] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchPublicEvents = async () => {
        const publicEvents = await getAllPublicEvents();
        setPublicEvents(publicEvents);
      };

      fetchPublicEvents();

      return () => {};
    }, [])
  );

  return (
    <View style={styles.view}>
      <Header title={"Public Events"} />
      <Text style={styles.Text}>Happening locally: </Text>
      <Events events={publicEvents} showAttendees={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: GlobalColor,
  },

  Text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: GlobalFont,
    textAlign: "center",
    marginVertical: 30,
  },
});

export default PublicEventScreen;
