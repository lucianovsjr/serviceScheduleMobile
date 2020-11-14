import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MyCalendar from '../pages/MyCalendar';
import MyCalendarAppointment from '../pages/MyCalendarAppointment';

const Stack = createStackNavigator();

function MyCalendarRoutes() {
  return (
    <Stack.Navigator initialRouteName="MyCalendar">
      <Stack.Screen
        name="MyCalendar"
        component={MyCalendar}
        options={{
          headerTitle: 'Minha agenda',
          headerTitleAlign: 'center',
          headerTintColor: '#eee',
          headerStyle: {
            backgroundColor: '#4289cb'
          }
        }}
      />
      <Stack.Screen
        name="MyCalendarAppointment"
        component={MyCalendarAppointment}
        options={{
          headerTitle: 'Agendamento',
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

export default MyCalendarRoutes;
