import backendURL from "../BeUrl";
import Toast from "react-native-toast-message";

interface IUser {
    username: string;
}

export async function loginUserAPI(props: IUser) {
    try {
        const response = await fetch(backendURL + "/user/get/" + props.username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const text = await response.text();

        if (response.status === 200) {
            const data = JSON.parse(text);
            return data;
        } else if (response.status === 404) {
            Toast.show({
                type: 'error',
                text1: 'Failed to login',
                text2: text
              });
        } else {
            throw new Error('Failed to find the user');
        }
    } catch (error) {
        console.error(error);
        return error.message;
    }
}