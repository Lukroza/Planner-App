import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet, TextInput, Text, Button, TouchableWithoutFeedback, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Footer from './Footer';
import Header from './Header';
import Calendar from './Calendar';

function CreateEvent() {
    const [name, setName] = React.useState('');
    const [fromTime, setFromTime] = React.useState(new Date());
    const [toTime, setToTime] = React.useState(new Date());
    const [isFromPickerVisible, setFromPickerVisibility] = React.useState(false);
    const [isToPickerVisible, setToPickerVisibility] = React.useState(false);
    const [description, setDescription] = React.useState('');

    const showFromPicker = () => {
        setFromPickerVisibility(true);
    };

    const hideFromPicker = () => {
        setFromPickerVisibility(false);
    };

    const handleFromConfirm = (date) => {
        setFromTime(date);
        hideFromPicker();
    };

    const showToPicker = () => {
        setToPickerVisibility(true);
    };

    const hideToPicker = () => {
        setToPickerVisibility(false);
    };

    const handleToConfirm = (date) => {
        setToTime(date);
        hideToPicker();
    };

    const handleCancel = () => {
        
    };

    const handleCreate = () => {
        
    };

    return (
        <SafeAreaProvider style={styles.safeArea}>
            <Header title="Create Event"/>
            <View style={styles.mainContent}>
                <ScrollView style={styles.scrollView}>
                <View style={styles.eventInputContainer}>
                    <Text style={styles.label}>Event Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <Calendar />
                <View style={styles.timeContainer}>
                    <Text style={styles.fromToLabel}>From</Text>
                    <Button title="Select Time" onPress={showFromPicker} />
                    <DateTimePickerModal
                        isVisible={isFromPickerVisible}
                        mode="time"
                        onConfirm={handleFromConfirm}
                        onCancel={hideFromPicker}
                    />
                    <Text style={styles.fromToLabel}>To</Text>
                    <Button title="Select Time" onPress={showToPicker} />
                    <DateTimePickerModal
                        isVisible={isToPickerVisible}
                        mode="time"
                        onConfirm={handleToConfirm}
                        onCancel={hideToPicker}
                    />
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.descriptionInput}
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={4}
                        placeholder="Write about the event place"
                        placeholderTextColor="#9CA3AF"
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Create" onPress={handleCreate} color="#3DDC84" />
                    <Button title="Cancel" onPress={handleCancel} color="#767577" />
                </View>
                </ScrollView>
                <View style={styles.footerContainer}>
                    <Footer />
                </View>
            </View>
            
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    eventInputContainer: {
        flex: 0.7,
        backgroundColor: '#2F3855',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderColor: '#007AFF',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        color: 'white',
        placeholderTextColor: '#9CA3AF',
        width: '80%',
        height: 45,
        fontFamily: 'System',
        fontSize: 18,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    label: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 5,
        marginBottom: 0,
        alignSelf: 'flex-start', 
        marginLeft: 40,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20,
    },
    fromToLabel: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    },
    descriptionContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#2F3855',
    },
    descriptionInput: {
        borderColor: '#007AFF',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        color: 'white',
        width: '90%', 
        fontFamily: 'System',
        fontSize: 18,
        textAlignVertical: 'top', 
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#2F3855',
    },
    safeArea: {
        flex: 1, // Use flex to expand the container to the full height of the screen
        backgroundColor: '#2F3855', // Assuming the safe area should be black as your theme
    },
    mainContent: {
        flex: 1, // Main content area taking up the full height minus the footer
    },
    scrollViewContent: {
        // No flex needed here, ScrollView will automatically take up the available space
    },
});

export default CreateEvent;
