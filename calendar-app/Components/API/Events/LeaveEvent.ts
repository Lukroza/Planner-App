import axios from 'axios';
import backendURL from "../BeUrl";

interface IEvent {
    userId: string;
    eventId: string;
}

export async function leaveEvent(props: IEvent) {
    const body = {
        event_id: props.eventId,
        user_id: props.userId,
    };
    try {
        const response = await axios.delete(backendURL + "/event/leave", { data: body });

        return response.data;
    } catch (error) {
        console.error(error);
    }
}