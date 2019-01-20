import React, { Component } from 'react';
import { connect } from 'react-redux';
import { retrieveQuestions, answerQuestion } from '../actions/quizz';
import Question from './Question';
import Header from './Header';

class Game extends Component {
  state = {
    questionIndex: 0,
    elapsed: 0
  };

  componentWillUnmount() {
    this.stopTimer();
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({ elapsed: new Date() - this.props.quizz.start });
  }

  handleAnswer = answer => {
    this.props.answerQuestion(
      this.props.quizz.questions[this.props.quizz.score],
      answer
    );
    this.setState(state => ({ questionIndex: state.questionIndex + 1 }));
  };

  nextQuestion = () => {
    if (this.state.questionIndex < this.props.quizz.questions.length) {
      return this.props.quizz.questions[this.state.questionIndex];
    } else {
      return null;
    }
  };

  restartQuizz = () => {
    this.setState({ questionIndex: 0, elapsed: 0 });
    this.props.retrieveQuestions();
    this.timer = setInterval(() => this.tick(), 50);
  };

  render() {
    const {
      quizz: { gameState, score }
    } = this.props;
    const elapsed = Math.round(this.state.elapsed / 100);
    const seconds = (elapsed / 10).toFixed(1);
    if (gameState === 'INIT') {
      return (
        <Header onClick={() => this.restartQuizz()} buttonLabel={'PLAY'}>
          WELCOME TO THE MOVIE QUIZZ
        </Header>
      );
    } else if (gameState === 'GAME_OVER') {
      this.stopTimer();
      return (
        <Header
          onClick={() => this.restartQuizz()}
          seconds={seconds}
          score={score}
          buttonLabel={'PLAY AGAIN'}
        >
          GAME OVER
        </Header>
      );
    }
    const nextQuestion = this.nextQuestion();
    if (!nextQuestion) {
      this.stopTimer();
      return (
        <Header
          onClick={() => this.restartQuizz()}
          seconds={seconds}
          score={score}
          buttonLabel={'PLAY AGAIN'}
        >
          YOU WON
        </Header>
      );
    } else {
      return (
        <div>
          <Header score={score} seconds={seconds} />
          <Question onClick={this.handleAnswer} question={nextQuestion} />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  quizz: state.quizz
});

const mapDispatchToProps = {
  retrieveQuestions,
  answerQuestion
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
