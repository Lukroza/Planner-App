import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { GlobalColor, GlobalSecondaryColor, GlobalFont } from '../Styles';
import { storeUserInfo } from "./Storage/userDataStorage";
import NotificationChip from "./NotificationChip";

const Header = ({title}) => {

    const [fontsLoaded] = useFonts({
        Poppins_700Bold,
    });
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showNotification]);

    const handleProfilePress = () => {
        console.log('Profile icon pressed');
        storeUserInfo("0", false, false, "0");
        setShowNotification(true);
    };

    if (!fontsLoaded) {

    } else {
      return (
          <SafeAreaView edges={['right', 'top', 'left']} style={{ backgroundColor: GlobalColor }}>
              <View style={styles.headerContainer}>
                  <Text style={styles.headerTitle}>{title}</Text>
                  <TouchableOpacity onPress={handleProfilePress}>
                      <Avatar.Text size={40} label="VT" style={styles.avatar} />
                  </TouchableOpacity>
                  {showNotification && <NotificationChip message="Profile icon pressed" isSuccess={true}/>}
              </View>
              <View style={styles.line} />
          </SafeAreaView>
      );
  }

};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: GlobalColor,
        marginTop: 10,
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    headerTitle: {
        fontFamily: GlobalFont, 
        fontSize: 32,
        color: '#F4F4FC',
    },
    avatar: {
        backgroundColor: '#F4F4FC', 
    },
    line: {
        flex: 0,
        height: 2,
        backgroundColor: '#F4F4FC',
        marginHorizontal: 30,
    },
});

export default Header;