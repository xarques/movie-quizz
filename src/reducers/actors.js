import { combineReducers } from 'redux';
import { RETRIEVE_MOVIES, MOVIES_RETRIEVED } from '../actions/movies';

const byId = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case RETRIEVE_MOVIES:
      return {};
    case MOVIES_RETRIEVED:
      return payload.entities.actors || {};
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case RETRIEVE_MOVIES:
      return [];
    case MOVIES_RETRIEVED: {
      return (payload.entities.actors && Object.keys(payload.entities.actors)) || [];
    }
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  allIds
});
