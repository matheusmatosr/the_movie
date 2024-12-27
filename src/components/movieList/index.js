import React from 'react';

const MovieList = (props) => {
  return (
    <div className="movie-list">
      {props.movies.length > 0 ? (
        props.movies.map((movie, index) => (
          <div key={index} className="movie-card">
            <div className="movie-title">{movie.Title}</div>
            <div className="movie-details">
              <div className="movie-type">Tipo: {movie.Type}</div>
              <div className="movie-year">Lançamento: {movie.Year}</div>
            </div>
            <img src={movie.Poster} alt={movie.Title} />
          </div>
        ))
      ) : (
        <h4 className="movie-nothing">Nenhum filme encontrado</h4>
      )}
    </div>
  );
};

export default MovieList;
