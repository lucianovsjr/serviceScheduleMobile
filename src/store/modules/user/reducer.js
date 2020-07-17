import { ACTION_SIGN_IN_SUCCESS, ACTION_SIGN_OUT } from '../auth/actions';
import { ACTION_USER_UPDATE_SUCCESS } from '../user/actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION_SIGN_IN_SUCCESS:
    case ACTION_USER_UPDATE_SUCCESS:
      return {
        name: action.payload.user.name,
        email: action.payload.user.email
      };

    case ACTION_SIGN_OUT:
      return {
        name: '',
        email: ''
      };

    default:
      return state;
  }
}

export default user;
