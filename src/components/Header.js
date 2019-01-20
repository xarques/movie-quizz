import React from 'react';
import PlayButton from './PlayButton';
import Timer from './Timer';

const Header = ({seconds, score, onClick, buttonLabel, children}) => {
  return (
    <div>
      <Timer seconds={seconds}/>
      {children && <h1>{children}</h1>}
      {score !== undefined && <h1>Your score: {score}</h1>}
      {buttonLabel && <PlayButton onClick={onClick}>{buttonLabel}</PlayButton>}
    </div>
  );
};

export default Header;