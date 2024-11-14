// src/services/authService.ts

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from '@env';
import { API_BASE_URL } from '@env';

const apiKey = API_KEY;
const apiBaseUrl = API_BASE_URL;

// Key for storing login status in AsyncStorage
const loginStatusKey = 'isLoggedIn';

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
      {
        email,
        password,
      },
      {
        headers: {
          'ApiKey': apiKey,
        },
      }
    );

    // Save login status in AsyncStorage
    await AsyncStorage.setItem(loginStatusKey, 'true');
    console.log("Login status saved to AsyncStorage:", 'true');

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

// Function to log out a user
export const logoutUser = async () => {
  try {
    // Remove login status from AsyncStorage
    await AsyncStorage.removeItem(loginStatusKey);
    console.log("Login status removed from AsyncStorage.");

  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

// Function to check if the user is logged in
export const checkLoginStatus = async () => {
  try {
    const isLoggedIn = await AsyncStorage.getItem(loginStatusKey);
    console.log('check login status function ran')
    console.log("Login status retrieved from AsyncStorage:", isLoggedIn);
    return isLoggedIn === 'true';
  } catch (error) {
    console.error("Error checking login status:", error);
    return false;
  }
};

