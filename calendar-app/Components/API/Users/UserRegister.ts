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
        if (response.status !== 201) {
            throw new Error(text);
        }
        return text;

    } catch (error) {
        throw new Error(error.message);
    }
}