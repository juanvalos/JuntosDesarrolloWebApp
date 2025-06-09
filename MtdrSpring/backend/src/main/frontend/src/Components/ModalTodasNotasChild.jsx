import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import '../Assets/ModalTodasNotas.css';
import { UserContext } from '../Contexts/userContext';

const ModalTodasNotasChild = ({ onClose }) => {
  const { userId } = useContext(UserContext);
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    fetch(`/notes/child/${userId}`)
      .then(res => res.json())
      .then(data => {
        setNotas(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date)) return '-';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

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
                  <div className="nota-desc" title={note.description}>
                    {note.description.length > 80
                      ? note.description.slice(0, 80) + '...'
                      : note.description}
                  </div>
                  <div className="nota-fecha">
                    {note.date ? formatDate(note.date) : ''}
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

export default ModalTodasNotasChild;