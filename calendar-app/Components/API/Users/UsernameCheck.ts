import backendURL from "../BeUrl";

interface IUser {
    username: string;
}

export async function loginUserAPI(props : IUser) {
    try {
        const response = await fetch(backendURL + "/user/get/" + props.username, {
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