import { ACTION_SIGN_IN_SUCCESS, ACTION_SIGN_OUT } from '../auth/actions';
import {
  ACTION_USER_UPDATE_SUCCESS,
  ACTION_USER_CREATE_SUCCESS
} from '../user/actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  provider: true,
  fantasyName: '',
  profession: '',
  redirectSignIn: false
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION_SIGN_IN_SUCCESS:
      return {
        id: action.payload.user.id,
        name: action.payload.user.name,
        email: action.payload.user.email,
        provider: action.payload.user.provider,
        fantasyName: action.payload.user.fantasyName,
        profession: action.payload.user.profession,
        redirectSignIn: false
      };

    case ACTION_USER_UPDATE_SUCCESS:
      return {
        ...state,
        name: action.payload.user.name,
        fantasyName: action.payload.user.fantasyName,
        profession: action.payload.user.profession
      };

    case ACTION_USER_CREATE_SUCCESS:
      return {
        ...state,
        redirectSignIn: action.payload.redirectSignIn
      };

    case ACTION_SIGN_OUT:
      return INITIAL_STATE;

    default:
      return state;
  }
}

export default user;
