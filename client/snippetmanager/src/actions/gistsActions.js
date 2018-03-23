
import axios from 'axios';

import { GISTS_FETCH_SIZE } from './constants';

import { LOAD_GISTS_SUCCESS, LOAD_GISTS_FAILED, LOAD_GISTS_PENDING } from './actionTypes';

export const loadGistsPending = () => ({
  type: LOAD_GISTS_PENDING,
});

export const loadGistsSuccess = gists => ({
  type: LOAD_GISTS_SUCCESS,
  payload: gists,
});

export const loadGistsFailed = err => ({
  type: LOAD_GISTS_FAILED,
  error: err,
});

export const loadGists = () => (dispatch, getState) => {
  dispatch(loadGistsPending());
  const { page } = getState().gists;
  axios.get(`/api/gists/${page}/${GISTS_FETCH_SIZE}`)
    .then((res) => {
      const gists = res.data;
      dispatch(loadGistsSuccess(gists));
    })
    .catch((err) => {
      dispatch(loadGistsFailed(err));
    });
};
