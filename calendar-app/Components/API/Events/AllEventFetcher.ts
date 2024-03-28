import axios from 'axios';
import backendURL from "../BeUrl";

interface IUser {
    userId: string;
}

export async function getAllEvents(props: IUser) {
    try {
        const response = await axios.get(backendURL + "/event/getEvents/" + props.userId);

        return response.data;
    } catch (error) {
        console.error(error);
    }
}