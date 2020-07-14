import { ACTION_SIGN_IN_SUCCESS } from '../auth/actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION_SIGN_IN_SUCCESS:
      const { name, email } = action.payload.user;

      return { name, email };
    default:
      return state;
  }
}

export default user;
