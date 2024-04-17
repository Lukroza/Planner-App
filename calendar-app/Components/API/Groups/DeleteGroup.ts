import axios from 'axios';
import backendURL from "../BeUrl";

interface IGroup {
    group_id: string;
}

export async function deleteGroup(props: IGroup): Promise<void> {
    try {
        const response = await axios.delete(`${backendURL}/group/delete/${props.group_id}`);
        
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
