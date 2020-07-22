import { RectButton } from 'react-native-gesture-handler';

import styled from 'styled-components/native';

export const ContainerHeader = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: baseline;
  height: 35px;
`;

export const DayButton = styled(RectButton)``;

export const DayText = styled.Text`
  color: #fff;
  font-size: 14px;

  ${props =>
    props.select &&
    `font-weight: bold;
    font-size: 16px;`
  }
`;

export const HourList = styled.FlatList.attrs({
  numColumns: 2,
  showsVerticalScrollIndicator: false,
})`
  padding: 0 20px;
`;

export const CardHour = styled(RectButton)`
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  flex: 1;
  opacity: ${props => props.enabled ? 1 : 0.6};

  align-items: center;
  margin: 0 10px 20px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;
