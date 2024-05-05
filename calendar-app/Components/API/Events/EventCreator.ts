import backendURL from "../BeUrl";

interface IEvent {
    name: string;
    userId: string;
    date: Date;
    from: string;
    to: string;
    description: string;
    attendees?: string;
    isPublic?: boolean;
}

export async function createEventApi(props: IEvent) {
    try {
        const response = await fetch(backendURL + "/event/insert", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props),
        });
        if (!response.ok) {
            throw new Error('Failed to create event');
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