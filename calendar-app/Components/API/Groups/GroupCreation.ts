import backendURL from "../BeUrl";

interface IGroup {
    name: string;
    owner_id: string;
}

export async function createGroup(props : IGroup) {
    try {
        const response = await fetch(backendURL + "/group/insert", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props),
        });

        if (!response.ok) {
            throw new Error('Failed to create the group');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}