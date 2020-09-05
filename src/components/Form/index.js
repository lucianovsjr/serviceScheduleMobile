import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

import { LineDefault, LineTitle } from './Line';

export const Form = styled.View`
  align-self: stretch;
`;

export const Line = LineDefault;

export const Title = LineTitle;

export const SaveButton = styled(RectButton)`
  height: 46px;
  background: #3b9eff;
  border-radius: 4px;

  font-size: 16px;
  font-weight: bold;
  color: #fff;

  justify-content: center;
  align-items: center;

  margin: 0 10px;
`;

export const CancelButton = styled(SaveButton)`
  background: #363636;
`;

export const DeleteButton = styled(SaveButton)`
  background: #ff4d4d;
`;

export const TextButton = styled.Text`
  font-size: 18px;
  color: #fff;
`;
