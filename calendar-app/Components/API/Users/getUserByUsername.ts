import backendURL from "../BeUrl";

export async function getUserByUsername(username) {
  try {
    const encodedUsername = encodeURIComponent(username);
    const response = await fetch(`${backendURL}/user/get/${encodedUsername}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user by username: ${username}`);
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}
