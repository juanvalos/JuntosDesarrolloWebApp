import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceDot
} from 'recharts';
import { UserContext } from '../Contexts/userContext';
import '../Assets/ModalGraficaPeso.css'; // reutilizamos el estilo del modal

const ModalGraficaAltura = ({ onClose }) => {
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

  const boysHeightData = [
    { age: 1, p5: 49.2, p10: 50, p25: 51.2, p50: 53.6, p75: 54, p90: 55.2, p95: 56 },
    { age: 2, p5: 51.5, p10: 52.5, p25: 53.7, p50: 55, p75: 56.5, p90: 58, p95: 58.7 },
    { age: 4, p5: 56, p10: 56.7, p25: 58.1, p50: 59.7, p75: 61.2, p90: 62.8, p95: 63.7 },
    { age: 6, p5: 59.7, p10: 60.6, p25: 62.1, p50: 63.9, p75: 65.7, p90: 67.1, p95: 68.2 },
    { age: 8, p5: 62.9, p10: 63.9, p25: 65.5, p50: 67.2, p75: 69.2, p90: 71, p95: 72 },
    { age: 10, p5: 65.5, p10: 66.5, p25: 68, p50: 70, p75: 72, p90: 74, p95: 75 },
    { age: 12, p5: 67.5, p10: 68.5, p25: 70.4, p50: 72.4, p75: 74.5, p90: 76.2, p95: 77.5 },
    { age: 14, p5: 69.2, p10: 70.4, p25: 72.1, p50: 74.2, p75: 76.5, p90: 78.5, p95: 79.6 },
    { age: 16, p5: 70.9, p10: 72, p25: 74, p50: 76, p75: 78.2, p90: 80.3, p95: 81.6 },
    { age: 18, p5: 72.2, p10: 73.5, p25: 75.5, p50: 77.7, p75: 80, p90: 82, p95: 83.1 },
    { age: 20, p5: 73.5, p10: 74.7, p25: 76.8, p50: 79, p75: 81.5, p90: 83.5, p95: 84.9 },
    { age: 22, p5: 74.6, p10: 76, p25: 78, p50: 80.4, p75: 82.9, p90: 85, p95: 86.2 },
    { age: 24, p5: 75.7, p10: 77, p25: 79, p50: 81.5, p75: 84, p90: 86.1, p95: 87.6 },
    { age: 26, p5: 76.8, p10: 78, p25: 80.1, p50: 82.5, p75: 85.1, p90: 87.2, p95: 88.9 },
    { age: 28, p5: 77.5, p10: 78.9, p25: 81, p50: 83.5, p75: 86, p90: 88.4, p95: 89.9 },
    { age: 30, p5: 78.3, p10: 79.8, p25: 82, p50: 84.5, p75: 87, p90: 89.5, p95: 91 },
    { age: 32, p5: 79.1, p10: 80.5, p25: 82.9, p50: 85.5, p75: 88, p90: 90.5, p95: 92 },
    { age: 34, p5: 80, p10: 81.5, p25: 83.8, p50: 86.2, p75: 89, p90: 91.5, p95: 93 },
    { age: 36, p5: 80.8, p10: 82.1, p25: 84.5, p50: 87.2, p75: 89.9, p90: 92.3, p95: 93.8 }
  ];

  const girlsHeightData = [
    { age: 0, p5: 45.6, p10: 46.5, p25: 47.8, p50: 49.1, p75: 50.4, p90: 51.7, p95: 52.5 },
    { age: 3, p5: 53.5, p10: 54.8, p25: 56.5, p50: 58.0, p75: 59.6, p90: 61.0, p95: 62.1 },
    { age: 6, p5: 60.0, p10: 61.5, p25: 63.3, p50: 65.0, p75: 66.7, p90: 68.2, p95: 69.4 },
    { age: 9, p5: 65.0, p10: 66.6, p25: 68.6, p50: 70.4, p75: 72.2, p90: 73.8, p95: 75.0 },
    { age: 12, p5: 68.9, p10: 70.6, p25: 72.7, p50: 74.5, p75: 76.3, p90: 78.0, p95: 79.2 },
    { age: 18, p5: 74.4, p10: 76.1, p25: 78.5, p50: 80.5, p75: 82.5, p90: 84.4, p95: 85.7 },
    { age: 24, p5: 78.5, p10: 80.3, p25: 82.9, p50: 85.0, p75: 87.0, p90: 89.0, p95: 90.4 },
    { age: 30, p5: 82.0, p10: 83.9, p25: 86.6, p50: 88.7, p75: 90.8, p90: 92.7, p95: 94.1 },
    { age: 36, p5: 84.9, p10: 86.9, p25: 89.6, p50: 91.7, p75: 93.8, p90: 95.8, p95: 97.2 }
  ];

  if (loading) {
    return ReactDOM.createPortal(
      <div className="modal-bg">
        <div className="modal-card">
          <div className="modal-loading">Cargando gráfica de altura...</div>
        </div>
      </div>,
      document.body
    );
  }

  if (!child) {
    return ReactDOM.createPortal(
      <div className="modal-bg">
        <div className="modal-card">
          <div className="modal-error">No se pudo cargar la información del niño(a).</div>
          <button className="btn btn-outline" onClick={onClose}>Cerrar</button>
        </div>
      </div>,
      document.body
    );
  }

  const isGirl = child.gender?.toLowerCase() === 'femenino';
  const data = isGirl ? girlsHeightData : boysHeightData;
  const { age, height } = child;

  return ReactDOM.createPortal(
    <div className="modal-bg">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-title">Gráfica de Altura</h2>
        <ResponsiveContainer width="100%" height={620}>
          <LineChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="age" type="number" domain={[0, 36]} label={{ value: 'Edad (meses)', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: 'Altura (cm)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            {['p5', 'p10', 'p25', 'p50', 'p75', 'p90', 'p95'].map((key, i) => (
              <Line key={key} type="monotone" dataKey={key} strokeWidth={key === 'p50' ? 3 : 2} dot={false}
                stroke={['#d62728', '#ff7f0e', '#bcbd22', '#2ca02c', '#17becf', '#1f77b4', '#9467bd'][i]}
                name={`P${key.slice(1)}`} />
            ))}
            <ReferenceDot
              x={age}
              y={height}
              r={5}
              fill="red"
              stroke="white"
              strokeWidth={2}
              label={{ value: 'Altura actual', position: 'top', fill: 'red' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>,
    document.body
  );
};

export default ModalGraficaAltura;