import backendURL from "../BeUrl";

interface IUser {
    username: string;
}

export async function createUserApi(props : IUser) {
    try {
        const response = await fetch(backendURL + "/user/insert", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props),
        });

        if (!response.ok) {
            throw new Error('Failed to register the user');
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