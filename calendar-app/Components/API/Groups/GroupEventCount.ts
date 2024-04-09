import backendURL from "../BeUrl";

interface IGroupEventCountRequest {
  groupId: string;
  date: string;
}

export async function getGroupEventCount({ groupId, date }: IGroupEventCountRequest) {
  try {
    const response = await fetch(`${backendURL}/event/countEventsByGroup/${groupId}?date=${date}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch the event count');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
