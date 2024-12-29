import React from 'react';

const MovieList = (props) => {

  const addToFavorites = async (movie) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
      });
      if (response.ok) {
        alert('Filme adicionado aos favoritos!');
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error('Erro ao adicionar filme:', error);
    }
  };
 
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
            <div className="card-footer">
              <button className="add-button" onClick={() => addToFavorites(movie)}>Adicionar</button>
            </div>
          </div>
        ))
      ) : (
        <h4 className="movie-nothing">Nenhum filme encontrado</h4>
      )}
    </div>
  );
};

export default MovieList;
