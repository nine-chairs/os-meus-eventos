// screens/LoginScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type LoginScreenProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ setIsLoggedIn }) => {
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default LoginScreen;
