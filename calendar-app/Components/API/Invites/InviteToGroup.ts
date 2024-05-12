import backendURL from "../BeUrl";

interface InviteParams {
  user_id: string;
  group_id: string;
}

export async function inviteToGroup({ user_id, group_id }: InviteParams) {
  try {
    const response = await fetch(`${backendURL}/invite/insert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id, group_id }),
    });

    if (response.status === 409) {
      return null;
    }
    if (!response.ok) {
      throw new Error('Failed to invite the user');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error sending invitation');
  }
}
