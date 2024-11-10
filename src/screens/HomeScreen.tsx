import React from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HomeScreenProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ setIsLoggedIn }) => {
  const handleLogout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
    await AsyncStorage.removeItem('accessToken'); // Optional: clear token on logout
    await AsyncStorage.removeItem('refreshToken'); // Optional: clear token on logout
  };

  return (
    <View>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
