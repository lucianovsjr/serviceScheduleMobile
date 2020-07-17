import React, { useState, useRef } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '../../store/modules/auth/actions';
import Background from '../../components/Background';
import { Container, Form, FormInput, SubmitButton, TextButton, SignLink, SignLinkText } from './styles';

import Logo from '../../assets/logo.png'

function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordRef = useRef();

  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <Background>
      <Container>
        <Image
          style={{width: 130, height: 130}}
          source={Logo}
        />

        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={setEmail}
            onSubmitEditing={() => passwordRef.current.focus()}
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            value={email}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            onChangeText={setPassword}
            onSubmitEditing={handleSubmit}
            value={password}
            placeholder="Digite sua senha"
            ref={passwordRef}
            returnKeyType="send"
          />

          <SubmitButton onPress={handleSubmit}>
            <TextButton>Entrar</TextButton>
          </SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar uma conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

export default SignIn;
