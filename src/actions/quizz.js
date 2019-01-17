export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const START_QUIZZ = 'START_QUIZZ';

export const answerQuestion = (question, answer) => ({
  type: ANSWER_QUESTION,
  payload: { question, answer }
});

export const startQuizz = () => ({
  type: START_QUIZZ
});

