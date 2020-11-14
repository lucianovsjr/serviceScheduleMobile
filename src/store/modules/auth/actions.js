const ACTION_SIGN_IN_REQUEST = '@auth/SIGN_IN_REQUEST';
const ACTION_SIGN_IN_SUCCESS = '@auth/SIGN_IN_SUCCESS';
const ACTION_SIGN_IN_FAILED = '@auth/SIGN_IN_FAILED';
const ACTION_SIGN_OUT = '@auth/SIGN_OUT';

export {
  ACTION_SIGN_IN_REQUEST,
  ACTION_SIGN_IN_SUCCESS,
  ACTION_SIGN_IN_FAILED,
  ACTION_SIGN_OUT
};

export function signInRequest(email, password) {
  return {
    type: ACTION_SIGN_IN_REQUEST,
    payload: {email, password},
  };
}

export function signInSuccess(user, token, tokenRefresh) {
  return {
    type: ACTION_SIGN_IN_SUCCESS,
    payload: { user, token, tokenRefresh },
  };
}

export function signInFailed(message) {
  return {
    type: ACTION_SIGN_IN_FAILED,
    payload: { message },
  };
}

export function signOut() {
  return {
    type: ACTION_SIGN_OUT,
    payload: { },
  };
}
