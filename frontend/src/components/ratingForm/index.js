import { useState, useEffect } from 'react';
import '../../style/form.css';

function RatingForm({ movie, onClose }) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/reviews/${movie.id}`);
        if (response.ok) {
          const data = await response.json();
          setName(data.name);
          setRating(data.rating);
          setComment(data.comment);
        }
      } catch (error) {
        console.error('Erro ao buscar avaliação:', error);
      }
    };

    fetchReview();
  }, [movie]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = { favorite_id: movie.id, name, rating, comment };

    try {
      const response = await fetch(`http://127.0.0.1:5000/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
      });
      if (response.ok) {
        alert('Avaliação salva com sucesso!');
        onClose();
      }
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error);
    }
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
            <button type="submit" className="submit-button">
              Salvar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RatingForm;
