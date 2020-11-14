import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from '../pages/Profile';

const Stack = createStackNavigator();

function ProfileRoutes() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: 'Perfil',
          headerTitleAlign: 'center',
          headerTintColor: '#eee',
          headerStyle: {
            backgroundColor: '#4289cb'
          }
        }}
      />
    </Stack.Navigator>
  );
}

export default ProfileRoutes;
