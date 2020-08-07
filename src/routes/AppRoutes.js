import React from 'react';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

import MySchedule from '../pages/MySchedule';
import Profile from '../pages/Profile';

import SelectRoutes from '../routes/SelectRoutes';
import CreateScheduleRoutes from '../routes/CreateScheduleRoutes';

function AppRoutes() {
  const provider = useSelector(state => state.user.provider);

  return(
    <Tab.Navigator initialRoute="MySchedule">

      { provider &&
        <Tab.Screen
          name="CreateSchedule"
          component={CreateScheduleRoutes}
          options={{
            title: 'Criar agenda',
            tabBarIcon: ({color, size}) => (<Icon name="today" color={color} size={size} />)
          }}
        />
      }
      <Tab.Screen
        name="MySchedule"
        component={MySchedule}
        options={{
          title: 'Minha agenda',
          tabBarIcon: ({color, size}) => (<Icon name="today" color={color} size={size} />)
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
        component={Profile}
        options={{
          title: 'Perfil',
          tabBarIcon: ({color, size}) => (<Icon name="person" color={color} size={size} />)
        }}
      />
    </Tab.Navigator>
  );
}

export default AppRoutes;
