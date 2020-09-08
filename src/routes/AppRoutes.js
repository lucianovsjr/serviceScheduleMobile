import React from 'react';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

import MyCalendar from '../pages/MyCalendar';

import SelectRoutes from './SelectRoutes';
import MyCalendarRoutes from './MyCalendarRoutes';
import ProfileRoutes from './ProfileRoutes';
import CreateScheduleRoutes from './CreateScheduleRoutes';
import MyScheduleRoutes from './MyScheduleRoutes';

function AppRoutes() {
  const provider = useSelector(state => state.user.provider);

  return (
    <Tab.Navigator initialRoute="MySchedule">

      { provider &&
        <>
          <Tab.Screen
            name="CreateSchedule"
            component={CreateScheduleRoutes}
            options={{
              title: 'Gerenciar',
              tabBarIcon: ({color, size}) => (<Icon name="today" color={color} size={size} />)
            }}
          />
          <Tab.Screen
            name="MyCalendar"
            component={MyCalendarRoutes}
            options={{
              title: 'Minha agenda',
              tabBarIcon: ({color, size}) => (<Icon name="date-range" color={color} size={size} />)
            }}
          />
        </>
      }

      <Tab.Screen
        name="MyScheduleRoutes"
        component={MyScheduleRoutes}
        options={{
          title: 'Agendamentos',
          tabBarIcon: ({color, size}) => (<Icon name="event-available" color={color} size={size} />)
        }}
      />
      <Tab.Screen
        name="Select"
        component={SelectRoutes}
        options={{
          title: 'Agendar',
          tabBarIcon: ({color, size}) => (<Icon name="add-circle-outline" color={color} size={size} />)
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileRoutes}
        options={{
          title: 'Perfil',
          tabBarIcon: ({color, size}) => (<Icon name="person" color={color} size={size} />)
        }}
      />
    </Tab.Navigator>
  );
}

export default AppRoutes;
