import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS == 'ios' ? 'padding' : 'height'
})`
  flex: 1;
  padding: 10px 30px 0px;
  flex-direction: column;
  align-items: center;
`;

export const AppointmentList = styled.FlatList.attrs({
  numColumns: 1,
  showsVerticalScrollIndicator: false,
})`
  align-self: stretch
`;
