import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/favoritos.css';

function Favoritos(){
  const [ filmes, setFilmes ] = useState([]);
 
  function excluirFilme(id){
    let filtroFilmes = filmes.filter((item) => {
      return (item.id !== id)
    })
    setFilmes(filtroFilmes);
  }

  return(
    <div className='meus-filmes'>
      <h1>Meus filmes favotiros</h1>
      {filmes.length === 0 && <span>Ops, você não tem nenhum filme salvo :( </span>}
      <ul>
        {filmes.map((item) => {
          return(
            <li key={item.id}>
              <span>{item.title}</span>
              <div>
                <Link to={`/filme/${item.id}`}>Detalhes</Link>
                <button onClick={() => excluirFilme(item.id)} className="buttonExcluir">Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
      <Link className='buttonEscolher' to="/">Escolher</Link>
    </div>
  )
}

export default Favoritos;