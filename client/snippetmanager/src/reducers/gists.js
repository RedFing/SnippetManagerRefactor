import { LOAD_GISTS_SUCCESS, LOAD_GISTS_PENDING, LOGOUT_USER } from '../actions/actionTypes';
import { GISTS_FETCH_SIZE } from '../actions/constants';

const INITIAL_STATE = {
  isFetching: false,
  gists: [],
  page: 1,
  isRemaining: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_GISTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        gists: [...state.gists, ...action.payload],
        page: state.page + 1,
        isRemaining: action.payload.length === GISTS_FETCH_SIZE,
      };
    case LOAD_GISTS_PENDING:
      return {
        ...state,
        isFetching: true,
      };
    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};


/*

import {LOGIN_USER_SUCCESS, LOGOUT_USER} from '../actions/actionTypes';

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
    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};


 */
