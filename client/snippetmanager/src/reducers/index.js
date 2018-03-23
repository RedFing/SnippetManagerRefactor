/* eslint-disable no-unused-vars */
import { combineReducers } from 'redux';
import authReducer from './auth';
import gistsReducer from './gists';
import gistReducer from './gist';

const testReducer = (state = {}, action) => state;

export default combineReducers({
  auth: authReducer,
  gists: gistsReducer,
  gist: gistReducer,
});
