import axios from "axios";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PIPELINES,
  GET_PIPELINE
} from "./types";

//Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading);
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

//Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading);
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

//Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Add Movie
export const addMovies = (movieData, history) => dispatch => {
  axios
    .post("/api/profile/movies", movieData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Add Books
export const addBooks = (bookData, history) => dispatch => {
  axios
    .post("/api/profile/books", bookData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete Movie
export const deleteMovie = id => dispatch => {
  axios
    .delete(`/api/profile/movies/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete Book
export const deleteBook = id => dispatch => {
  axios
    .delete(`/api/profile/books/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

//Delete Account
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be reversed.")) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

//Views Pipelines
export const viewPipelines = () => dispatch => {
  fetch(`http://192.168.2.135:32784/rest/v1/pipelines`, {
    headers: new Headers({
      Authorization: "Basic " + Buffer.from("admin:admin").toString("base64")
    })
  })
    .then(res => res.json())
    .then(pipelines =>
      dispatch({
        type: GET_PIPELINES,
        payload: pipelines
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

//View a Pipeline by Pipeline Id
export const viewPipeline = () => dispatch => {
  fetch(
    `http://192.168.2.135:32784/rest/v1/pipeline/RESTAPIPOCbbee1180-a38b-4858-9a4b-b95f0fd89e69/status`,
    {
      headers: new Headers({
        Authorization: "Basic " + Buffer.from("admin:admin").toString("base64")
      })
    }
  )
    .then(res => res.json())
    .then(pipeline =>
      dispatch({
        type: GET_PIPELINE,
        payload: pipeline
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

//Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
