import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import '../Assets/DashboardNotas.css';
import { UserContext } from '../Contexts/userContext';
import ModalAgregarNino from './ModalAgregarNino';
import ModalTodasNotasChild from './ModalTodasNotasChild'; // Importa el modal para ver todas las notas

const DashboardNotas = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, setUserId } = useContext(UserContext);
  const [children, setChildren] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [recentNotas, setRecentNotas] = useState([]);
  const [showNotasModal, setShowNotasModal] = useState(false);

  useEffect(() => {
    fetch('/userchildren/summary')
      .then(res => res.json())
      .then(data => setChildren(data))
      .catch(() => setChildren([]));
  }, []);

  useEffect(() => {
    if (userId) {
      fetch(`/userchild/${userId}`)
        .then(res => res.json())
        .then(data => setUserInfo(data))
        .catch(() => setUserInfo(null));
      fetch(`/notes/child/recent/${userId}`)
        .then(res => res.json())
        .then(data => setRecentNotas(Array.isArray(data) ? data : []))
        .catch(() => setRecentNotas([]));
    } else {
      setUserInfo(null);
      setRecentNotas([]);
    }
  }, [userId]);

  const handleSelect = (e) => {
    const selectedId = e.target.value ? parseInt(e.target.value) : null;
    setUserId(selectedId);
  };

  const handleLogout = () => {
    setUserId(null);
    navigate('/');
  };

  function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date)) return '-';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const refreshChildren = () => {
    fetch('/userchildren/summary')
      .then(res => res.json())
      .then(data => setChildren(data))
      .catch(() => setChildren([]));
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="title-subtitle">
          <h1 className="title">Juntos en el Desarrollo</h1>
          <p className="subtitle">
            Lleva el seguimiento de los Hitos de desarrollo de tu hijo(a).
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            className={`nav-btn${location.pathname === '/hitosDashboard' ? ' nav-btn-active' : ''}`}
            onClick={() => navigate('/hitosDashboard')}
          >
            Hitos
          </button>
          <button
            className="nav-btn"
            onClick={() => navigate('/registro-crecimiento')}
          >
            Registro de Crecimiento
          </button>
          <button
            className="nav-btn"
            onClick={() => navigate('/graficas-dashboard')}
          >
            Gráficas de crecimiento
          </button>

          <button
            className="nav-btn"
            onClick={() => navigate('/notas-medicas')}
          >
            Notas Médicas
          </button>
          <button
            className="btn-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="profile-bar">
        <select className="profile-select" value={userId || ''} onChange={handleSelect}>
          <option value="">Selecciona un niño</option>
          {children.map(child => (
            <option key={child.id} value={child.id}>
              {child.name}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Agregar Niño</button>
      </div>
      <ModalAgregarNino
        show={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={refreshChildren}
      />

      <div className="dashboardnotas-cards-row">
        <div className="dashboardnotas-card">
          <h3>Información del infante</h3>
          {userInfo ? (
            <ul>
              <li><strong>Nombre:</strong> {userInfo.name ?? '-'}</li>
              <li><strong>Peso Actual:</strong> {userInfo.weight ?? '-'} kg</li>
              <li><strong>Altura Actual:</strong> {userInfo.height ?? '-'} cm</li>
              <li><strong>Edad:</strong> {userInfo.age ?? '-'} meses</li>
              <li><strong>Fecha de Nacimiento:</strong> {formatDate(userInfo?.dateOfBirth)}</li>
              <li><strong>Sexo:</strong> {userInfo.gender ?? '-'}</li>
            </ul>
          ) : (
            <ul>
              <li><strong>Nombre:</strong> -</li>
              <li><strong>Peso Actual:</strong> - kg</li>
              <li><strong>Altura Actual:</strong> - cm</li>
              <li><strong>Edad:</strong> - meses</li>
              <li><strong>Fecha de Nacimiento:</strong> -</li>
              <li><strong>Sexo:</strong> -</li>
            </ul>
          )}
          <button className="dashboardnotas-btn-outline" onClick={() => navigate('/graficas-dashboard')}>
            Ver Gráficas de Crecimiento
          </button>
        </div>

        <div className="dashboardnotas-large-card">
          <h3>Historial de Notas</h3>
          <ul className="dashboardnotas-notas-list">
            {recentNotas.length === 0 && <li>No hay notas recientes.</li>}
            {recentNotas.map(nota => (
                <li key={nota.id} className="dashboardnotas-nota-item">
                    <span className="dashboardnotas-nota-title">{nota.title}</span>
                    <span className="dashboardnotas-nota-desc">
                        {nota.description.length > 20
                            ? nota.description.slice(0, 20) + '...'
                            : nota.description}
                    </span>
                    <span className="dashboardnotas-nota-fecha">
                        {nota.date ? formatDate(nota.date) : ''}
                    </span>
                </li>
   ))}
          </ul>
          <button className="dashboardnotas-btn-outline" onClick={() => setShowNotasModal(true)}>
            Ver todas las notas
          </button>
          {showNotasModal && (
            <ModalTodasNotasChild
              onClose={() => setShowNotasModal(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardNotas;