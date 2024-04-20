import { CurrentRenderContext } from '@react-navigation/native';
import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { BottomNavigation, Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GroupScreen from '../Screens/GroupScreen';
import HomeScreen from '../Screens/HomeScreen';
import CreateEventScreen from '../Screens/CreateEventScreen';
import { GlobalAccentColor, GlobalColor, GlobalSecondaryColor, GlobalTextColor,  } from '../Styles';
import Toast from 'react-native-toast-message';
import { toastConfig } from './NotificationConfig';
const HomeRoute = () => <HomeScreen/>;

const PlusRoute = () => <CreateEventScreen/>;

const GroupRoute = () => <GroupScreen />;

const Footer = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
    { key: 'plus', focusedIcon: 'plus-thick', unfocusedIcon: 'plus-outline'},
    { key: 'group', focusedIcon: 'account-group', unfocusedIcon: 'account-group-outline'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    plus: PlusRoute,
    group: GroupRoute,
  });

  const renderIcon = ({ route, focused }) => {
    const { focusedIcon, unfocusedIcon } = routes.find(r => r.key === route.key);
    const iconName = focused ? focusedIcon : unfocusedIcon;
    return <MaterialCommunityIcons name={iconName} size={24} color={GlobalTextColor} />;
  };

  return (
    <>
      <BottomNavigation
        barStyle={{height: 75, backgroundColor: GlobalSecondaryColor}}
        activeIndicatorStyle={{backgroundColor: GlobalAccentColor}}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderIcon={renderIcon}
      />
      <Toast config={toastConfig}/>
    </>
  );
};

export default Footer;