import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS == 'ios' ? 'padding' : 'height'
})`
  flex: 1;
  padding: 10px 30px 0px;
  flex-direction: column;
`;

export const ContainerHeader = styled.View`
  align-self: stretch;

  margin-top: 15px;
`;

export const ContentHeader = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 46px;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;

  margin-left: 10px;
`;
