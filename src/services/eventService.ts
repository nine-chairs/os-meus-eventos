import axios from 'axios';
import { API_KEY } from '@env';
import { API_BASE_URL } from '@env';

const apiKey = API_KEY
const apiBaseUrl = API_BASE_URL;

// Function to fetch all events
export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/events`, {
      headers: {
        'ApiKey': apiKey,  
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error fetching events:", error.response.data);
    } else {
      console.error("Network or unexpected error:", error);
    }
    throw error;
  }
};
