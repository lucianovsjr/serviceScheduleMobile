import { TouchableOpacity } from 'react-native';

import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0;

  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const Hours = styled(TouchableOpacity)`
  font-size: 14px;

  height: 36px;
  width: 130px;
  padding: 10px;

  margin-left: 5px;
`;

export const Text = styled.Text`
  font-size: 16px;
  text-align: center;
  margin: auto 0;
`;
