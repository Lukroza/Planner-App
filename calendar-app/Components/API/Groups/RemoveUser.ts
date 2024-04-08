import backendURL from "../BeUrl";

interface IGroup {
    userId: string;
}

export async function deleteUser(props: IGroup): Promise<void> {
    try {
        const response = await fetch(backendURL + "/group/removeUser/" + props.userId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete user with status ${response.status}`);
        }

        console.log('User deleted successfully');
    } 
    catch (error) {
        console.error('An error occurred while deleting the user:', error);
    }
}
