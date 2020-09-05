import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userUpdateRequest } from '../../store/modules/user/actions';
import { signOut } from '../../store/modules/auth/actions';

import Background from '../../components/Background';
import { ContainerFullHorizontal } from '../../components/Container';
import { Form, Line, TextButton, Title } from '../../components/Form';
import { Submit, Logout } from './styles';

function Profile() {
  const user = useSelector(state => state.user);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [fantasyName, setFantasyName] = useState(user.fantasyName)
  const [profession, setProfession] = useState(user.profession)

  const isProvider = user.provider;

  const emailRef = useRef('');
  const professionRef = useRef('');

  const dispatch = useDispatch();

  function handleSubmit() {
    const user = { name, fantasyName, profession };

    dispatch(userUpdateRequest(user));
  }

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <ContainerFullHorizontal topZero>
        <Form>
          {isProvider && <Title name="Perfil" />}
          <Line
            icon="person-outline"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setName}
            value={name}
            onSubmitEditing={() => emailRef.current.focus()}
            placeholder="Nome completo"
            returnKeyType="next"
          />

          <Line
            icon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={false}
            onChangeText={setEmail}
            value={email}
            ref={emailRef}
            placeholder="E-mail"
            returnKeyType="send"
          />

          {isProvider &&
            <>
              <Title name="Empresa" />

              <Line
                icon="store"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setFantasyName}
                value={fantasyName}
                placeholder="Nome fantasia"
                onSubmitEditing={() => professionRef.current.focus()}
                returnKeyType="next"
              />

              <Line
                icon="work"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setProfession}
                value={profession}
                placeholder="Profissão"
                ref={professionRef}
                returnKeyType="send"
              />
            </>
          }

          <Submit onPress={handleSubmit}>
            <TextButton>Salvar</TextButton>
          </Submit>

          <Logout onPress={handleLogout}>
            <TextButton>Sair</TextButton>
          </Logout>
        </Form>
      </ContainerFullHorizontal>
    </Background>
  );
}

export default Profile;
