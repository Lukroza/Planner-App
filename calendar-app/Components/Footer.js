import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../Screens/HomeScreen";
import CreateEventScreen from "../Screens/CreateEventScreen";
import GroupScreen from "../Screens/GroupScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import RegistrationScreen from "../Screens/RegistrationScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GlobalAccentColor, GlobalColor, GlobalSecondaryColor, GlobalTextColor  } from '../Styles';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === 'CreateEvent') {
        iconName = focused ? 'plus-thick' : 'plus-outline';
      } else if (route.name === 'Group') {
        iconName = focused ? 'account-group' : 'account-group-outline';
      }

      return <MaterialCommunityIcons name={iconName} size={focused ? 40 : 24} color={GlobalAccentColor} />;
    },
    tabBarStyle: {
    height: 75,
    backgroundColor: GlobalSecondaryColor,
    },
      })}
>
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false, title:""}}/>
      <Tab.Screen name="CreateEvent" component={CreateEventScreen} options={{headerShown: false, title:""}}/>
      <Tab.Screen name="Group" component={GroupScreen} options={{headerShown: false, title:""}}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarButton: () => null, headerShown: false, title:""}} />
    </Tab.Navigator>
  );
}

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen 
        name="Main" 
        component={MainTabNavigator} 
        />
        <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        tabBarVisible={true}
        />
        <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;