import { Platform } from 'react-native';

import styled from 'styled-components';
import { RectButton } from 'react-native-gesture-handler';

import Input from '../../components/Input';

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS == 'ios' ? 'padding' : 'height'
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 5px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(RectButton)`
  margin-top: 5px;

  height: 46px;
  background: #3b9eff;
  border-radius: 4px;

  font-size: 16px;
  font-weight: bold;
  color: #fff;

  justify-content: center;
  align-items: center;
`;

export const TextButton = styled.Text`
  font-size: 18px;
  color: #fff;
`;

export const LogoutButton = styled(RectButton)`
  margin-top: 20px;

  height: 46px;
  background: #f64c75;
  border-radius: 4px;

  font-size: 16px;
  font-weight: bold;
  color: #fff;

  justify-content: center;
  align-items: center;
`;
