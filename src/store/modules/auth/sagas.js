import { call, put, takeLatest, all } from 'redux-saga/effects';

import api from '../../../services/api';

import { ACTION_SIGN_IN_REQUEST, signInSuccess, signInFailed } from './actions';

function* signIn(action) {
  try {
    const { email, password } = action.payload;

    const response = yield call(api.post, 'session', { email, password });

    const { user, token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    const responseUser = yield call(api.get, 'users', {});

    const { name, fantasyName, profession } = responseUser.data;

    yield put(signInSuccess(
      {
        name,
        fantasyName,
        profession,
        ...user
      },
      token
    ));
  } catch (error) {

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
