import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CreateSchedule from '../pages/CreateSchedule';
import CreateScheduleGenerate from '../pages/CreateScheduleGenerate';
import CreateScheduleEvents from '../pages/CreateScheduleEvents';
import ScheduleEvents from '../pages/ScheduleEvents.';

const Stack = createStackNavigator();

function SelectRoutes() {
  return (
    <Stack.Navigator initialRouteName="CreateSchedule">
      <Stack.Screen
        name="CreateSchedule"
        component={CreateSchedule}
        options={{
          headerTitle: 'Gerenciar Agenda',
          headerTitleAlign: 'center',
          headerTintColor: '#eee',
          headerStyle: {
            backgroundColor: '#4289cb'
          }
        }}
      />
      <Stack.Screen
        name="CreateScheduleGenerate"
        component={CreateScheduleGenerate}
        options={{
          headerTitle: 'Criar Agenda',
          headerTitleAlign: 'center',
          headerTintColor: '#eee',
          headerStyle: {
            backgroundColor: '#4289cb'
          }
        }}
      />
      <Stack.Screen
        name="ScheduleEvents"
        component={ScheduleEvents}
        options={{
          headerTitle: 'Eventos',
          headerTitleAlign: 'center',
          headerTintColor: '#eee',
          headerStyle: {
            backgroundColor: '#4289cb'
          }
        }}
      />
      <Stack.Screen
        name="CreateScheduleEvents"
        component={CreateScheduleEvents}
        options={{
          headerTitle: 'Evento',
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
