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
    const { username, email, password } = action.payload.user;

    yield call(api.post, 'users/register', { username: email, first_name: username, email, password });

    yield put(userCreateSuccess());
  } catch (error) {
    alert(error.message);
    yield put(userCreateFailed(error.message));
  }
}

function* userUpdate(action) {
  try {
    const { name, fantasyName, profession } = action.payload.user;

    const response = yield call(api.put, 'perfil/update', {
      name,
      fantasy_name: fantasyName,
      profession
    });

    yield put(userUpdateSuccess({
      fantasyName: response.data.fantasy_name,
      name: response.data.name,
      profession: response.data.profession,
    }));
    alert('salvo');
  } catch (error) {
    alert(error.message);
    yield put(userUpdateFailed(error.message));
  }
}

export default all([
  takeLatest(ACTION_USER_CREATE_REQUEST, userCreate),
  takeLatest(ACTION_USER_UPDATE_REQUEST, userUpdate)
]);
