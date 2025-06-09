import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../Contexts/doctorContext';
import { UserContext } from '../Contexts/userContext';
import { useNavigate } from 'react-router-dom';
import '../Assets/DoctorDashboard.css';
import ModalCrearDoctor from './ModalCrearDoctor';
import ModalTodasNotas from './ModalTodasNotas';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { doctorId, setDoctorId } = useContext(DoctorContext);
  const { userId, setUserId } = useContext(UserContext);

  // Doctores summary
  const [doctors, setDoctors] = useState([]);
  // Children summary
  const [children, setChildren] = useState([]);
  // Modal para crear doctor
  const [showCrearDoctor, setShowCrearDoctor] = useState(false);
  // Formulario de nota
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: ''
  });
  const [formError, setFormError] = useState('');
  // Notas recientes
  const [recentNotes, setRecentNotes] = useState([]);
  // Modal de todas las notas
  const [showNotasModal, setShowNotasModal] = useState(false);
  // Información del doctor (local, no en context)
  const [doctorInfo, setDoctorInfo] = useState(null);

  // Cargar lista de doctores
  useEffect(() => {
    fetch('/doctor/summary')
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(() => setDoctors([]));
  }, [showCrearDoctor]);

  // Cuando cambia el doctor seleccionado, cargar su info
  useEffect(() => {
    if (!doctorId) {
      setDoctorInfo(null);
      return;
    }
    fetch(`/doctor/${doctorId}`)
      .then(res => res.json())
      .then(data => setDoctorInfo(data))
      .catch(() => setDoctorInfo(null));
  }, [doctorId]);

  // Cargar lista de niños summary
  useEffect(() => {
    fetch('/userchildren/summary')
      .then(res => res.json())
      .then(data => setChildren(data))
      .catch(() => setChildren([]));
  }, []);

  // Cargar las 3 notas más recientes del doctor seleccionado
  useEffect(() => {
    if (!doctorId) {
      setRecentNotes([]);
      return;
    }
    fetch(`/notes/user/recent/${doctorId}`)
      .then(res => res.json())
      .then(data => setRecentNotes(Array.isArray(data) ? data : []))
      .catch(() => setRecentNotes([]));
  }, [doctorId]);

  const handleLogout = () => {
    setDoctorId(null);
    setUserId(null);
    navigate('/');
  };

  // Cuando seleccionas un doctor del select
  const handleDoctorSelect = e => {
    const id = e.target.value ? parseInt(e.target.value) : null;
    setDoctorId(id);
    setUserId(null); // Limpiar niño seleccionado al cambiar doctor
  };

  // Cuando seleccionas un niño del select
  const handleChildSelect = e => {
    const id = e.target.value ? parseInt(e.target.value) : null;
    setUserId(id);
  };

  const handleFormChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setFormError('');
    if (!doctorId || !userId || !form.title || !form.description || !form.date) {
      setFormError('Todos los campos son obligatorios.');
      return;
    }
    try {
      const res = await fetch('/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorId,
          childId: userId,
          title: form.title,
          description: form.description,
          date: form.date
        })
      });
      if (res.ok) {
        setForm({ title: '', description: '', date: '' });
        // Refresca solo las 3 más recientes del doctor
        fetch(`/notes/user/recent/${doctorId}`)
          .then(res => res.json())
          .then(data => setRecentNotes(Array.isArray(data) ? data : []));
      } else {
        setFormError('Error al crear la nota.');
      }
    } catch {
      setFormError('Error de conexión.');
    }
  };

  const handleDeleteNota = async (id) => {
    if (!window.confirm('¿Seguro que deseas borrar esta nota?')) return;
    try {
      const res = await fetch(`/notes/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setRecentNotes(recentNotes.filter(n => n.id !== id));
      }
    } catch {
      alert('Error al borrar la nota.');
    }
  };

  return (
    <div className="doctor-dashboard-container">
      <header className="doctor-dashboard-header">
        <div className="doctor-title-subtitle">
          <h1 className="doctor-title">Panel del Doctor</h1>
          <p className="doctor-subtitle">
            Administra tus pacientes y registra notas médicas.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button className="btn-logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
        </div>
      </header>

      <div className="profile-bar">
        <select
          className="profile-select"
          value={doctorId || ''}
          onChange={handleDoctorSelect}
        >
          <option value="">Selecciona un doctor</option>
          {doctors.map(doc => (
            <option key={doc.id} value={doc.id}>
              {doc.name}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={() => setShowCrearDoctor(true)}>
          Añadir Doctor
        </button>
      </div>

      <div className="doctor-dashboard-grid">
        <div className="card-2">
          <div className="doctor-card2">
            <h3>Información del Doctor</h3>
            <ul>
              <li><strong>Nombre:</strong> {doctorInfo?.name ?? '-'}</li>
              <li><strong>Especialidad:</strong> {doctorInfo?.speciality ?? '-'}</li>
              <li><strong>Teléfono:</strong> {doctorInfo?.phone ?? '-'}</li>
              <li><strong>Email:</strong> {doctorInfo?.mail ?? '-'}</li>
            </ul>
          </div>
          <div className="doctor-card medica-compacta">
            <h3 style={{ fontSize: '1.08rem', marginBottom: '0.7rem' }}>Crear Nota Médica</h3>
            <form className="doctor-form medica-compacta" onSubmit={handleSubmit}>
                <label>Niño:
                <select
                    name="childId"
                    value={userId || ''}
                    onChange={handleChildSelect}
                    required
                    disabled={!doctorId}
                >
                    <option value="">Selecciona un niño</option>
                    {children.map(child => (
                    <option key={child.id} value={child.id}>
                        {child.name}
                    </option>
                    ))}
                </select>
                </label>
                <label>Título:
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleFormChange}
                    required
                    disabled={!doctorId || !userId}
                />
                </label>
                <label>Descripción:
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleFormChange}
                    required
                    disabled={!doctorId || !userId}
                    style={{ minHeight: 35 }}
                />
                </label>
                <label>Fecha:
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleFormChange}
                    required
                    disabled={!doctorId || !userId}
                />
                </label>
                {formError && <div className="doctor-modal-error">{formError}</div>}
                <button className="doctor-btn-primary" type="submit" disabled={!doctorId || !userId}>
                Crear Nota
                </button>
            </form>
            </div>
        </div>
      </div>
      <div className="large-card">
        <h3>Historial de Notas</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {recentNotes.length === 0 && <li>No hay notas recientes.</li>}
            {recentNotes.map(note => (
            <li
                key={note.id}
                style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.7rem'
                }}
            >
                <div>
                <strong>{note.title}</strong>
                <span style={{ color: '#888', fontSize: '0.95em', marginLeft: 10 }}>
                    ({note.date ? new Date(note.date).toLocaleDateString('es-MX') : ''})
                </span>
                <span style={{ color: '#28BDB1', marginLeft: 12 }}>
                    {children.find(child => child.id === note.childId)?.name
                    ? `- ${children.find(child => child.id === note.childId).name}`
                    : ''}
                </span>
                </div>
                <button
                className="btn btn-outline"
                style={{ marginLeft: '1rem', color: '#e74c3c', borderColor: '#e74c3c' }}
                onClick={() => handleDeleteNota(note.id)}
                >
                Borrar
                </button>
            </li>
            ))}
        </ul>
        <button className="btn btn-outline" onClick={() => setShowNotasModal(true)} disabled={!doctorId}>
            Ver todas las notas
        </button>
        {showNotasModal && (
            <ModalTodasNotas
                doctorId={doctorId}
                onClose={() => setShowNotasModal(false)}
            />
        )}
      </div>
      <ModalCrearDoctor
        show={showCrearDoctor}
        onClose={() => setShowCrearDoctor(false)}
        onSuccess={() => setShowCrearDoctor(false)}
      />
    </div>
  );
};

export default DoctorDashboard;