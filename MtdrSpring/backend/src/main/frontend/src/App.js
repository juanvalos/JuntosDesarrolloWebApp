import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HitosDashboard from './Components/HitosDashboard';
import RegistroCrecimientoDashboard from './Components/RegistroCrecimientoDashboard';
import DashboardGraficas from './Components/DashboardGraficas';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HitosDashboard/>} />
                <Route path='/registro-crecimiento' element={<RegistroCrecimientoDashboard/>} />
                <Route path='/graficas-dashboard' element={<DashboardGraficas/>} />
            </Routes>
        </Router>
    );
};

export default App;