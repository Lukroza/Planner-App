import backendURL from "../BeUrl";

export const getUserIdByUsername = async (username) => {
  try {
    const response = await fetch(`${backendURL}/user/get/id/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const userId = await response.json();
    return userId;
  } catch (error) {
    console.error('Failed to fetch user ID:', error);
  }
}
