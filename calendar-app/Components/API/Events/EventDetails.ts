import axios from 'axios';
import backendURL from "../BeUrl";

interface IEvent {
    eventId: string;
}

export async function getEventDetails(props: IEvent) {
    try {
        const response = await axios.get(backendURL + "/event/getEventDetails/" + props.eventId);

        return response.data;
    } catch (error) {
        console.error(error);
    }
}