const ACTION_SIGN_IN_REQUEST = '@auth/SIGN_IN_REQUEST';

export { ACTION_SIGN_IN_REQUEST };

export function signInRequest(email, password) {
  return {
    type: ACTION_SIGN_IN_REQUEST,
    payload: {email, password},
  };
}
