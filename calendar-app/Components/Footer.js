import { CurrentRenderContext } from '@react-navigation/native';
import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { BottomNavigation, Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeRoute = () => <Text></Text>;

const PlusRoute = () => <Text></Text>;

const GroupRoute = () => <Text></Text>;

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', focusedIcon: 'home', unfocusedIcon: 'home-outline', color: '#F4F5FC'},
    { key: 'plus', focusedIcon: 'plus-thick', unfocusedIcon: 'plus-outline', color: '#F4F5FC' },
    { key: 'group', focusedIcon: 'account-group', unfocusedIcon: 'account-group-outline', color: '#F4F5FC'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    plus: PlusRoute,
    group: GroupRoute,
  });


  const renderIcon = ({ route, focused }) => {
    const { focusedIcon, unfocusedIcon } = routes.find(r => r.key === route.key);
    const iconName = focused ? focusedIcon : unfocusedIcon;
    const color = focused ? '#24293E' : '#F4F5FC'; // Change colors as needed for focused/unfocused states
    return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
  };

  return (
    <BottomNavigation
      barStyle={{height: 60, backgroundColor: '#24293D'}}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      renderIcon={renderIcon}
    />
  );
};

export default MyComponent;