import React, { Component } from 'react';
import { connect } from 'react-redux';
import { answerQuestion, startQuizz } from '../actions/quizz';
import Quizz from './Quizz';
import Header from './Header';

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

  restartQuizz = () => {
    this.setState({ questionIndex: 0 });
    this.props.startQuizz();
  };

  render() {
    const {
      quizz: { gameState, score }
    } = this.props;
    if (gameState === 'INIT') {
      return (
        <Header
          onClick={() => this.restartQuizz()}
          buttonLabel={'PLAY'}
        >WELCOME TO THE MOVIE QUIZZ
        </Header>
      );
    } else if (gameState === 'GAME_OVER') {
      return (
        <Header
          onClick={() => this.restartQuizz()}
          score={score}
          buttonLabel={'PLAY AGAIN'}
        >
          GAME OVER
        </Header>
      );
    }
    const nextQuestion = this.nextQuestion();
    if (!nextQuestion) {
      return (
        <Header
          onClick={() => this.restartQuizz()}
          score={score}
          buttonLabel={'PLAY AGAIN'}
        >
          YOU WON
        </Header>
      );
    } else
      return (
        <div>
          <Header score={score} />
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
