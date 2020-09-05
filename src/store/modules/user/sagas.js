import { call, put, takeLatest, all } from 'redux-saga/effects';

import api from '../../../services/api';
import {
  userCreateSuccess,
  userCreateFailed,
  ACTION_USER_CREATE_REQUEST,
  userUpdateSuccess,
  userUpdateFailed,
  ACTION_USER_UPDATE_REQUEST
} from './actions';

function* userCreate(action) {
  try {
    const { name, email, password, fantasyName, profession } = action.payload.user;

    yield call(api.post, 'users', { name, email, password, fantasyName, profession });

    yield put(userCreateSuccess());
  } catch (error) {

    yield put(userCreateFailed(error.message));
  }
}

function* userUpdate(action) {
  try {
    const { name, fantasyName, profession } = action.payload.user;

    const response = yield call(api.put, 'users', { name, fantasyName, profession });

    yield put(userUpdateSuccess(response.data));
    yield put(alert('salvo'));
  } catch (error) {
    yield put(userUpdateFailed(error.message));
  }
}

export default all([
  takeLatest(ACTION_USER_CREATE_REQUEST, userCreate),
  takeLatest(ACTION_USER_UPDATE_REQUEST, userUpdate)
]);
