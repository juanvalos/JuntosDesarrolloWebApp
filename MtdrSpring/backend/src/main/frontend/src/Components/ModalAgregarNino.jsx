import React, { useState } from 'react';
import '../Assets/ModalAgregarNino.css';

const ModalAgregarNino = ({ show, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    gender: '',
    weight: '',
    height: '',
    age: '',
    dateOfBirth: ''
  });
  const [error, setError] = useState('');

  if (!show) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Validación simple
    if (!form.name || !form.gender || !form.dateOfBirth) {
      setError('Por favor llena todos los campos obligatorios.');
      return;
    }
    try {
      const res = await fetch('/userchild', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          weight: form.weight ? parseFloat(form.weight) : null,
          height: form.height ? parseInt(form.height) : null,
          age: form.age ? parseInt(form.age) : null
        })
      });
      if (res.ok) {
        setForm({ name: '', gender: '', weight: '', height: '', age: '', dateOfBirth: '' });
        onSuccess && onSuccess();
        onClose();
      } else {
        setError('Error al agregar el niño.');
      }
    } catch {
      setError('Error de conexión.');
    }
  };

  return (
    <div className="modal-agregar-nino-backdrop">
      <div className="modal-agregar-nino">
        <h2>Agregar Niño</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre*:
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>Género*:
            <select name="gender" value={form.gender} onChange={handleChange} required>
              <option value="">Selecciona</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </label>
          <label>Peso (kg):
            <input type="number" step="0.01" name="weight" value={form.weight} onChange={handleChange} />
          </label>
          <label>Altura (cm):
            <input type="number" name="height" value={form.height} onChange={handleChange} />
          </label>
          <label>Edad (meses):
            <input type="number" name="age" value={form.age} onChange={handleChange} />
          </label>
          <label>Fecha de nacimiento*:
            <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} required />
          </label>
          {error && <div className="modal-error">{error}</div>}
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Agregar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAgregarNino;