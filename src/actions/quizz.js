export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const START_QUIZZ = 'START_QUIZZ';
export const RETRIEVE_QUESTIONS = 'RETRIEVE_QUESTIONS';
export const QUESTIONS_RETRIEVED = 'QUESTIONS_RETRIEVED';

export const answerQuestion = (question, answer) => ({
  type: ANSWER_QUESTION,
  payload: { question, answer }
});

export const startQuizz = () => ({
  type: START_QUIZZ
});

const getRandomActorIndex = actorIds =>
  Math.floor(Math.random() * actorIds.length);

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
  let allActorIds = [...state.actors.allIds];
  return movies.map(movie => {
    const randomActorIndex = getRandomActorIndex(allActorIds);
    const actor = state.actors.byId[allActorIds[randomActorIndex]];
    allActorIds.splice(randomActorIndex, 1);
    return {
      movie: movie.title,
      actor: actor.name,
      poster: movie.poster,
      answer: isActorInMovie(state, actor.id, movie.id)
    };
  });
};