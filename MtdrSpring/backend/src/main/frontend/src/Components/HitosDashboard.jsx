import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Assets/HitosDashboard.css';
import { UserContext } from '../Contexts/userContext';
import ModalAgregarNino from './ModalAgregarNino';

const categorias = [
  'Desarrollo motor',
  'Social',
  'Cognitivo',
  'Lenguaje'
];

const HitosDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [children, setChildren] = useState([]);
  const { userId, setUserId } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [recentHitos, setRecentHitos] = useState([]);

  // Estado para el formulario de hito
  const [hitoForm, setHitoForm] = useState({
    category: '',
    description: '',
    date: ''
  });
  const [hitoError, setHitoError] = useState('');

  useEffect(() => {
    refreshChildren();
  }, []);

  useEffect(() => {
    if (userId) {
      fetch(`/userchild/${userId}`)
        .then(res => res.json())
        .then(data => setUserInfo(data))
        .catch(() => setUserInfo(null));
    } else {
      setUserInfo(null);
    }
    fetchRecentHitos(); // Siempre recarga el historial al cambiar userId
  }, [userId]);

  const fetchRecentHitos = () => {
    if (userId) {
      fetch(`/hitos/user/${userId}/recent`)
        .then(res => res.json())
        .then(data => setRecentHitos(data))
        .catch(() => setRecentHitos([]));
    } else {
      setRecentHitos([]);
    }
  };

  const refreshChildren = () => {
    fetch('/userchildren/summary')
      .then(res => res.json())
      .then(data => setChildren(data))
      .catch(() => setChildren([]));
  };

  const handleSelect = (e) => {
    const selectedId = e.target.value ? parseInt(e.target.value) : null;
    setUserId(selectedId);
  };

  // Handlers para el formulario de hito
  const handleHitoChange = (e) => {
    setHitoForm({ ...hitoForm, [e.target.name]: e.target.value });
  };

  const handleHitoSubmit = async (e) => {
    e.preventDefault();
    setHitoError('');
    if (!hitoForm.category || !hitoForm.description || !hitoForm.date) {
      setHitoError('Todos los campos son obligatorios.');
      return;
    }
    if (!userId) {
      setHitoError('Selecciona un niño primero.');
      return;
    }
    try {
      const res = await fetch('/hitos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...hitoForm,
          userId
        })
      });
      if (res.ok) {
        setHitoForm({ category: '', description: '', date: '' });
        window.alert('¡Hito registrado!');
        fetchRecentHitos(); // Recarga los hitos recientes
      } else {
        setHitoError('Error al crear el hito.');
      }
    } catch {
      setHitoError('Error de conexión.');
    }
  };

  const handleDeleteHito = async (hitoId) => {
    try {
      await fetch(`/hitos/${hitoId}`, { method: 'DELETE' });
      fetchRecentHitos(); // Recarga los hitos recientes
    } catch {
      // Puedes mostrar un error si quieres
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="title-subtitle">
          <h1 className="title">Juntos Por El Desarrollo</h1>
          <p className="subtitle">
            Un espacio para seguir su crecimiento, con calma y amor.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            className={`nav-btn${location.pathname === '/' ? ' nav-btn-active' : ''}`}
            onClick={() => navigate('/')}
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
            onClick={() => navigate('/graficas-crecimiento')}
          >
            Gráficas de crecimiento
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

      <section className="dashboard-grid">
        <div className="card-2">
          <div className="card">
            <h3>Información del infante</h3>
            {userInfo ? (
              <ul>
                <li><strong>Nombre:</strong> <span>{userInfo.name ?? '-'}</span></li>
                <li><strong>Peso Actual:</strong> <span>{userInfo.weight ?? '-'} kg</span></li>
                <li><strong>Altura Actual:</strong> <span>{userInfo.height ?? '-'} cm</span></li>
                <li><strong>Edad:</strong> <span>{userInfo.age ?? '-'} meses</span></li>
                <li><strong>Fecha de Nacimiento:</strong> <span>{userInfo.birth_date ?? '-'}</span></li>
              </ul>
            ) : (
              <ul>
                <li><strong>Nombre:</strong> <span>-</span></li>
                <li><strong>Peso Actual:</strong> <span>- kg</span></li>
                <li><strong>Altura Actual:</strong> <span>- cm</span></li>
                <li><strong>Edad:</strong> <span>- meses</span></li>
                <li><strong>Fecha de Nacimiento:</strong> <span>-</span></li>
              </ul>
            )}
            <button className="btn btn-outline">Ver Gráficas de Crecimiento</button>
          </div>

          <div className="card">
            <h3>Hitos del Desarrollo</h3>
            <form onSubmit={handleHitoSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <label style={{ fontWeight: 500, marginBottom: '0.2rem' }}>
                Categoría:  
                <select
                  className="select-input select-input-small"
                  name="category"
                  value={hitoForm.category}
                  onChange={handleHitoChange}
                  required
                  style={{ maxWidth: '180px', marginTop: '0.3rem' }}
                >
                  <option value="">Selecciona</option>
                  {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </label>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 500, marginBottom: '0.2rem' }}>Descripción:</span>
                <textarea
                  className="textarea-input"
                  name="description"
                  value={hitoForm.description}
                  onChange={handleHitoChange}
                  required
                  style={{ minWidth: '180px', maxWidth: '100%' }}
                />
              </div>
              <label style={{ fontWeight: 500, marginBottom: '0.2rem', maxWidth: '180px' }}>
                Fecha:
                <input
                  className="input input-small"
                  type="date"
                  name="date"
                  value={hitoForm.date}
                  onChange={handleHitoChange}
                  required
                  style={{ maxWidth: '140px', marginTop: '0.3rem' }}
                />
              </label>
              {hitoError && <div className="modal-error">{hitoError}</div>}
              <button className="btn btn-primary" type="submit">Registrar Hito</button>
            </form>
          </div>
        </div>

        <div className="large-card">
          <h3>Historial de Hitos</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {recentHitos.length === 0 && <li>No hay hitos recientes.</li>}
            {recentHitos.map(hito => (
              <li key={hito.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.7rem' }}>
                <div>
                  <strong>{hito.category}:</strong> {hito.description} <span style={{ color: '#888', fontSize: '0.95em' }}>({hito.date?.slice(0,10)})</span>
                </div>
                <button
                  className="btn btn-outline"
                  style={{ marginLeft: '1rem', color: '#e74c3c', borderColor: '#e74c3c' }}
                  onClick={() => handleDeleteHito(hito.id)}
                >
                  Borrar
                </button>
              </li>
            ))}
          </ul>
          <button className="btn btn-block" onClick={() => navigate('/')}>📌 Ver Todos los Hitos</button>
        </div>
      </section>
    </div>
  );
};

export default HitosDashboard;