import { getMovies } from '../utils/movieAPI';
import { normalize } from '../normalizers/moviesNormalizer';
export const RETRIEVE_MOVIES = 'RETRIEVE_MOVIES';
export const MOVIES_RETRIEVED = 'MOVIES_RETRIEVED';

export const retrieveMovies = () => dispatch => {
  dispatch({ type: RETRIEVE_MOVIES });
  return getMovies().then(movies => dispatch(moviesRetrieved(normalize(movies))));
};

const moviesRetrieved = movies => ({
  type: MOVIES_RETRIEVED,
  payload: movies
});
