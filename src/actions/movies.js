import {getMovies} from '../utils/movieAPI';

export const RETRIEVE_MOVIES = 'RETRIEVE_MOVIES';
export const MOVIES_RETRIEVED = 'MOVIES_RETRIEVED';

export const retrieveMovies = () => dispatch => {
  dispatch({ type: RETRIEVE_MOVIES });
  return getMovies().then(movies => {
    return dispatch(moviesRetrieved(movies));
  });
};

const moviesRetrieved = movies => ({
  type: MOVIES_RETRIEVED,
  payload: movies
});
