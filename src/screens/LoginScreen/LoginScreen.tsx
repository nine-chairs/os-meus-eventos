// src/screens/LoginScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { loginUser } from '../../services/authService';

type LoginScreenProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: any;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ setIsLoggedIn, navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userData = await loginUser(email, password);
      setIsLoggedIn(true);
      console.log('Login successful', userData);
    } catch (error) {
      Alert.alert('Login failed', 'Please check your email and password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

export default LoginScreen;
