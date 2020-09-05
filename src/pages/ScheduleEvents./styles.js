import { RectButton } from 'react-native-gesture-handler';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const MyScheduleList = styled.FlatList.attrs({
  numColumns: 1,
  showsVerticalScrollIndicator: false,
})`
  padding: 0 20px;
`;

export const ButtonCardSchedule = styled(RectButton)`
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  flex: 1;

  align-items: center;
  margin: 0 10px 15px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

export const AddSchedule = styled(Icon).attrs({
  name: "add-circle",
  size: 45,
  color: "#00cc66",
})`
  position: absolute;
  bottom: 15px;
  right: 15px;
`;
