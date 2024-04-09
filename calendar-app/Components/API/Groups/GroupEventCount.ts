import axios from 'axios';
import backendURL from "../BeUrl";

interface IGroupEventCountRequest {
  groupId: string;
  date: string;
}

export async function getGroupEventCount({ groupId, date }: IGroupEventCountRequest) {
  try {
    const response = await axios.get(`${backendURL}/event/countEventsByGroup/${groupId}`, {
      params: { date }
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response ? error.response.data : new Error('Error fetching event count');
  }
}
