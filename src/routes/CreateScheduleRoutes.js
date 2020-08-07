import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CreateTemplate from '../pages/CreateTemplate';
import CreateSchedule from '../pages/CreateSchedule';

const Stack = createStackNavigator();

function SelectRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="CreateTemplate"
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="CreateTemplate" component={CreateTemplate} />
      <Stack.Screen name="CreateSchedule" component={CreateSchedule} />
    </Stack.Navigator>
  );
}

export default SelectRoutes;
