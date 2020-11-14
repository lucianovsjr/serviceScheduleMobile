import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ButtonCard } from '../../components/Card';

export const ContainerHeader = styled.View`
  margin: 10px 10px 0;
  padding: 5px 0;
`;

export const ContainerList = styled.View`
  flex: 1;
  padding: 8px 8px 0;
  background-color: #eee;
`;

export const ButtonCardMonth = styled(ButtonCard)`
  width: 200px;
  border-radius: 1px;
  ${props => props.selected && 'background-color: #eee;'}

  justify-content: space-between;
`;

export const TextMonth = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const TitleVacancies = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

export const TextVacancies = styled.Text`
  font-size: 14px;
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
