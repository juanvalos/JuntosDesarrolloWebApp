import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { UserContext } from '../Contexts/userContext';
import '../Assets/ModalTodosHitos.css';

const ModalTodosHitos = ({ onClose }) => {
  const { userId } = useContext(UserContext);
  const [hitos, setHitos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetch(`/hitos/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        setHitos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  return ReactDOM.createPortal(
    <div className="modal-bg">
      <div className="modal-card hitos-modal-card">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-title">Todos los Hitos</h2>
        <div className="hitos-list-container">
          {loading ? (
            <div className="modal-loading">Cargando...</div>
          ) : hitos.length === 0 ? (
            <div className="modal-error">No hay hitos registrados.</div>
          ) : (
            <ul className="hitos-list">
              {hitos.map(hito => (
                <li key={hito.id} className="hito-item">
                  <strong>{hito.category}:</strong> {hito.description}
                  <span className="hito-date">
                    {hito.date ? new Date(hito.date).toLocaleDateString('es-MX') : ''}
                  </span>
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

export default ModalTodosHitos;