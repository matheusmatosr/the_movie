import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RatingForm from '../components/ratingForm';
import '../style/favoritos.css';

function Favoritos() {
  const [filmes, setFilmes] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/favorites');
      const data = await response.json();
      setFilmes(data);
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error);
    }
  };

  const excluirFilme = async (imdbID) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/favorites/${imdbID}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setFilmes(filmes.filter((item) => item.imdbID !== imdbID));
        alert('Filme removido dos favoritos!');
      }
    } catch (error) {
      console.error('Erro ao excluir filme:', error);
    }
  };

  return (
    <div className="meus-filmes">
      <h1>Meus filmes favoritos</h1>
      {filmes.length === 0 && <span>Ops, você não tem nenhum filme salvo :(</span>}
      <ul>
        {filmes.map((item) => (
          <li key={item.imdbID}>
            <span>{item.title}</span>
            <div>
              <button onClick={() => setSelectedMovie(item)} className="buttonAvaliar">Avaliar</button>
              <button onClick={() => excluirFilme(item.imdbID)} className="buttonExcluir">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
      {selectedMovie && (
        <RatingForm 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
      <Link className="buttonEscolher" to="/">Escolher</Link>
    </div>
  );
}

export default Favoritos;
