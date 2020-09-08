import React, { useState, useRef, useEffect } from 'react'
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Background from '../../components/BackgroundSign';
import { Container, Form, FormInput, SubmitButton, TextButton, SignLink, SignLinkText } from './styles';
import { userCreateRequest, userCreateRedirectSuccess } from '../../store/modules/user/actions';

import Logo from '../../assets/logo.png';

function SignUp({ navigation }) {
  const [username, setusername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef('');
  const passwordRef = useRef('');

  const dispatch = useDispatch();
  const redirectSignIn = useSelector((state) => state.user.redirectSignIn)

  useEffect(() => {
    if (redirectSignIn) {
      dispatch(userCreateRedirectSuccess());
      navigation.navigate('SignIn');
    }
  }, [redirectSignIn])

  function handleSubmit() {
    const user = { username, email, password };

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
            onChangeText={setusername}
            onSubmitEditing={() => emailRef.current.focus()}
            placeholder="Nome completo"
            returnKeyType="next"
            value={username}
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
