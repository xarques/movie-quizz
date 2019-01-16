import React, { Component } from 'react';
import { connect } from "react-redux";
import {retrieveMovies} from "../actions/movies"
import Game from './Game';

class App extends Component {
  componentDidMount() {
    this.props.retrieveMovies();
  }
  render() {
    const questions = [
      {
        movie: 'Rocky 1',
        actor: 'Sylvester Stalone',
        answer: 'YES'
      },
      {
        movie: 'Pulp Fiction',
        actor: 'Meryl Streep',
        answer: 'NO'
      }
    ];

    return <Game questions={questions}/>;
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies
});

const mapDispatchToProps = {
  retrieveMovies: retrieveMovies
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
