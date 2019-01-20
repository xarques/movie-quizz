import { combineReducers } from 'redux';
import actors from './actors';
import movies from './movies';
import * as quizz from './quizz';

export default combineReducers({
  movies,
  actors,
  ...quizz
});
