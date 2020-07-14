import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';
import { userCreateSuccess, userCreateFailed, ACTION_USER_CREATE_REQUEST } from './actions';

function* userCreate(action) {
  try {
    const { name, email, password } = action.payload.user;

    const response = yield call(api.post, 'users', { name, email, password });
    console.log(response);

    yield put(userCreateSuccess());
  } catch (error) {

    yield put(userCreateFailed(error.message));
  }
}

export default takeLatest(ACTION_USER_CREATE_REQUEST, userCreate);
