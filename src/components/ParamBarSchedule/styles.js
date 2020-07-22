import { TouchableOpacity } from 'react-native';

import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  align-self: stretch;

  margin-top: 15px;
`;

export const Content = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 46px;
`;

export const Text = styled.Text`
  font-size: 16px;
  text-align: center;
  color: #fff;
  margin: auto 0;
`;

export const Hours = styled(TouchableOpacity)`
  font-size: 14px;
  color: #fff;
  background: rgba(0, 0, 0, 0.1);

  height: 36px;
  width: 65px;
  padding: 12px;

  margin-left: 5px;
`;

export const ServiceTimeText = styled(Text)`
  margin-left: 20px;
`;

export const ServiceTimeButton = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.8)',
})`
  font-size: 16px;
  color: #fff;
  background: rgba(0, 0, 0, 0.1);

  height: 36px;
  width: 50px;
  padding: 10px;

  margin-left: 5px;
`;

export const ParamBarButton = styled(RectButton)`
  margin-top: 5px;
  margin-right: 10px;

  width: 100px;
  height: 38px;
  background: #3b9eff;
  border-radius: 4px;

  justify-content: center;
  align-items: center;
`;

export const TextButton = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;
