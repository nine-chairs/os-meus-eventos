// src/screens/HomeScreen.tsx

import React from 'react';
import { View, Text, Button } from 'react-native';
import { logoutUser } from '../../services/authService';
import EventList from './EventList';

type HomeScreenProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ setIsLoggedIn }) => {
  const handleLogout = async () => {
    await logoutUser();  // Call logout function from authService
    setIsLoggedIn(false); // Update login state after logging out
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Logout" onPress={handleLogout} />
      <EventList />
    </View>
  );
};

export default HomeScreen;