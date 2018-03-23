import axios from 'axios';

import { LOAD_GIST_PENDING, LOAD_GIST_SUCCESS, LOAD_GIST_FAILED, SET_GIST_EDIT_MODE } from './actionTypes';

const loadGistPending = () => ({
  type: LOAD_GIST_PENDING,
});
const loadGistSuccess = gist => ({
  type: LOAD_GIST_SUCCESS,
  payload: gist,
});
const loadGistFail = err => ({
  type: LOAD_GIST_FAILED,
  error: err,
});

export const setGistEditMode = () => ({
  type: SET_GIST_EDIT_MODE,
});

export const loadGist = gistId => (dispatch) => {
  dispatch(loadGistPending());
  axios.get(`/api/gist/${gistId}`)
    .then((res) => {
      const gist = res.data;
      dispatch(loadGistSuccess(gist));
    })
    .catch((err) => {
      dispatch(loadGistFail(err));
    });
};

