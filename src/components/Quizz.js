import React from 'react';

const Quizz = ({ question: { movie, poster, actor }, onClick }) => {
  return (
    <div className="text-center">
      <div className="text-center">
        <h2>Movie {movie}</h2>
      </div>
      <img className="rounded" src={poster} alt={movie} />
      <div className="text-center">
        <h2>Actor {actor}</h2>
      </div>
      <div class="text-center">
        <button className="btn btn-success m-3" onClick={() => onClick('YES')}>
          YES
        </button>
        <button className="btn btn-warning m-3" onClick={() => onClick('NO')}>
          NO
        </button>
      </div>
    </div>
  );
};

export default Quizz;
