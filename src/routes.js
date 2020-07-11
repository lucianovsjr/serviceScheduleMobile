import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthRoutes from './routes/AuthRoutes';

function Routes() {
  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  );
}

export default Routes;
