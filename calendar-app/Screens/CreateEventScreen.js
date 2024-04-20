import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Keyboard, View, StyleSheet, TextInput, Text, Button, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import Header from '../Components/Header';
import Calendar from '../Components/Calendar';
import {createEventApi} from '../Components/API/Events/EventCreator';
import { GlobalBorderColor, GlobalColor, GlobalFont, GlobalHeaderColor } from '../Styles';
import { getUserId } from '../Components/Storage/userDataStorage';
import TextInputBar from '../Components/TextInputBar';

function CreateEvent() {
    const [name, setName] = React.useState('');
    const [fromTime, setFromTime] = React.useState(new Date());
    const [toTime, setToTime] = React.useState(new Date());
    const [isFromPickerVisible, setFromPickerVisibility] = React.useState(false);
    const [isToPickerVisible, setToPickerVisibility] = React.useState(false);
    const [description, setDescription] = React.useState('');
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const showFromPicker = () => {
        setFromPickerVisibility(true);
    };

    const hideFromPicker = () => {
        setFromPickerVisibility(false);
    };

    const showToPicker = () => {
        setToPickerVisibility(true);
    };

    const hideToPicker = () => {
        setToPickerVisibility(false);
    };

    const handleFromConfirm = (date) => {
        setFromTime(date);
        hideFromPicker();
    };
    
    const handleToConfirm = (date) => {
        setToTime(date);
        hideToPicker();
    };
    
    const formatTime = (date) => {
        let hours = date.getUTCHours() + 2;
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();
        if (hours >= 24) {
            hours -= 24;
        }
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    
    const fromTimeString = formatTime(fromTime);
    const toTimeString = formatTime(toTime);

    const handleCancel = () => {
        setName('');
        setFromTime(new Date());
        setToTime(new Date());
        setFromPickerVisibility(false);
        setToPickerVisibility(false);
        setDescription('');
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    }

    const handleCreate = async () => {
        const userId = await getUserId();

        const eventData = {
            name: name,
            userId: userId,
            date: selectedDate,
            from: fromTimeString,
            to: toTimeString,
            description: description,
        };
        createEventApi(eventData);
    };

    return (
        <SafeAreaProvider style={styles.safeArea}>
            
            <Header title="Create Event"/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.eventInputContainer}>
                    <Text style={styles.label}>Event Name</Text>
                    <TextInputBar label="Write your event name" onChangeText={setName}/>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.label}>Description</Text>
                    <TextInputBar label="Write about the event" onChangeText={setDescription} multiline={true}/>
                </View>
                <Calendar showEvents={false} onDayPress={day => handleDateChange(day)}/>
                <View style={styles.timeContainer}>
                    <Text style={styles.fromToLabel}>From</Text>
                    <Button title={fromTimeString} onPress={showFromPicker} />
                    <DateTimePickerModal
                        
                        isVisible={isFromPickerVisible}
                        mode="time"
                        onConfirm={handleFromConfirm}
                        onCancel={hideFromPicker}
                        date = {fromTime}                      
                    />
                    <Text style={styles.fromToLabel}>To</Text>
                    <Button title={toTimeString} onPress={showToPicker} />
                    <DateTimePickerModal
                        isVisible={isToPickerVisible}   
                        mode="time"
                        onConfirm={handleToConfirm}
                        onCancel={hideToPicker}
                        date = {toTime}    
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button style = {styles.button} title="Cancel" onPress={handleCancel} color="#767577" />
                    <Button style = {styles.button} title="Create" onPress={handleCreate} color="#3DDC84" />
                </View>
            </ScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: GlobalColor,
    },
    scrollView: {
        flex: 1,
    },
    eventInputContainer: {
        backgroundColor: GlobalColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20,
    },
    label: {
        fontFamily: GlobalFont, 
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: '5%',
        marginBottom: 10,
    },
    fromToLabel: {
        fontFamily: GlobalFont, 
        color: GlobalHeaderColor,
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    },
    descriptionContainer: {
        fontFamily: GlobalFont,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 10,
    },
    footerContainer: {
        padding: 10,
        
    },
    button: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    footerContainer: {
        height: 60,
        backgroundColor: 'transparent',
    },

});

export default CreateEvent;
