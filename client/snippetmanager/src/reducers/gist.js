import { LOAD_GIST_PENDING, LOAD_GIST_SUCCESS, SET_GIST_EDIT_MODE, SET_GIST_ADD_MODE } from '../actions/actionTypes';

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
    case SET_GIST_EDIT_MODE:
      return {
        ...state,
        editorMode: 'edit',
      };
    case SET_GIST_ADD_MODE:
      return {
        ...INITIAL_STATE,
        editorMode: 'add',
      };
    case 'LOGOUT_USER':
      return INITIAL_STATE;
    default:
      return state;
  }
};
