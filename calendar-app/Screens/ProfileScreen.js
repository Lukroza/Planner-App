import { GlobalColor, GlobalTextColor } from '../Styles';
import { storeUserInfo, getUserId, getGroupId } from '../Components/Storage/userDataStorage';
import ButtonComp from '../Components/ButtonComp';
import Header from '../Components/Header';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'; 
import { getGroupName } from '../Components/API/Groups/GroupName';
import { getInGroupStatus } from '../Components/Storage/userDataStorage';
import { getUserById } from '../Components/API/Users/UserGetById';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const [groupNameData, setGroupName] = useState('');
    const [inGroup, setInGroup] = useState(null);
    const [username, setUsername] = useState('');

    async function getGroupStatus() {
        const inGroup = await getInGroupStatus();
        return inGroup;
    };
    const fetchGroupName = async () => {
        const groupId = await getGroupId();
        const groupNameData = await getGroupName({ groupId });
        setGroupName(groupNameData);
    };

    async function fetchUsername() {
        const userId = await getUserId();
        const user = await getUserById({ userId });
        if (user) {
            setUsername(user.username);
        }
    };

    useEffect(() => {
        fetchUsername();
        fetchGroupName();
        getGroupStatus().then(setInGroup);
    }, []);

    const navigation = useNavigation();

    const handleLogOut = () => {
        storeUserInfo("0", false, false, "0");
        Toast.show({
            type: 'success',
            text1: 'Logged out',
            text2: 'You have been logged out',
        });
        navigation.navigate('Registration');
    };

    return (
        <View style={styles.wrapper}>
            <Header title={"Profile"} />
            <View style={styles.container}>
                <Text style={styles.topLine}>About You</Text>
                <View style={styles.segment}>
                    <Text style={styles.value}>Username:</Text>
                    <Text style={styles.value}>{username}</Text>
                </View>
                <View style={styles.segment}>
                    <Text style={styles.value}>Group:</Text>   
                    {
                        inGroup ? 
                        <Text style={styles.value}>{groupNameData.name}</Text> 
                        : <Text style={styles.value}>Not in a group</Text>
                    }    
                </View>
                <View style={styles.segment}>
                    <Text style={styles.value}>Email:</Text>
                    <Text style={styles.value}></Text>
                </View>
                <View style={styles.buttonContainer}>
                <ButtonComp text="Log Out" onPress={handleLogOut}/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: GlobalColor,
        flex: 1,
    },
    topLine: {
        color: '#79AD79',
        fontSize: 20,
        fontWeight: '600',
    },
    container: {
        margin: 20,
        gap: 5,

    },
    segment: {
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    value: {
        color: GlobalTextColor,
        fontSize: 16,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProfileScreen;