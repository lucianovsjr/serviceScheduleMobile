import React, { useState, useRef } from 'react'
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';

import Background from '../../components/BackgroundSign';
import { Container, Form, FormInput, SubmitButton, TextButton, SignLink, SignLinkText } from './styles';
import { userCreateRequest } from '../../store/modules/user/actions';

import Logo from '../../assets/logo.png';

function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef('');
  const passwordRef = useRef('');

  const dispatch = useDispatch();

  function handleSubmit() {
    const user = { name, email, password };

    dispatch(userCreateRequest(user));
  }

  return (
    <Background>
      <Container>
        <Image style={{ width: 80, height: 80 }} source={Logo} />

        <Form>
          <FormInput
            icon="person-outline"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setName}
            onSubmitEditing={() => emailRef.current.focus()}
            placeholder="Nome completo"
            returnKeyType="next"
            value={name}
          />

          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setEmail}
            onSubmitEditing={() => passwordRef.current.focus()}
            placeholder="E-mail"
            ref={emailRef}
            returnKeyType="next"
            value={email}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            onChangeText={setPassword}
            onSubmitEditing={handleSubmit}
            value={password}
            placeholder="Senha"
            ref={passwordRef}
            returnKeyType="send"
          />

          <SubmitButton onPress={handleSubmit}>
            <TextButton>Criar conta</TextButton>
          </SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>Já tenho conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

export default SignUp;
