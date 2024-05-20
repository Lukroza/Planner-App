import backendURL from "../BeUrl";

interface IUpdateUser {
    userId: string;
    newUsername: string;
}

export async function updateUsername(props: IUpdateUser) {
    try {
        const response = await fetch(backendURL + "/user/update/name/" + props.userId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: ( props.newUsername ),
        });

        const text = await response.text();
        if (response.status !== 200) {
            throw new Error(text);
        }
        return text;

    } catch (error) {
        throw new Error(error.message);
    }
}