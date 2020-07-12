import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import Routes from './routes';
import { store } from './store';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar backgroundColor="#3b9eff" barStyle="light-content" />
        <Routes />
      </Provider>
    </>
  );
};

export default App;
