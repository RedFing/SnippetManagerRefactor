import axios from 'axios';
import { toast } from 'react-toastify';

import {
  LOAD_GIST_PENDING, LOAD_GIST_SUCCESS, LOAD_GIST_FAILED, SET_GIST_EDIT_MODE,
  CANCEL_GIST_EDIT_MODE, SET_GIST_ADD_MODE, DELETE_GIST_PENDING, DELETE_GIST_FAILED,
  DELETE_GIST_SUCCESS, EDIT_GIST_PENDING, EDIT_GIST_FAILED, EDIT_GIST_SUCCESS,
  ADD_GIST_PENDING, ADD_GIST_SUCCESS, ADD_GIST_FAILED,
} from './actionTypes';

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
export const setGistAddMode = () => ({
  type: SET_GIST_ADD_MODE,
});
export const cancelGistEditMode = () => ({
  type: CANCEL_GIST_EDIT_MODE,
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

export const deleteGistPending = () => ({
  type: DELETE_GIST_PENDING,
});

export const deleteGistFailed = err => ({
  type: DELETE_GIST_FAILED,
  error: err,
});

export const deleteGistSuccess = gistId => ({
  type: DELETE_GIST_SUCCESS,
  payload: gistId,
});


export const deleteGist = () => (dispatch, getState) => {
  dispatch(deleteGistPending());
  // getGistId
  const gistId = getState().gist.gist.id;
  axios.delete(`/api/gist/${gistId}`)
    .then(() => {
      dispatch(deleteGistSuccess(gistId));
      toast('Gist was deleted successfully!');
    }).catch((err) => {
      dispatch(deleteGistFailed(err));
      toast('An error has occurred!');
    });
};

export const editGistPending = () => ({
  type: EDIT_GIST_PENDING,
});

export const editGistFailed = err => ({
  type: EDIT_GIST_FAILED,
  error: err,
});

export const editGistSuccess = (editedGist, gistId) => ({
  type: EDIT_GIST_SUCCESS,
  payload: {
    gist: editedGist,
    gistId,
  },
});

export const editGist = ({ filename, content, description }) => (dispatch, getState) => {
  dispatch(editGistPending());
  const gistId = getState().gist.gist.id;
  const oldFilename = getState().gist.gist.filename;
  axios.put(`/api/gist/${gistId}`, {
    filename, content, description, id: gistId, oldFilename,
  })
    .then((newGist) => {
      dispatch(editGistSuccess(newGist.data, gistId));
      toast(`Gist ${oldFilename} edited successfully!`);
    }).catch((err) => {
      dispatch(editGistFailed(err));
      toast('An error has occurred!');
    });
};

export const addGistPending = () => ({
  type: ADD_GIST_PENDING,
});

export const addGistSuccess = newGist => ({
  type: ADD_GIST_SUCCESS,
  payload: newGist,
});

export const addGistFailed = err => ({
  type: ADD_GIST_FAILED,
  error: err,
});

export const addGist = ({
  filename, content, description, isPrivate,
}) => (dispatch) => {
  dispatch(addGistPending());
  axios.post('/api/gist', {
    filename, description, content, isPrivate,
  })
    .then((res) => {
      const newGist = res.data;
      dispatch(addGistSuccess(newGist));
      toast(`Gist ${filename} added successfully!`);
    })
    .catch((err) => {
      dispatch(addGistFailed(err));
      toast('An error has occurred!');
    });
};
