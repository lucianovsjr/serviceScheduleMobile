import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export const Card = styled.View.attrs({
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.8,
  shadowRadius: 2,

  elevation: 6,
})`
  background: #fff;
  border-radius: 1px;
  padding: 13px;
  height: 90px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 0 10px 15px;
`;

export const ButtonCard = styled(RectButton).attrs({
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.8,
  shadowRadius: 2,

  elevation: 6,
})`
  background: #fff;
  border-radius: 1px;
  padding: 13px;
  height: 90px;

  flex-direction: row;
  align-items: center;

  margin: 0 10px 15px;
`;

export const CardAvatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;

export const CardColumn = styled.View`
  flex-direction: column;
`;

export const CardRow = styled.View`
  flex-direction: row;
`;

export const CardTitle1 = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

export const CardText1 = styled.Text`
  font-size: 14px;
  color: #333;
`;

export const CardText1Bold = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

export const CardText2 = styled.Text`
  font-size: 12px;
  color: #333;
`;
