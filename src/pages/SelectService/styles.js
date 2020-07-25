import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS == 'ios' ? 'padding' : 'height'
})`
  flex: 1;
  padding: 10px 30px 0px;
  flex-direction: column;
`;

export const ProviderList = styled.FlatList.attrs({
  numColumns: 1,
  showsVerticalScrollIndicator: false,
})`
  padding: 0 20px;
`;

export const ButtonCardProvider = styled(RectButton)`
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  margin: 0 10px 15px;

  flex: 1;
  align-items: center;
  flex-direction: row;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;

  margin-left: 10px;
`;
