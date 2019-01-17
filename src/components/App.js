import React, { Component } from 'react';
import { connect } from 'react-redux';
import { retrieveMovies } from '../actions/movies';
import Game from './Game';
import { getQuestions } from '../selectors/moviesSelectors';

class App extends Component {
  componentDidMount() {
    this.props.retrieveMovies();
  }
  render() {
    return (
      <div className="text-center mt-5">
        <Game questions={this.props.questions} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies,
  questions: getQuestions(state)
});

const mapDispatchToProps = {
  retrieveMovies
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
