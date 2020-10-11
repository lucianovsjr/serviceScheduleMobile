import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import { ButtonCard } from '../../components/Card';

import { PrimaryColor, SecondaryColor } from '../../styleGuide';

/*
export const xContainerHeader = styled.View`
  padding: 10px 10px 0;
  background-color: #4289cb;
`;
*/

export const ContainerHeader  = styled(LinearGradient).attrs({
  start: {x: 0.0, y: 0.0},
  end: {x: 0.0, y: 0.8},
  colors: [SecondaryColor, PrimaryColor]
})`
  padding: 10px 10px 0;
`;

export const ContainerList = styled.View`
  flex: 1;
  padding: 8px 8px 0;
  background-color: #eee;
`;

export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 8px;

  justify-content: center;
  align-self: center;
`;

export const ButtonCardMonth = styled(ButtonCard)`
  width: 200px;
  border-radius: 1px;
  ${props => props.selected && 'background-color: #eee;'}

  justify-content: space-between;
`;

export const AvatarName = styled.Text`
  font-size: 16px;
  font-weight: bold;

  align-self: center;

  margin: 10px 0 15px;
`;

export const TextMonth = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const ColumnVacancies = styled.View`
  flex-direction: column;
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

export const SeparatorList = styled.View`
  height: 5px;
  background-color: #eee;
`;
