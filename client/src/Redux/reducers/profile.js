import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from "../actionTypes";

const initialState = {
  profile: null,
  profiles: [],
  posts: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        posts: [],
        loading: true,
      };
    default:
      return state;
  }
}