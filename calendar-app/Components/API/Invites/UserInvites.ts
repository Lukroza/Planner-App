import backendURL from "../BeUrl";

interface IUser {
    userId: string;
}

export async function getUserInvites(props : IUser) {
    try {
        const response = await fetch(backendURL + "/invite/get/" + props.userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to find the invites for the user');
        }

        const text = await response.text();
        if (!text) {
            return null;
        }

        const data = JSON.parse(text);
        return data;
    } catch (error) {
        console.error(error);
    }
}