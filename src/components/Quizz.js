import React from 'react';

const Quizz = ({question: {movie, poster, actor}, onClick}) => {
    return(
      <div>
        <div className="movieImage">
          <h2>Movie {movie}</h2>
        </div>
        <img src={poster} alt={movie}/>
        <div className="movieActor">
          <h2>Actor {actor}</h2>
        </div>
        <button onClick={() => onClick("YES")}>YES</button>
        <button onClick={() => onClick("NO")}>NO</button>
      </div>
    )
}

export default Quizz;