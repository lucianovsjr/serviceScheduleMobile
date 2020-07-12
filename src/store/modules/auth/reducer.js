import { ACTION_SIGN_IN_REQUEST } from './actions';

const INITIAL_STATE = {
  token: '',
  signed: false,
  loading: false,
};

function auth(state = INITIAL_STATE, action) {
  switch (action) {
    case ACTION_SIGN_IN_REQUEST:
      return { ...state, signed: true };
    default:
      return state
  }
}

export default auth;
