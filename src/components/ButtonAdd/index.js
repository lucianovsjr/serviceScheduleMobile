import React from 'react';
import { View } from 'react-native';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useNavigation } from '@react-navigation/native';

export const AddSchedule = styled(Icon).attrs({
  name: "add-circle",
  size: 45,
  color: "#00cc66",
})`
  position: absolute;
  bottom: 15px;
  right: 15px;
`;

export default ({route, route_params}) => {
  const navigation = useNavigation();

  return (
    <View>
      <AddSchedule
        onPress={() => navigation.navigate(route, { ...route_params })}
      />
    </View>
  );
};
