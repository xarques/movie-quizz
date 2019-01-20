import React, {Component} from 'react';
import './Timer.css';

class Timer extends Component {
  render() {
    return <div className="segment7">{this.props.seconds}</div>
  }
}

export default Timer;