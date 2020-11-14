import { RectButton } from 'react-native-gesture-handler';

import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0;

  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  margin-left: 10px;
`;

export const DayButton = styled(RectButton)`
  font-size: 14px;
  width: 45px;

  ${(props) => props.selected && 'background-color: #c7c7c7;'}
`;

export const DayText = styled.Text`
  font-size: 16px;
  text-align: center;
  margin: auto 0;
`;
