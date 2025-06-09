import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Assets/HitosDashboard.css';
import '../Assets/DashboardGraficas.css';
import { UserContext } from '../Contexts/userContext';
import desarrolloAltura from '../Images/desarrolloAltura.png';
import desarrolloPeso from '../Images/desarrolloPeso.png';
import ModalGraficaPeso from './ModalGraficaPeso';
import ModalGraficaAltura from './ModalGraficaAltura';

const DashboardGraficas = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [children, setChildren] = useState([]);
  const { userId, setUserId } = useContext(UserContext);
  const [showPesoModal, setShowPesoModal] = useState(false);
  const [showAlturaModal, setShowAlturaModal] = useState(false);

  useEffect(() => {
    fetch('/userchildren/summary')
      .then(res => res.json())
      .then(data => setChildren(data))
      .catch(() => setChildren([]));
  }, []);

  const handleSelect = (e) => {
    const selectedId = e.target.value ? parseInt(e.target.value) : null;
    setUserId(selectedId);
  };

  const handleLogout = () => {
    // Aquí puedes limpiar el contexto o storage si es necesario
    setUserId(null);
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="title-subtitle">
          <h1 className="title">Gráficas de crecimiento</h1>
          <p className="subtitle">
            Visualiza el desarrollo de tu hijo(a) en altura y peso.
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
            className={`nav-btn${location.pathname === '/registro-crecimiento' ? ' nav-btn-active' : ''}`}
            onClick={() => navigate('/registro-crecimiento')}
          >
            Registro de Crecimiento
          </button>
          <button
            className={`nav-btn${location.pathname === '/graficas-dashboard' ? ' nav-btn-active' : ''}`}
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
      </div>

      <section className="charts-cards-container">
        <div className="chart-card">
          <img src={desarrolloAltura} alt="Gráfica de desarrollo de altura" className="chart-img" />
          <button
            className="btn btn-primary chart-btn"
            onClick={() => setShowAlturaModal(true)}
            disabled={!userId}
          >
            Consultar gráfica de altura
          </button>
        </div>
        <div className="chart-card">
          <img src={desarrolloPeso} alt="Gráfica de desarrollo de peso" className="chart-img" />
          <button
            className="btn btn-primary chart-btn"
            onClick={() => setShowPesoModal(true)}
            disabled={!userId}
          >
            Consultar gráfica de peso
          </button>
        </div>
      </section>
      {showPesoModal && (
        <ModalGraficaPeso onClose={() => setShowPesoModal(false)} />
      )}
      {showAlturaModal && (
        <ModalGraficaAltura onClose={() => setShowAlturaModal(false)} />
      )}
    </div>
  );
};

export default DashboardGraficas;