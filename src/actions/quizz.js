export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const RETRIEVE_QUESTIONS = 'RETRIEVE_QUESTIONS';
export const QUESTIONS_RETRIEVED = 'QUESTIONS_RETRIEVED';

export const answerQuestion = (question, answer) => ({
  type: ANSWER_QUESTION,
  payload: { question, answer }
});

const shuffleArray = array =>
  array
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);

const getRandomInt = max => Math.floor(Math.random() * max);

const getRandomActorIndexNotInMovie = (allActorIds, movieActorIds) => {
  let actorIdsNotInMovie = allActorIds.filter(
    actorId => !movieActorIds.includes(actorId)
  );
  if (actorIdsNotInMovie.length === 0) {
    actorIdsNotInMovie = allActorIds;
  }
  const index = getRandomInt(actorIdsNotInMovie.length);
  const movieActorId = actorIdsNotInMovie[index];
  return allActorIds.findIndex(actorId => movieActorId === actorId);
};

const getRandomActorIndexInMovie = (allActorIds, movieActorIds) => {
  const actorIdsInMovie = allActorIds.filter(actorId =>
    movieActorIds.includes(actorId)
  );
  if (actorIdsInMovie.length === 0) {
    return getRandomActorIndexNotInMovie(allActorIds, movieActorIds);
  }
  const index = getRandomInt(actorIdsInMovie.length);
  const movieActorId = actorIdsInMovie[index];
  return allActorIds.findIndex(actorId => movieActorId === actorId);
};

const isActorInMovie = (state, actorId, movieId) => {
  return state.movies.byId[movieId].actors.find(id => id === actorId)
    ? 'YES'
    : 'NO';
};

export const retrieveQuestions = () => (dispatch, getState) => {
  dispatch({ type: RETRIEVE_QUESTIONS });
  return dispatch(questionsRetrieved(getQuestions(getState())));
};

const questionsRetrieved = questions => ({
  type: QUESTIONS_RETRIEVED,
  payload: questions
});

const getQuestions = state => {
  const movies = state.movies.allIds.map(id => state.movies.byId[id]);
  let allActorIds = state.actors.allIds.slice();
  let questions = movies.map((movie, index) => {
    const func =
      index % 2 ? getRandomActorIndexNotInMovie : getRandomActorIndexInMovie;
    const randomActorIndex = func(allActorIds, movie.actors);
    const actor = state.actors.byId[allActorIds[randomActorIndex]];
    allActorIds.splice(randomActorIndex, 1);
    return {
      movie: movie.title,
      actor: actor.name,
      poster: movie.poster,
      answer: isActorInMovie(state, actor.id, movie.id)
    };
  });
  // Shuffle the questions to not have a YES-NO-YES-NO... series
  return shuffleArray(questions);
};
