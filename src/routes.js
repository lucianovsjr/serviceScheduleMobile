import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import AuthRoutes from './routes/AuthRoutes';
import AppRoutes from './routes/AppRoutes';

function Routes() {
  const signed = useSelector(state => state.auth.signed);

  return (
    <NavigationContainer>
      { signed ? <AppRoutes /> : <AuthRoutes /> }
    </NavigationContainer>
  );
}

export default Routes;
