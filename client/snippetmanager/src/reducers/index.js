/* eslint-disable no-unused-vars */
import { combineReducers } from 'redux';
import authReducer from './auth';

const testReducer = (state = {}, action) => state;

export default combineReducers({
  auth: authReducer,
});
