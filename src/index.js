import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import reducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const defaultState = {
  movies: {
    byId: {},
    allIds: []
  },
  actors: {
    byId: {},
    allIds: []
  },
  quizz: {
    questions: [],
    answers: [],
    score: 0,
    gameState: 'INIT',
    start: 0,
    end: 0
  }
};

const store = createStore(
  reducers,
  defaultState,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App className="container" />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
