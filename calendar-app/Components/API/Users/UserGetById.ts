import backendURL from "../BeUrl";

interface IUser {
    userId: string;
}

export async function getUserById(props : IUser) {
    try {
        const response = await fetch(backendURL + "/user/get/id/" + props.userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to find the user');
        }

        const text = await response.text();
        console.log(text);
        if (!text) {
            return null;
        }

        const data = JSON.parse(text);
        return data;
    } catch (error) {
        console.error(error);
    }
}