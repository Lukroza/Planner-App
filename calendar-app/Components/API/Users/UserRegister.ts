import backendURL from "../BeUrl";
import Toast from "react-native-toast-message";

interface IUser {
    username: string;
}

export async function createUserApi(props: IUser) {
    try {
        const response = await fetch(backendURL + "/user/insert", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props),
        });

        const text = await response.text();

        if (response.status === 201) {
            Toast.show({
                type: 'success',
                text1: 'User Registered',
                text2: text
              });
              return text;
        } else if (response.status === 400) {
            Toast.show({
                type: 'error',
                text1: 'Failed to register the user',
                text2: text
              });
              return text;
        } else if (response.status === 409) {
            Toast.show({
                type: 'error',
                text1: 'User Already Exists',
                text2: text
              });
            return text;
        } else {
            throw new Error('Failed to register the user');
        }
    } catch (error) {
        console.error(error);
        return error.message;
    }
}