import { LOAD_GIST_PENDING, LOAD_GIST_SUCCESS, LOAD_GIST_FAILED } from '../actions/actionTypes';

const INITIAL_STATE = {
  selected: false,
  loading: false,
  gist: {},
  editorMode: 'view',
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_GIST_PENDING:
      return {
        ...state,
        loading: true,
      };
    case LOAD_GIST_SUCCESS:
      return {
        ...state,
        loading: false,
        gist: action.payload,
        editorMode: 'view',
        selected: true,
      };
    case 'SET_GIST_EDIT_MODE':
      return {
        ...state,
        editorMode: 'edit',
      };
    case 'DELETE_GIST':
      return {
        ...state,
        selected: false,
        loading: false,
      };
    case 'LOGOUT_USER':
      return INITIAL_STATE;
    default:
      return state;
  }
};
