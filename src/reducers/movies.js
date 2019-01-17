import {
  RETRIEVE_MOVIES,
  MOVIES_RETRIEVED
} from "../actions/movies";

export  const movies = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case RETRIEVE_MOVIES:
      return []
    case MOVIES_RETRIEVED:
      return payload;
    default:
      return state;
  }
};

export const loading = (state = false, action) => action.type === RETRIEVE_MOVIES