/* eslint-disable eqeqeq */
import {
  LOAD_GISTS_SUCCESS, LOAD_GISTS_PENDING, LOGOUT_USER, DELETE_GIST_SUCCESS,
  ADD_GIST_SUCCESS, EDIT_GIST_SUCCESS,
} from '../actions/actionTypes';
import { GISTS_FETCH_SIZE } from '../actions/constants';

const INITIAL_STATE = {
  isFetching: false,
  gists: [],
  page: 1,
  isRemaining: true,
};

const removeDeletedGist = (gists, gistId) => gists.filter(el => el.id != gistId);
const swapEditedGist = (gists, gist, gistId) => gists.map(el => ((el.id == gistId) ? gist : el));

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
    case DELETE_GIST_SUCCESS: {
      return {
        ...state,
        gists: removeDeletedGist(state.gists, action.payload),
      };
    }
    case ADD_GIST_SUCCESS:
      return {
        ...state,
        gists: [action.payload, ...state.gists],
      };
    case EDIT_GIST_SUCCESS:
      return {
        ...state,
        gists: swapEditedGist(state.gists, action.payload.gist, action.payload.gistId),
      };
    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

