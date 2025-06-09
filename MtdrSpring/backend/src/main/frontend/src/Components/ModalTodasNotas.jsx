import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import '../Assets/ModalTodasNotas.css';

const ModalTodasNotas = ({ doctorId, onClose }) => {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!doctorId) return;
    fetch(`/notes/user/${doctorId}`)
      .then(res => res.json())
      .then(data => {
        setNotas(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [doctorId]);

  return ReactDOM.createPortal(
    <div className="modal-bg">
      <div className="modal-card modal-todas-notas-card">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-title">Todas las Notas</h2>
        <div className="notas-list-container">
          {loading ? (
            <div className="modal-loading">Cargando...</div>
          ) : notas.length === 0 ? (
            <div className="modal-error">No hay notas registradas.</div>
          ) : (
            <ul className="notas-list">
              {notas.map(note => (
                <li key={note.id} className="nota-item">
                  <div className="nota-titulo">{note.title}</div>
                  <div className="nota-desc">{note.description}</div>
                  <div className="nota-fecha">
                    {note.date ? new Date(note.date).toLocaleDateString('es-MX') : ''}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalTodasNotas;