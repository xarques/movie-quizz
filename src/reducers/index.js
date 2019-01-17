import { combineReducers } from 'redux';
import * as movies from './movies';
import * as quizz from './quizz';

export default combineReducers({
  ...movies,
  ...quizz
});
