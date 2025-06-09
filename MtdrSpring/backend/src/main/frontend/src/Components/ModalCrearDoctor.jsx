import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../Assets/ModalCrearDoctor.css';

const ModalCrearDoctor = ({ show, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    speciality: '',
    phone: '',
    mail: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    // Validación simple
    if (!form.name || !form.speciality || !form.phone || !form.mail) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          speciality: form.speciality,
          phone: form.phone,
          mail: form.mail
        })
      });
      if (res.ok) {
        setForm({ name: '', speciality: '', phone: '', mail: '' });
        setLoading(false);
        if (onSuccess) onSuccess();
        onClose();
      } else {
        setError('Error al crear el doctor.');
        setLoading(false);
      }
    } catch {
      setError('Error de conexión.');
      setLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-bg">
      <div className="modal-card modal-crear-doctor-card">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-title">Crear Nuevo Doctor</h2>
        <form className="modal-crear-doctor-form" onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Especialidad:
            <input
              type="text"
              name="speciality"
              value={form.speciality}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Teléfono:
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="mail"
              value={form.mail}
              onChange={handleChange}
              required
            />
          </label>
          {error && <div className="modal-error">{error}</div>}
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Crear Doctor'}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default ModalCrearDoctor;