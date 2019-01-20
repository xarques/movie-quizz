import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import { retrieveQuestions } from './quizz';
import thunk from 'redux-thunk';

const onStoreChange = store => expectationsFn => done => {
  store.subscribe(() => {
    setTimeout(() => {
      expectationsFn();
      done();
    }, 1000)
  });
};

const assertQuizzQuestionsEqualStoreChange = store => expected => done => {
  onStoreChange(store)(() => {
    expect(store.getState().quizz.questions).toEqual(expected);
  })(done);
};

const assertQuizzQuestionsEqualOrStoreChange = store => (expected1, expected2) => done => {
  onStoreChange(store)(() => {
    const received = JSON.stringify(store.getState().quizz.questions.sort((a,b)  => a.movie < b.movie ? -1: 1));
    console.log('questions', received)
    expect(
      received === expected1 || received === expected2
    ).toBeTruthy();
  })(done);
};

export function dispatchAction(store) {
  return action => store.dispatch(action);
}

describe('Questions retrieval', () => {
  describe('Only one movie with one actor is available', () => {
    it('should retrieve the movie, actor and answer "Yes"', done => {
      const initState = {
        movies: {
          byId: {
            '1': {
              id: 1,
              title: 'Aquaman',
              actors: [2]
            }
          },
          allIds: [1]
        },
        actors: {
          byId: {
            '2': { id: 2, name: 'Jason Momoa' }
          },
          allIds: [2]
        }
      };

      const store = createStore(reducers, initState, applyMiddleware(thunk));
      const expected = [
        { movie: 'Aquaman', actor: 'Jason Momoa', answer: 'YES' }
      ];
      assertQuizzQuestionsEqualStoreChange(store)(expected)(done);
      dispatchAction(store)(retrieveQuestions());
    });
  });

  describe('Only two movies with two actor are available', () => {
    it('should retrieve a list of movie, actor and the same response (Yes or No) ', (done) => {
      const initState = {
        movies: {
          byId: {
            '1': {
              id: 1,
              title: 'Aquaman',
              actors: [3]
            },
            '2': {
              id: 2,
              title: 'Bumblebee',
              actors: [4]
            }
          },
          allIds: [1, 2]
        },
        actors: {
          byId: {
            '3': { id: 3, name: 'Jason Momoa' },
            '4': { id: 4, name: 'Hailee Steinfeld' }
          },
          allIds: [3, 4]
        }
      };

      const store = createStore(reducers, initState, applyMiddleware(thunk));
      const expectedIfYes = JSON.stringify([
        { movie: 'Aquaman', actor: 'Jason Momoa', answer: 'YES' },
        { movie: 'Bumblebee', actor: 'Hailee Steinfeld', answer: 'YES' }
      ]);
      const expectedIfNo = JSON.stringify([
        { movie: 'Aquaman', actor: 'Hailee Steinfeld', answer: 'NO' },
        { movie: 'Bumblebee', actor: 'Jason Momoa', answer: 'NO' }
      ]);

      assertQuizzQuestionsEqualOrStoreChange(store)(expectedIfYes, expectedIfNo)(done);
      dispatchAction(store)(retrieveQuestions());
    });
  });
});
