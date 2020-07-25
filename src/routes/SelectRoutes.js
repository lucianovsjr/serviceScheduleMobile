import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SelectProvider from '../pages/SelectProvider';
import SelectAppointment from '../pages/SelectAppointment';

const Stack = createStackNavigator();

function SelectRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="SelectProvider"
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="SelectProvider" component={SelectProvider} />
      <Stack.Screen name="SelectAppointment" component={SelectAppointment} />
    </Stack.Navigator>
  );
}

export default SelectRoutes;
