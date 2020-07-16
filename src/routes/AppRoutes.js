import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

import MySchedule from '../pages/MySchedule';
import SelectService from '../pages/SelectService';
import Profile from '../pages/Profile';

function AppRoutes() {
  return(
    <Tab.Navigator initialRoute="MySchedule">
      <Tab.Screen
        name="MySchedule"
        component={MySchedule}
        options={{
          title: 'Minha agenda',
          tabBarIcon: ({color, size}) => (<Icon name="today" color={color} size={size} />)
        }}
      />
      <Tab.Screen
        name="SelectService"
        component={SelectService}
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
