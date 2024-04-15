import axios from 'axios';
import backendURL from "../BeUrl";

interface IEvent {
    groupId: string;
    date: string;
}

export async function eventMonthCount(props: IEvent) {
    try {
        const response = await axios.get(backendURL + "/event/countEventsByGroup/" + props.groupId + "/" + props.date);

        return response.data;
    } catch (error) {
        console.error("Error fetching group event count:", error);
        throw new Error('Error fetching group event count');
    }
}
