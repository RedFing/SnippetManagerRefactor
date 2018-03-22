import { LOGIN_USER_SUCCESS } from '../actions/actionTypes';

const INITIAL_STATE = {
  isLogged: false,
  username: '',
  id: '',
  avatarUrl: '',
  token: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLogged: true,
        username: action.payload.username,
        id: action.payload.id,
        avatarUrl: action.payload.avatar_url,
        token: action.payload.token,
      };
    default:
      return state;
  }
};
