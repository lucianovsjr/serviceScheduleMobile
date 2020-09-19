import { call, put, takeLatest, all } from 'redux-saga/effects';

import api from '../../../services/api';

import { ACTION_SIGN_IN_REQUEST, signInSuccess, signInFailed } from './actions';

function* signIn(action) {
  try {
    const { email: username, password } = action.payload;

    const response = yield call(api.post, 'token', { username, password });

    const { access, refresh } = response.data;

    api.defaults.headers.Authorization = `Bearer ${access}`;

    const responseUser = yield call(api.get, 'perfil/');

    const { id, name, fantasy_name: fantasyName, profession, provider, email } = responseUser.data[0];

    yield put(signInSuccess(
      {
        id,
        name,
        fantasyName,
        profession,
        provider,
        email
      },
      access,
      refresh
    ));
  } catch (error) {
    if (error.message === 'Request failed with status code 401')
      alert('Usuário ou Senha inválido!')
    else
      alert(error.message);
    yield put(signInFailed(error.message));
  }
}

function* setToken({payload}) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(ACTION_SIGN_IN_REQUEST, signIn)
]);
