import React, { FC, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { checkLoginStatus } from '../services/authService';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import CreateEventScreen from '../screens/CreateEventScreen/CreateEventScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
  CreateEvent: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  useEffect(() => {
    const initializeLoginStatus = async () => {
      try {
        const loggedIn = await checkLoginStatus();
        setIsLoggedIn(loggedIn);
      } catch (error) {
        console.error("Error loading login status:", error);
      } finally {
        setIsCheckingLogin(false);
      }
    };

    initializeLoginStatus();
  }, []);

  if (isCheckingLogin) {
    // Optionally return a loading screen here while checking login status
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home">
              {(props) => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
          </>
        ) : (
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
