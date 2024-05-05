import axios from 'axios';
import backendURL from "../BeUrl";

export async function getAllPublicEvents() {
    try {
        const response = await axios.get(backendURL + "/event/public/get/all");

        return response.data;
    } catch (error) {
        console.error("Error fetching group event count:", error);
        throw new Error('Error fetching group event count');
    }
}
