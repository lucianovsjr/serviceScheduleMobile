import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './routes';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#3b9eff" barStyle="light-content" />
      <Routes />
    </>
  );
};

export default App;
