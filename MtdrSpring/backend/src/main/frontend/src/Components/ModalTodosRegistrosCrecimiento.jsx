import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { UserContext } from '../Contexts/userContext';
import '../Assets/ModalTodosRegistrosCrecimiento.css';

function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (isNaN(date)) return '-';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const ModalTodosRegistrosCrecimiento = ({ onClose }) => {
  const { userId } = useContext(UserContext);
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetch(`/registro-crecimiento/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        setRegistros(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  return ReactDOM.createPortal(
    <div className="modal-bg">
      <div className="modal-card registros-modal-card">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-title">Todos los Registros de Crecimiento</h2>
        <div className="registros-list-container">
          {loading ? (
            <div className="modal-loading">Cargando...</div>
          ) : registros.length === 0 ? (
            <div className="modal-error">No hay registros de crecimiento.</div>
          ) : (
            <ul className="registros-list">
              {registros.map(registro => (
                <li key={registro.id} className="registro-item">
                  <span><strong>Peso:</strong> {registro.weight} kg</span>
                  <span><strong>Altura:</strong> {registro.height} cm</span>
                  <span><strong>Edad:</strong> {registro.age} meses</span>
                  <span className="registro-date">{formatDate(registro.date)}</span>
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

export default ModalTodosRegistrosCrecimiento;