import { ACTION_SIGN_IN_SUCCESS, ACTION_SIGN_OUT } from './actions';

const INITIAL_STATE = {
  token: '',
  tokenRefresh: '',
  signed: false,
  loading: false,
};

function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION_SIGN_IN_SUCCESS:
      return {
        ...state,
        signed: true,
        token: action.payload.token,
        tokenRefresh: action.payload.tokenRefresh
      };

    case ACTION_SIGN_OUT:
      return INITIAL_STATE;

    default:
      return state
  }
}

export default auth;
