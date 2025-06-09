import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HitosDashboard from './Components/HitosDashboard';
import RegistroCrecimientoDashboard from './Components/RegistroCrecimientoDashboard';
import DashboardGraficas from './Components/DashboardGraficas';
import InicioSeleccionRol from './Components/InicioSeleccionRol';
import DoctorDashboard from './Components/DoctorDashboard';
import DashboardNotas from './Components/DashboardNotas';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<InicioSeleccionRol/>} />
                <Route path="/hitosDashboard" element={<HitosDashboard/>} />
                <Route path='/registro-crecimiento' element={<RegistroCrecimientoDashboard/>} />
                <Route path='/graficas-dashboard' element={<DashboardGraficas/>} />
                <Route path='/doctor-dashboard' element={<DoctorDashboard/>} />
                <Route path='/notas-medicas' element={<DashboardNotas/>} />
            </Routes>
        </Router>
    );
};

export default App;