import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Assets/HitosDashboard.css';
import { UserContext } from '../Contexts/userContext';
import ModalTodosRegistrosCrecimiento from './ModalTodosRegistrosCrecimiento';

const RegistroCrecimientoDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [children, setChildren] = useState([]);
  const { userId, setUserId } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState(null);
  const [recentRegistros, setRecentRegistros] = useState([]);
  const [showRegistrosModal, setShowRegistrosModal] = useState(false);


  // Estado para el formulario de registro de crecimiento
  const [registroForm, setRegistroForm] = useState({
    weight: '',
    height: '',
    age: '',
    date: ''
  });
  const [registroError, setRegistroError] = useState('');

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
    fetchRecentRegistros();
  }, [userId]);

  const fetchRecentRegistros = () => {
    if (userId) {
      fetch(`/registro-crecimiento/user/${userId}/recent`)
        .then(res => res.json())
        .then(data => setRecentRegistros(data))
        .catch(() => setRecentRegistros([]));
    } else {
      setRecentRegistros([]);
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

  const handleRegistroChange = (e) => {
    setRegistroForm({ ...registroForm, [e.target.name]: e.target.value });
  };

  const handleRegistroSubmit = async (e) => {
    e.preventDefault();
    setRegistroError('');
    if (!registroForm.weight || !registroForm.height || !registroForm.date || !registroForm.age) {
      setRegistroError('Todos los campos son obligatorios.');
      return;
    }
    if (!userId) {
      setRegistroError('Selecciona un niño primero.');
      return;
    }
    try {
      const res = await fetch('/registro-crecimiento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...registroForm,
          userId
        })
      });
      if (res.ok) {
        setRegistroForm({ weight: '', height: '', age: '', date: '' });
        window.alert('¡Registro de crecimiento guardado!');
        fetchRecentRegistros();
        // Actualiza la info del usuario
        fetch(`/userchild/${userId}`)
          .then(res => res.json())
          .then(data => setUserInfo(data))
          .catch(() => setUserInfo(null));
      } else {
        setRegistroError('Error al crear el registro.');
      }
    } catch {
      setRegistroError('Error de conexión.');
    }
  };

  const handleDeleteRegistro = async (registroId) => {
    try {
      await fetch(`/registro-crecimiento/${registroId}`, { method: 'DELETE' });
      fetchRecentRegistros();
      // Actualiza la info del usuario
      fetch(`/userchild/${userId}`)
        .then(res => res.json())
        .then(data => setUserInfo(data))
        .catch(() => setUserInfo(null));
    } catch {
      // Puedes mostrar un error si quieres
    }
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

  const handleLogout = () => {
    setUserId(null);
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="title-subtitle">
          <h1 className="title">Registro de Crecimiento</h1>
          <p className="subtitle">
            Lleva el seguimiento del peso y la altura de tu hijo(a).
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
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

      <section className="dashboard-grid">
        <div className="card-2">
          <div className="card">
            <h3>Información del infante</h3>
            {userInfo ? (
              <ul>
                <li><strong>Nombre: </strong> <span>{userInfo.name ?? '-'}</span></li>
                <li><strong>Peso Actual: </strong> <span>{userInfo.weight ?? '-'} kg</span></li>
                <li><strong>Altura Actual: </strong> <span>{userInfo.height ?? '-'} cm</span></li>
                <li><strong>Edad: </strong> <span>{userInfo.age ?? '-'} meses</span></li>
                <li><strong>Fecha de Nacimiento: </strong>{' '}<span>{formatDate(userInfo?.dateOfBirth)}</span></li>
                <li><strong>Sexo: </strong> <span>{userInfo.gender ?? '-'}</span></li>
              </ul>
            ) : (
              <ul>
                <li><strong>Nombre: </strong> <span>-</span></li>
                <li><strong>Peso Actual: </strong> <span>- kg</span></li>
                <li><strong>Altura Actual: </strong> <span>- cm</span></li>
                <li><strong>Edad: </strong> <span>- meses</span></li>
                <li><strong>Fecha de Nacimiento: </strong> <span>-</span></li>
                <li><strong>Sexo: </strong> <span>-</span></li>
              </ul>
            )}
            <button className={"btn btn-outline"}onClick={() => navigate('/graficas-dashboard')}>Ver Gráficas de Crecimiento</button>
          </div>

          <div className="card">
            <h3>Agregar Registro de Crecimiento</h3>
            <form onSubmit={handleRegistroSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <label style={{ fontWeight: 500, marginBottom: '0.2rem' }}>
                Peso (kg):
                <input
                  className="input input-small"
                  type="number"
                  name="weight"
                  value={registroForm.weight}
                  onChange={handleRegistroChange}
                  required
                  min="0"
                  step="0.01"
                  style={{ maxWidth: '140px', marginTop: '0.3rem' }}
                />
              </label>
              <label style={{ fontWeight: 500, marginBottom: '0.2rem' }}>
                Altura (cm):
                <input
                  className="input input-small"
                  type="number"
                  name="height"
                  value={registroForm.height}
                  onChange={handleRegistroChange}
                  required
                  min="0"
                  step="1"
                  style={{ maxWidth: '140px', marginTop: '0.3rem' }}
                />
              </label>
              <label style={{ fontWeight: 500, marginBottom: '0.2rem' }}>
                Edad (meses):
                <input
                  className="input input-small"
                  type="number"
                  name="age"
                  value={registroForm.age}
                  onChange={handleRegistroChange}
                  required
                  min="0"
                  step="1"
                  style={{ maxWidth: '140px', marginTop: '0.3rem' }}
                />
              </label>
              <label style={{ fontWeight: 500, marginBottom: '0.2rem' }}>
                Fecha:
                <input
                  className="input input-small"
                  type="date"
                  name="date"
                  value={registroForm.date}
                  onChange={handleRegistroChange}
                  required
                  style={{ maxWidth: '140px', marginTop: '0.3rem' }}
                />
              </label>
              {registroError && <div className="modal-error">{registroError}</div>}
              <button className="btn btn-primary" type="submit">Registrar Crecimiento</button>
            </form>
          </div>
        </div>

        <div className="large-card">
          <h3>Historial de Registros de Crecimiento</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {recentRegistros.length === 0 && <li>No hay registros recientes.</li>}
            {recentRegistros.map(registro => (
              <li key={registro.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.7rem' }}>
                <div>
                  <strong>Peso:</strong> {registro.weight} kg, <strong>Altura:</strong> {registro.height} cm, <strong>Edad:</strong> {registro.age} meses <span style={{ color: '#888', fontSize: '0.95em' }}>({registro.date?.slice(0,10)})</span>
                </div>
                <button
                  className="btn btn-outline"
                  style={{ marginLeft: '1rem', color: '#e74c3c', borderColor: '#e74c3c' }}
                  onClick={() => handleDeleteRegistro(registro.id)}
                >
                  Borrar
                </button>
              </li>
            ))}
          </ul>
          <button className="btn btn-block" onClick={() => setShowRegistrosModal(true)}>
            Ver Todos los Registros de Crecimiento
          </button>
          {showRegistrosModal && (
            <ModalTodosRegistrosCrecimiento onClose={() => setShowRegistrosModal(false)} />
)}
        </div>
      </section>
    </div>
  );
};

export default RegistroCrecimientoDashboard;