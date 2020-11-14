import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Card = styled.View`
  height: 80px;
  flex-direction: row;
  align-self: center;
`;

export const CardHour = styled.View`
  height: 80px;
`;

export const TextHour = styled.Text`
  color: #eee;
  font-size: 18px;
  margin: 10px 15px 0 0;
`;

export const TimeLine = styled.View`
  height: 80px;
  flex-direction: column;
  align-items: center;
`;

export const Line = styled.View`
  width: 3px;
  height: 30px;
  background-color: #D3D3D3;
`;

export const LineIcon = styled(TouchableOpacity)`
  border: 3px #D3D3D3 solid;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${(props) => props.backColorIcon};
`;

export const CardMonth = styled.View`
  height: 65px;
  align-self: stretch;
  margin-bottom: 15px;
`;

export const TextMonth = styled.Text`
  color: #eee;
  font-weight: bold;
  font-size: 21px;
`;

export const DateMonth = styled.Text`
  color: #eee;
  font-weight: bold;
  font-size: 14px;
`;
