import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MySchedule from '../pages/MySchedule';

const Stack = createStackNavigator();

function SelectRoutes() {
  return (
    <Stack.Navigator initialRouteName="MySchedule">
      <Stack.Screen
        name="MySchedule"
        component={MySchedule}
        options={{
          headerTitle: 'Agendamentos',
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

export default SelectRoutes;
