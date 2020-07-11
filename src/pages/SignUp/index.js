import React, { useState, useRef } from 'react'
import { Image } from 'react-native';

import Background from '../../components/Background';
import { Container, Form, FormInput, SubmitButton, TextButton, SignLink, SignLinkText } from './styles';

import Logo from '../../assets/logo.png';

function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef('');
  const passwordRef = useRef('');

  function handleSubmit() {
    navigation.navigate('SignIn')
  }

  return (
    <Background>
      <Container>
        <Image style={{ width: 130, height: 130 }} source={Logo} />

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

          <SubmitButton onPress={() => handleSubmit}>
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
