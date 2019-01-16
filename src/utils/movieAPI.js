import {movies} from "../data/movies-imdb";

export const getMovies = () => {
  return new Promise((resolve, reject) => {
    resolve(movies);
  })
}