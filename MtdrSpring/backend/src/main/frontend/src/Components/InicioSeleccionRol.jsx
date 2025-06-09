import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Assets/InicioSeleccionRol.css';

const InicioSeleccionRol = () => {
  const navigate = useNavigate();

  return (
    <div className="inicio-container">
      <header className="inicio-header">
        <h1 className="inicio-title">Juntos en el Desarrollo</h1>
        <p className="inicio-subtitle">
          Selecciona cómo deseas iniciar sesión en la plataforma.
        </p>
      </header>
      <section className="inicio-cards-container">
        <div className="inicio-card">
          <h3>Iniciar como Padre</h3>
          <button
            className="inicio-btn"
            onClick={() => navigate('/hitosDashboard')}
          >
            Soy Padre / Madre
          </button>
        </div>
        <div className="inicio-card">
          <h3>Iniciar como Doctor</h3>
          <button
            className="inicio-btn"
            onClick={() => navigate('/doctor-dashboard')}
          >
            Soy Doctor(a)
          </button>
        </div>
      </section>
    </div>
  );
};

export default InicioSeleccionRol;