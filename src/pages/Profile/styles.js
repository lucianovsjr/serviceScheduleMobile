import styled from 'styled-components';
import { RectButton } from 'react-native-gesture-handler';

import { SaveButton, DeleteButton } from '../../components/Form';

export const Submit = styled(SaveButton)`
  margin-top: 15px;
`;

export const Logout = styled(DeleteButton)`
  margin-top: 20px;
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
