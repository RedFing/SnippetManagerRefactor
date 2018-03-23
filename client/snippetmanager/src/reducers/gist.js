import {
  LOAD_GIST_PENDING, LOAD_GIST_SUCCESS, SET_GIST_EDIT_MODE, SET_GIST_ADD_MODE, DELETE_GIST_SUCCESS,
  CANCEL_GIST_EDIT_MODE, DELETE_GIST_PENDING, EDIT_GIST_PENDING, ADD_GIST_SUCCESS, ADD_GIST_PENDING, EDIT_GIST_SUCCESS,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  selected: false,
  loading: false,
  gist: {},
  editorMode: 'view',
  deletePending: false,
  editPending: false,
  addPending: false,
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
    case CANCEL_GIST_EDIT_MODE:
      return {
        ...state,
        editorMode: 'view',
      };
    case DELETE_GIST_PENDING:
      return {
        ...state,
        deletePending: true,
      };
    case EDIT_GIST_PENDING:
      return {
        ...state,
        editPending: true,
      };
    case ADD_GIST_PENDING:
      return {
        ...state,
        addPending: true,
      };
    case DELETE_GIST_SUCCESS:
      return INITIAL_STATE;
    case ADD_GIST_SUCCESS:
      return INITIAL_STATE;
    case EDIT_GIST_SUCCESS:
      return INITIAL_STATE;
    case 'LOGOUT_USER':
      return INITIAL_STATE;
    default:
      return state;
  }
};
