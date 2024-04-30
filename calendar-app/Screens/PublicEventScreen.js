import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../Components/Header";
import Calendar from "../Components/Calendar";
import { eventMonthCount } from "../Components/API/Events/EventMonthCount";
import { getGroupId } from "../Components/Storage/userDataStorage";
import { GlobalColor } from "../Styles";

const PublicEventScreen = () => {
  return (
    <View style={styles.view}>
      <Header title={"Public Events"} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: GlobalColor,
  },
});

export default PublicEventScreen;
