const ACTION_USER_CREATE_REQUEST = '@USER/CREATE_REQUEST';
const ACTION_USER_CREATE_SUCCESS = '@USER/CREATE_SUCCESS';
const ACTION_USER_CREATE_FAILED = '@USER/CREATE_FAILED';
const ACTION_USER_UPDATE_REQUEST = '@USER/UPDATE_REQUEST';
const ACTION_USER_UPDATE_SUCCESS = '@USER/UPDATE_SUCCESS';
const ACTION_USER_UPDATE_FAILED = '@USER/UPDATE_FAILED';

export {
  ACTION_USER_CREATE_REQUEST,
  ACTION_USER_CREATE_SUCCESS,
  ACTION_USER_CREATE_FAILED,
  ACTION_USER_UPDATE_REQUEST,
  ACTION_USER_UPDATE_SUCCESS,
  ACTION_USER_UPDATE_FAILED
};

export function userCreateRequest(user) {
  return {
    type: ACTION_USER_CREATE_REQUEST,
    payload: { user },
  };
}

export function userCreateSuccess() {
  return {
    type: ACTION_USER_CREATE_SUCCESS,
    payload: {},
  };
}

export function userCreateFailed(message) {
  return {
    type: ACTION_USER_CREATE_FAILED,
    payload: { message },
  };
}

export function userUpdateRequest(user) {
  return {
    type: ACTION_USER_UPDATE_REQUEST,
    payload: { user },
  };
}

export function userUpdateSuccess(user) {
  return {
    type: ACTION_USER_UPDATE_SUCCESS,
    payload: { user },
  };
}

export function userUpdateFailed(message) {
  return {
    type: ACTION_USER_UPDATE_FAILED,
    payload: { message },
  };
}
