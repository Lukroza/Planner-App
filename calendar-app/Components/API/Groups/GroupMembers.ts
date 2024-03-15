import backendURL from "../BeUrl";

interface IGroup {
    groupId: string;
}

export async function getGroupMembers(props : IGroup) {
    try {
        const response = await fetch(backendURL + "/user/get/group/" + props.groupId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get group members');
        }

        const text = await response.text();
        if (!text) {
            return null;
        }

        const data = JSON.parse(text);
        return data;
    } 
    catch (error) {
        console.error(error);
    }
}