import React from 'react';

const PlayButton = (props) => {
  return <button className="btn btn-primary" onClick={props.onClick}>{props.children}</button>;
};

export default PlayButton;