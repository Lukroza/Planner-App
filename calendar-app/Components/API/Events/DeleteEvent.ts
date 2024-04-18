import axios from 'axios';
import backendURL from "../BeUrl";

interface IEvent {
    userId: string;
    eventId: string;
}

export async function deleteEvent(props: IEvent) {
    const body = {
        data: {
            user_id: props.userId,
        }
    };
    try {
        const response = await axios.delete(backendURL + "/event/delete/" + props.eventId, body);

        return response.data;
    } catch (error) {
        throw error;
    }
}