import { ANSWER_QUESTION, START_QUIZZ } from '../actions/quizz';

export const quizz = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ANSWER_QUESTION:
      return {
        ...state,
        answers: [...state.answers, payload.answer],
        score: payload.question.answer === payload.answer ? state.score + 1 : state.score,
        gameState: payload.question.answer !== payload.answer ? 'GAME_OVER' : state.gameState,
      };
    case START_QUIZZ:
      return {
        gameState: 'PLAYING',
        answers: [],
        score: 0
      };
    default:
      return state;
  }
};
