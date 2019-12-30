import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_PIPELINE,
  GET_PIPELINES
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  pipelines: [],
  pipeline: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case GET_PIPELINES:
      return {
        ...state,
        pipelines: action.payload,
        loading: false
      };
    case GET_PIPELINE:
      return {
        ...state,
        pipeline: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
