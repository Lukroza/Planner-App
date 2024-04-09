import axios from 'axios';
import backendURL from "../BeUrl";

interface IGroup {
    userId: string;
}

export async function deleteUser(props: IGroup) {
    try {
      const response = await axios.put(`${backendURL}/group/removeUser/${props.userId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } 
    catch (error) {
      if (error.response) {
        console.error(`Failed to delete user with status ${error.response.status}`);
      } else if (error.request) {
        console.error('No response received while attempting to delete user');
      } else {
        console.error('Error:', error.message);
      }
    }
  }