import React from 'react';

const Quizz = (props) => {
    return(
      <div>
        <div className="movieImage">
          <h2>Movie {props.question.movie}</h2>
        </div>
        <div className="movieActor">
          <h2>Actor {props.question.actor}</h2>
        </div>
        <button onClick={() => props.onClick("YES")}>YES</button>
        <button onClick={() => props.onClick("NO")}>NO</button>
      </div>
    )
}

export default Quizz;