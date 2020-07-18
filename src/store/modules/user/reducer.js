import { ACTION_SIGN_IN_SUCCESS, ACTION_SIGN_OUT } from '../auth/actions';
import { ACTION_USER_UPDATE_SUCCESS } from '../user/actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  provider: true,
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION_SIGN_IN_SUCCESS:
      return {
        name: action.payload.user.name,
        email: action.payload.user.email,
        provider: action.payload.user.provider,
      };

    case ACTION_USER_UPDATE_SUCCESS:
      return {
        name: action.payload.user.name,
        ...state
      };

    case ACTION_SIGN_OUT:
      return INITIAL_STATE;

    default:
      return state;
  }
}

export default user;
