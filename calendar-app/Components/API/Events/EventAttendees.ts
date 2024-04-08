import axios from 'axios';
import backendURL from "../BeUrl";

interface IEvent {
    eventId: string;
}

export const getAttendees = async (props: IEvent) => {
    try {
        const response = await axios.get(backendURL + "/event/getAttendees/" + props.eventId);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};