import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceDot
} from 'recharts';
import { UserContext } from '../Contexts/userContext';
import '../Assets/ModalGraficaPeso.css';

const ModalGraficaPeso = ({ onClose }) => {
  const { userId } = useContext(UserContext);
  const [child, setChild] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetch(`/userchild/${userId}`)
      .then(res => res.json())
      .then(data => {
        setChild(data);
        setLoading(false);
      })
      .catch(err => {
        setChild(null);
        setLoading(false);
        console.error('Error fetching child data', err);
      });
  }, [userId]);

  const boysData = [
    { age: 0, p5: 2.45, p10: 2.6, p25: 2.9, p50: 3.2, p75: 3.5, p90: 3.8, p95: 4.1},
    { age: 2, p5: 3.5, p10: 3.7, p25: 4.1, p50: 4.5, p75: 5, p90: 5.4, p95: 5.7},
    { age: 4, p5: 4.6, p10: 4.9, p25: 5.35, p50: 5.9, p75: 6.5, p90: 7, p95: 7.35 },
    { age: 6, p5: 5.55, p10: 5.85, p25: 6.4, p50: 7.05, p75: 7.7, p90: 8.3, p95: 8.7 },
    { age: 8, p5: 6.25, p10: 6.6, p25: 7.2, p50: 7.9, p75: 8.65, p90: 9.3, p95: 9.75 },
    { age: 10, p5: 6.8, p10: 7.2, p25: 7.8, p50: 8.55, p75: 9.40, p90: 10.1, p95: 10.55},
    { age: 12, p5: 7.25, p10: 7.6, p25: 8.3, p50: 9.1, p75: 9.9, p90: 10.7, p95: 11.2 },
    { age: 14, p5: 7.6, p10: 8, p25: 8.72, p50: 9.52, p75: 10.4, p90: 11.2, p95: 11.72 },
    { age: 16, p5: 7.92, p10: 8.4, p25: 9.08, p50: 9.92, p75: 10.8, p90: 11.63, p95: 12.2 },
    { age: 18, p5: 8.23, p10: 8.7, p25: 9.4, p50: 10.3, p75: 11.2, p90: 12.1, p95: 12.6},
    { age: 20, p5: 8.5, p10: 8.93, p25: 9.7, p50: 10.6, p75: 11.6, p90: 12.45, p95: 13.02 },
    { age: 22, p5: 8.8, p10: 9.2, p25: 10, p50: 10.9, p75: 11.9, p90: 12.8, p95: 13.4 },
    { age: 24, p5: 9, p10: 9.5, p25: 10.25, p50: 11.22, p75: 12.2, p90: 13.2, p95: 13.78 },
    { age: 26, p5: 9.2, p10: 9.7, p25: 10.57, p50: 11.5, p75: 12.52, p90: 13.5, p95: 14.12 },
    { age: 28, p5: 9.41, p10: 9.95, p25: 10.8, p50: 11.8, p75: 12.8, p90: 13.8, p95: 14.43 },
    { age: 30, p5: 9.6, p10: 10.2, p25: 11.02, p50: 12.05, p75: 13.18, p90: 14.2, p95: 14.8 },
    { age: 32, p5: 9.81, p10: 10.4, p25: 11.3, p50: 12.3, p75: 13.4, p90: 14.44, p95: 15.12 },
    { age: 34, p5: 10.05, p10: 10.6, p25: 11.45, p50: 12.57, p75: 13.7, p90: 14.8, p95: 15.4 },
    { age: 36, p5: 10.2, p10: 10.8, p25: 11.7, p50: 12.8, p75: 13.96, p90: 15.05, p95: 15.7 }
  ];


  const girlsData = [
    { age: 0, p5: 2.4, p10: 2.6, p25: 2.8, p50: 3.1, p75: 3.4, p90: 3.7, p95: 3.9},
    { age: 2, p5: 3.3, p10: 3.46, p25: 3.8, p50: 4.18, p75: 4.58, p90: 5, p95: 5.3},
    { age: 4, p5: 4.15, p10: 4.35, p25: 4.75, p50: 5.2, p75: 5.75, p90: 6.28, p95: 6.6},
    { age: 6, p5: 4.9, p10: 5.18, p25: 5.6, p50: 6.15, p75: 6.8, p90: 7.4, p95: 7.8 },
    { age: 8, p5: 5.6, p10: 5.84, p25: 6.36, p50: 6.97, p75: 7.69, p90: 8.39, p95: 8.78},
    { age: 10, p5: 6.15, p10: 6.43, p25: 6.98, p50: 7.63, p75: 8.42, p90: 9.2, p95: 9.7},
    { age: 12, p5: 6.6, p10: 6.92, p25: 7.5, p50: 8.2, p75: 9.07, p90: 9.9, p95: 10.47 },
    { age: 14, p5: 7, p10: 7.36, p25: 7.95, p50: 8.7, p75: 9.6, p90: 10.5, p95: 11.1 },
    { age: 16, p5: 7.39, p10: 7.73, p25: 8.37, p50: 9.16, p75: 10.1, p90: 11.05, p95: 11.7},
    { age: 18, p5: 7.7, p10: 8.05, p25: 8.7, p50: 9.55, p75: 10.5, p90: 11.5, p95: 12.2},
    { age: 20, p5: 7.9, p10: 8.36, p25: 9, p50: 9.9, p75: 10.9, p90: 11.95, p95: 12.7 },
    { age: 22, p5: 8.25, p10: 8.6, p25: 9.26, p50: 10.2, p75: 11.3, p90: 12.4, p95: 13.15 },
    { age: 24, p5: 8.5, p10: 8.9, p25: 9.6, p50: 10.55, p75: 11.6, p90: 12.77, p95: 13.57 },
    { age: 26, p5: 8.72, p10: 9.16, p25: 9.86, p50: 10.8, p75: 11.95, p90: 13.15, p95: 13.95 },
    { age: 28, p5: 8.93, p10: 9.35, p25: 10.1, p50: 11.1, p75: 12.27, p90: 13.5, p95: 14.36 },
    { age: 30, p5: 9.18, p10: 9.6, p25: 10.38, p50: 11.38, p75: 12.6, p90: 13.83, p95: 14.74 },
    { age: 32, p5: 9.38, p10: 9.8, p25: 10.6, p50: 11.6, p75: 12.88, p90: 14.2, p95: 15.1 },
    { age: 34, p5: 9.56, p10: 10, p25: 10.8, p50: 11.9, p75: 13.2, p90: 14.55, p95: 15.5 },
    { age: 36, p5: 9.8, p10: 10.2, p25: 11.1, p50: 12.2, p75: 13.5, p90: 14.9, p95: 15.9 }
  ];


  // Loading state
  if (loading) {
    return ReactDOM.createPortal(
      <div className="modal-bg">
        <div className="modal-card">
          <div className="modal-loading">Cargando...</div>
        </div>
      </div>,
      document.body
    );
  }

  // Error state
  if (!child) {
    return ReactDOM.createPortal(
      <div className="modal-bg">
        <div className="modal-card">
          <div className="modal-error">No se pudo cargar la información.</div>
          <button className="btn btn-outline" onClick={onClose}>Cerrar</button>
        </div>
      </div>,
      document.body
    );
  }

  const isGirl = child.gender && child.gender.toLowerCase() === 'femenino';
  const data = isGirl ? girlsData : boysData;
  const { age, weight } = child;

  return ReactDOM.createPortal(
    <div className="modal-bg">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-title">Gráfica de Peso</h2>
        <ResponsiveContainer width="100%" height={620}>
          <LineChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="age" type="number" domain={[0, 36]} label={{ value: 'Edad (meses)', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: 'Peso (kg)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            {['p5', 'p10', 'p25', 'p50', 'p75', 'p90', 'p95'].map((key, i) => (
              <Line key={key} type="monotone" dataKey={key} strokeWidth={key === 'p50' ? 3 : 2} dot={false}
                stroke={['#d62728', '#ff7f0e', '#bcbd22', '#2ca02c', '#17becf', '#1f77b4', '#9467bd'][i]}
                name={`P${key.slice(1)}`} />
            ))}
            <ReferenceDot
              x={age}
              y={weight}
              r={5}
              fill="red"
              stroke="white"
              strokeWidth={2}
              label={{ value: 'Peso actual', position: 'top', fill: 'red' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>,
    document.body
  );
};

export default ModalGraficaPeso;