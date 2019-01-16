import { combineReducers } from "redux";
import {
  RETRIEVE_MOVIES,
  MOVIES_RETRIEVED
} from "../actions/movies";

const movies = (state = [], action) => {
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

const loading = (state = false, action) => action.type === RETRIEVE_MOVIES

export default combineReducers({
  movies,
  loading
});