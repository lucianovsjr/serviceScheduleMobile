import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userUpdateRequest } from '../../store/modules/user/actions';
import { signOut } from '../../store/modules/auth/actions';

import Background from '../../components/Background';
import { Container, Form, FormInput, SubmitButton, TextButton, LogoutButton } from './styles';

function Profile() {
  const user = useSelector(state => state.user);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const emailRef = useRef();

  const dispatch = useDispatch();

  function handleSubmit() {
    const user = { name };

    dispatch(userUpdateRequest(user));
  }

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background >
      <Container>
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
            editable={false}
            onChangeText={setEmail}
            placeholder="E-mail"
            ref={emailRef}
            returnKeyType="send"
            value={email}
          />

          <SubmitButton onPress={handleSubmit}>
            <TextButton>Salvar</TextButton>
          </SubmitButton>

          <LogoutButton onPress={handleLogout}>
            <TextButton>Sair</TextButton>
          </LogoutButton>
        </Form>
      </Container>
    </Background>
  );
}

export default Profile;
