import styled from 'styled-components/native';

export const Container = styled.View.attrs({
  borderColor: '#fff',
  borderWidth: 1,
})`
  padding: 0 15px;
  height: 50px;

  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#fff',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #2c2c2c;
  padding: 10px;
`;
