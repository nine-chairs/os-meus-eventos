// src/navigation/index.tsx

import React, { FC, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  useEffect(() => {
    // Function to check if user was logged in before
    const checkLoginStatus = async () => {
      try {
        // Retrieve saved login status from AsyncStorage
        const savedLoginStatus = await AsyncStorage.getItem('isLoggedIn');
        console.log("Saved login status:", savedLoginStatus);  // Log to verify saved status
        setIsLoggedIn(savedLoginStatus === 'true'); // Set initial state based on stored value
      } catch (error) {
        console.error("Error loading login status:", error);
      } finally {
        setIsCheckingLogin(false); // Indicate checking is done
      }
    };

    checkLoginStatus();
  }, []);

  if (isCheckingLogin) {
    // Optionally return a loading screen here while checking login status
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          // If logged in, show the Home screen
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        ) : (
          // If not logged in, show Login and Register screens
          <>
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
