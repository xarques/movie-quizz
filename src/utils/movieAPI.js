const API_KEY = 'a0acf48d85383e412e1e53f18b225c6a';
const ROOT_URL = 'https://api.themoviedb.org/3';
const IMAGE_ROOT_URL = 'https://image.tmdb.org';
const DISCOVER_MOVIE_ROOT_URL = `${ROOT_URL}/discover/movie`;
const DISCOVER_MOVIE_URL = `${DISCOVER_MOVIE_ROOT_URL}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
const MOVIE_CREDITS_URL = movieId =>
  `${ROOT_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;

const IMAGE_W500_ROOT_URL = `${IMAGE_ROOT_URL}/t/p/w500`;

export const getMovies = () => {
  return getMoviesFromMovieDB();
};

const getMoviesFromMovieDB = () => {
  return fetch(DISCOVER_MOVIE_URL)
    .then(result => result.json())
    .then(data => {
      return normalizeMovies(data);
    });
};

const normalizeMovies = moviesFromMovieDB => {
  const { results: movies } = moviesFromMovieDB;
  const actorsPromises = movies.map(movie => getActors(movie.id));
  return Promise.all(actorsPromises).then(actors => {
    return movies.map((movie, index) => ({
      id: movie.id,
      title: movie.title,
      //  Return only the 2 first actors in order to limit the number of combinations for questions
      actors: actors[index].slice(0,2),
      poster: `${IMAGE_W500_ROOT_URL}${movie.poster_path}`
    }));
  });
};

export const getActors = movieId => {
  return fetch(MOVIE_CREDITS_URL(movieId))
    .then(result => result.json())
    .then(data => {
      return normalizeActors(data);
    });
};

const normalizeActors = actorsFromMovieDB => {
  const { cast: actors } = actorsFromMovieDB;
  return actors;
};
