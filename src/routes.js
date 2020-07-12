import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import AuthRoutes from './routes/AuthRoutes';

function Routes() {
  const signed = useSelector(state => state.auth.signed);

  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  );
}

export default Routes;
