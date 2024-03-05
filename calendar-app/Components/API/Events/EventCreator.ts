import backendURL from "../BeUrl";

interface IEvent {
    name: string;
    date: Date;
    from: string;
    to: string;
    description: string;
    attendees?: string;
}

async function createEvent(props : IEvent) {
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

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}