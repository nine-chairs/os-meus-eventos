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

// Function to create a new event


/**
 * Create a new event
 * 
 * @param title - The title of the event
 * @param description - The description of the event
 * @param startsAt - Start date and time in ISO 8601 format
 * @param capacity - Capacity of the event
 * @param token - Access token for authorization
 * @returns The created event data
 */
export const createEvent = async (
  title: string,
  description: string,
  startsAt: string,
  capacity: number,
  token: string
): Promise<any> => {
  try {
    // Validate API Key and Token
    if (!apiKey) throw new Error("API key is missing or undefined.");
    if (!token) throw new Error("Access token is missing or undefined.");

    // Construct headers
    const headers = {
      apikey: apiKey,
      authorization: `Bearer ${token}`,
    };

    // Construct payload
    const payload = { title, description, startsAt, capacity };

    // Log the full request details for debugging
    console.log("API Request Details:");
    console.log("URL:", `${apiBaseUrl}/events`);
    console.log("Headers:", headers);
    console.log("Payload:", payload);

    // Make the POST request
    const response = await axios.post(`${apiBaseUrl}/events`, payload, {
      headers: headers,
    });

    // Log the response data
    console.log("API Response Data:", response.data);

    return response.data;
  } catch (error) {
    // Log detailed error for debugging
    if (axios.isAxiosError(error)) {
      console.error("Error response status:", error.response?.status);
      console.error("Error response headers:", error.response?.headers);
      console.error("Error response data:", error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }

    // Rethrow the error so it can be handled by the calling function
    throw error;
  }
};
