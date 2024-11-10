// src/services/authService.ts

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from '@env';
import { API_BASE_URL } from '@env';

const apiKey = API_KEY
const apiBaseUrl = API_BASE_URL

let accessToken = '';
let refreshToken = '';

// Function to save tokens and login status to async storage
const storeTokensAndLoginStatus = async (accessToken: string | null, refreshToken: string | null, isLoggedIn: boolean) => {
  try {
    if (accessToken) {
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
      console.log("isLoggedIn set to:", isLoggedIn);  // <--- Add this log
    } else {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
      console.log("isLoggedIn set to: false");  // <--- Add this log for logout case
    }

    if (refreshToken) {
      await AsyncStorage.setItem('refreshToken', refreshToken);
    } else {
      await AsyncStorage.removeItem('refreshToken');
    }
  } catch (error) {
    console.error("Error storing tokens and login status:", error);
  }
};



// Function to load tokens from async storage at app startup
const loadTokens = async () => {
  try {
    accessToken = await AsyncStorage.getItem('accessToken') || '';
    refreshToken = await AsyncStorage.getItem('refreshToken') || '';
  } catch (error) {
    console.error("Error loading tokens:", error);
  }
};

// Immediately invoke an async function to load tokens at app startup
(async () => {
  await loadTokens();
})();

// Function to register a new user
export const registerUser = async (email: string, firstName: string, lastName: string, password: string) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/auth/register`,
      {
        email,
        firstName,
        lastName,
        password,
      },
      {
        headers: {
          'ApiKey': apiKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error registering:", error.response.data);
    } else {
      console.error("Network or unexpected error:", error);
    }
    throw error;
  }
};

// Function to log in a user
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/auth/native`,
      { email, password },
      {
        headers: {
          'ApiKey': apiKey,
        },
      }
    );
    // Store the tokens after successful login
    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;

    // Save tokens and login status in async storage
    await storeTokensAndLoginStatus(accessToken, refreshToken, true);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error logging in:", error.response.data);
    } else {
      console.error("Network or unexpected error:", error);
    }
    throw error;
  }
};

// Function to refresh the access token
export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/auth/refresh-token`,
      { refreshToken },
      {
        headers: {
          'ApiKey': apiKey,
        },
      }
    );
    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;

    // Save updated tokens in async storage
    await storeTokensAndLoginStatus(accessToken, refreshToken, true);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.error("Refresh token expired or invalid. Logging out.");
      await storeTokensAndLoginStatus(null, null, false); // Clear tokens and login status from AsyncStorage
    } else {
      console.error("Error refreshing token:", error);
    }
    throw error;
  }
};

// Axios interceptor to handle 401 errors by refreshing the token
axios.interceptors.response.use(
  (response) => response,  // On success, just return the response
  async (error) => {
    if (error.response && error.response.status === 401 && refreshToken) {
      try {
        // Try to refresh the access token if a 401 error occurs
        const newTokens = await refreshAccessToken();
        accessToken = newTokens.accessToken;
        refreshToken = newTokens.refreshToken;

        // Retry the original request with the new access token
        error.config.headers['Authorization'] = `Bearer ${accessToken}`;
        return axios(error.config);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        throw refreshError;
      }
    }
    // If it’s a different error or refresh fails, reject the promise
    return Promise.reject(error);
  }
);

// Axios interceptor to set Authorization header for all requests if accessToken is available
axios.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});
