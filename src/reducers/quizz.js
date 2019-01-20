import {
  ANSWER_QUESTION,
  RETRIEVE_QUESTIONS,
  QUESTIONS_RETRIEVED
} from '../actions/quizz';

export const quizz = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case QUESTIONS_RETRIEVED:
      return {
        ...state,
        gameState: 'PLAYING',
        questions: payload
      };
    case RETRIEVE_QUESTIONS: {
      return {
        questions: [],
        gameState: 'INIT',
        answers: [],
        score: 0
      };
    }
    case ANSWER_QUESTION:
      return {
        ...state,
        answers: [...state.answers, payload.answer],
        score:
          payload.question.answer === payload.answer
            ? state.score + 1
            : state.score,
        gameState:
          payload.question.answer !== payload.answer
            ? 'GAME_OVER'
            : state.gameState
      };
    default:
      return state;
  }
};
