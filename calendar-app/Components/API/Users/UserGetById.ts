import backendURL from "../BeUrl";

interface IUser {
    user_id: string;
}

export async function getUserById(props : IUser) {
    try {
        const response = await fetch(backendURL + "/user/get/id/" + props.user_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to find the user');
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