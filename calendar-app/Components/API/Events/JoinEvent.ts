import axios from 'axios';
import backendURL from "../BeUrl";

interface IEvent {
    userId: string;
    eventId: string;
}

export async function joinEvent(props: IEvent) {
    const body = {
        event_id: props.eventId,
        user_id: props.userId,
    };
    try {
        const response = await axios.post(backendURL + "/event/join", body);

        return response.data;
    } catch (error) {
        console.error(error);
    }
}