import React, { Component } from 'react';
import { connect } from 'react-redux';
import { answerQuestion, startQuizz } from '../actions/quizz';
import Quizz from './Quizz';

class Game extends Component {
  state = {
    questionIndex: 0
  };

  handleAnswer = answer => {
    this.props.answerQuestion(
      this.props.questions[this.props.quizz.score],
      answer
    );
    this.setState(state => ({ questionIndex: state.questionIndex + 1 }));
  };

  nextQuestion = () => {
    if (this.state.questionIndex < this.props.questions.length) {
      return this.props.questions[this.state.questionIndex];
    } else {
      return null;
    }
  };

  restartQuizz  = () => {
    this.setState({questionIndex : 0});
    this.props.startQuizz();
  }

  render() {
    const {
      quizz: { gameState, score }
    } = this.props;
    if (gameState === 'INIT') {
      return <button onClick={() => this.restartQuizz()}>PLAY</button>;
    } else if (gameState === 'GAME_OVER') {
      return (
        <div>
          <h1>Your score: {score}</h1>
          <h1>GAME OVER</h1>
          <button onClick={() => this.restartQuizz()}>PLAY AGAIN</button>
        </div>
      );
    }
    const nextQuestion = this.nextQuestion();
    if (!nextQuestion) {
      return (
        <div>
          <h1>YOU WON </h1>
          <h1>Your score: {score}</h1>
          <button onClick={() => this.restartQuizz()}>PLAY AGAIN</button>
        </div>
      );
    } else
      return (
        <div>
          <h1>Your score: {score}</h1>
          <Quizz onClick={this.handleAnswer} question={nextQuestion} />
        </div>
      );
  }
}

const mapStateToProps = state => ({
  quizz: state.quizz
});

const mapDispatchToProps = {
  answerQuestion,
  startQuizz
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
