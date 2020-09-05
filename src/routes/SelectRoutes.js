import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SelectProvider from '../pages/SelectProvider';
import SelectProviderMonth from '../pages/SelectProviderMonth';
import SelectAppointmentMonth from '../pages/SelectAppointmentMonth';

const Stack = createStackNavigator();

function SelectRoutes() {
  return (
    <Stack.Navigator initialRouteName="SelectProvider">
      <Stack.Screen
        name="SelectProvider"
        component={SelectProvider}
        options={{
          headerTitle: 'Prestadores de serviço',
          headerTitleAlign: 'center',
          headerTintColor: '#eee',
          headerStyle: {
            backgroundColor: '#4289cb'
          }
        }}
      />
      <Stack.Screen
        name="SelectProviderMonth"
        component={SelectProviderMonth}
        options={{
          headerTitle: 'Horários',
          headerTitleAlign: 'center',
          headerTintColor: '#eee',
          headerStyle: {
            backgroundColor: '#4289cb'
          }
        }}
      />
      <Stack.Screen
        name="SelectAppointmentMonth"
        component={SelectAppointmentMonth}
      />
    </Stack.Navigator>
  );
}

export default SelectRoutes;
