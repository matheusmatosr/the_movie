import { useState } from 'react';
import '../../style/form.css';

function RatingForm({ movie, onClose }) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const review = {
      name,
      rating,
      comment,
      movie: movie.title,
    };

    console.log('Avaliação enviada:', review);
    alert('Avaliação salva com sucesso!');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-dialog">
        <div className="modal-header">
          <h5 className="modal-title">Avaliar Filme</h5>
          <button type="button" className="close-button" onClick={onClose}>
            Fechar
          </button>
        </div>    
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome do Avaliador</label>
              <input 
                type="text" 
                className="form-input input-large" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Filme Avaliado</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={movie.title} 
                  disabled 
                />
              </div>
              <div className="form-group">
                <label>Nota (1 a 10)</label>
                <input 
                  type="number" 
                  className="form-input input-small" 
                  value={rating} 
                  onChange={(e) => setRating(e.target.value)} 
                  min="1" 
                  max="10" 
                  required 
                />
              </div>
            </div>
            <div className="form-group">
              <label>Comentário</label>
              <textarea 
                className="form-input input-large" 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} 
                required 
              />
            </div>
          </form>
          <button type="submit" className="submit-button">Salvar</button>
        </div>
      </div>
    </div>
  );
}

export default RatingForm;
