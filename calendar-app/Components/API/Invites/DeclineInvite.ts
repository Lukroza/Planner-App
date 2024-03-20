import backendURL from "../BeUrl";

interface IUser {
    invite_id: string;
}

export async function declineInvite(props : IUser) {
    try {
        const response = await fetch(backendURL + "/invite/decline/" + props.invite_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete the invite');
        }
    } catch (error) {
        console.error(error);
    }
}