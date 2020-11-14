import styled from 'styled-components/native';

export default Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  padding: 20px 10px 0px;
  flex-direction: column;
`;

export const ContainerFullHorizontal = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  ${(props) => !props.topZero && 'padding-top: 20px;' }
  padding-bottom: 5px;
  flex-direction: column;
`;
