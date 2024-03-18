import backendURL from "../BeUrl";

interface IUser {
    invite_id: string;
}

export async function acceptInvite(props : IUser) {
    try {
        const response = await fetch(backendURL + "/invite/accept/" + props.invite_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to accept the invite');
        }
    } catch (error) {
        console.error(error);
    }
}