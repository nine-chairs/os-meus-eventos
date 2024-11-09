// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import Navigation from './src/navigation';

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="default" />
      <Navigation />
    </>
  );
};

export default App;
