import axios from 'axios';
import backendURL from '../BeUrl';

interface IChangeOwner {
    groupId: string;
    newOwnerId: string;
}

export async function changeOwnership(props: IChangeOwner) {
    try {
        const response = await axios.put(`${backendURL}/group/changeOwner/${props.groupId}/${props.newOwnerId}`);
    } catch (error) {
        console.error('Error changing group ownership:', error);
        throw error;
    }
}
