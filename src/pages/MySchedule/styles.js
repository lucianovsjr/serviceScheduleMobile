import { RectButton } from 'react-native-gesture-handler';

import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS == 'ios' ? 'padding' : 'height'
})`
  flex: 1;
  padding: 10px 30px 0px;
  flex-direction: column;
`;

export const MyHourList = styled.FlatList.attrs({
  numColumns: 1,
  showsVerticalScrollIndicator: false,
})`
  padding: 0 20px;
`;

export const ButtonCardHour = styled(RectButton)`
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
