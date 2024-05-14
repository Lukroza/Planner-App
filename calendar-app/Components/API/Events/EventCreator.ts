import backendURL from "../BeUrl";
import Toast from "react-native-toast-message";

interface IEvent {
    name: string;
    userId: string;
    date: Date;
    from: string;
    to: string;
    description: string;
    attendees?: string;
    isPublic?: boolean;
}

export async function createEventApi(props: IEvent) {
    try {
        const response = await fetch(backendURL + "/event/insert", {
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
                text1: 'Event Created',
                text2: text
              });
        } else if (response.status === 400) {
            Toast.show({
                type: 'error',
                text1: 'Failed to create event',
                text2: text
              });
        } else {
            throw new Error('Failed to create event');
        }
    } catch (error) {
        console.error(error);
        return error.message;
    }
}