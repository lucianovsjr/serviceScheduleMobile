const ACTION_USER_CREATE_REQUEST = '@USER/CREATE_REQUEST'
const ACTION_USER_CREATE_SUCCESS = '@USER/CREATE_SUCCESS'
const ACTION_USER_CREATE_FAILED = '@USER/CREATE_FAILED'

export {
  ACTION_USER_CREATE_REQUEST,
  ACTION_USER_CREATE_SUCCESS,
  ACTION_USER_CREATE_FAILED
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
