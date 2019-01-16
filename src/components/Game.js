import React, { Component } from 'react';
import Quizz from './Quizz';
class Game extends Component {
  state = {
    gameState: 'INIT',
    timer: 0,
    score: 0,
    index: 0
  };

  initGame() {
    this.setState({ gameState: 'PLAY', score: 0, timer: 0, index: 0 });
  }

  handleClick() {
    this.initGame();
  }

  handleAnswer = answer => {
    if (this.props.questions[this.state.index].answer !== answer) {
      this.setState({ gameState: 'GAME_OVER' });
    } else {
      this.setState(state => ({
        score: ++state.score,
        index: ++state.index
      }));
    }
  };

  nextQuestion = () => {
    return this.state.index > this.props.questions.size ? this.props.questions[this.state.index] : {};
  };

  render() {
    const { gameState, score } = this.state;
    if (gameState === 'INIT') {
      return <button onClick={() => this.handleClick('PLAY')}>PLAY</button>;
    } else if (gameState === 'GAME_OVER') {
      return (
        <div>
          <h1>Your score: {score}</h1>
          <h1>GAME OVER</h1>
          <button onClick={() => this.handleClick('GAME_OVER')}>
            PLAY AGAIN
          </button>
        </div>
      );
    }
    console.log('Questions length', this.props.questions.length);
    console.log('index', this.state.index);
    if (this.props.questions.size === this.state.index) {
      return <h1>YOU WON </h1>;
    } else
      return (
        <div>
          <h1>Your score: {score}</h1>
          <Quizz onClick={this.handleAnswer} question={this.nextQuestion()} />
        </div>
      );
  }
}

export default Game;
