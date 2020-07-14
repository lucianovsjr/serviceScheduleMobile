import { ACTION_SIGN_IN_SUCCESS } from './actions';

const INITIAL_STATE = {
  token: '',
  signed: false,
  loading: false,
};

function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION_SIGN_IN_SUCCESS:
      return { ...state, signed: true, token: action.payload.token };
    default:
      return state
  }
}

export default auth;
