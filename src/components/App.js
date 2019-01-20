import React, { Component } from 'react';
import { connect } from 'react-redux';
import { retrieveMovies } from '../actions/movies';
import Game from './Game';

class App extends Component {
  componentDidMount() {
    this.props.retrieveMovies();
  }
  render() {
    return (
      <div className="text-center mt-5">
        <Game />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies,
  };
};

const mapDispatchToProps = {
  retrieveMovies
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
