import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import AuthRoutes from './routes/AuthRoutes';
import AppRoutes from './routes/AppRoutes';

function Routes() {
  const signed = useSelector(state => state.auth.signed);

  return (
    <NavigationContainer>
      <>
        <StatusBar barStyle="light-content" backgroundColor="#4289cb" />
        { signed ? <AppRoutes /> : <AuthRoutes /> }
      </>
    </NavigationContainer>
  );
}

export default Routes;
