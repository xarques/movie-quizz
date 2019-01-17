import { createSelector } from 'reselect';

export const getQuestions = createSelector(
  state => state.movies,
  movies =>
    movies.map(movie => ({
      movie: movie.Title,
      actor: movie.Actors[0],
      poster: movie.Poster,
      answer: 'YES'
    }))
);
