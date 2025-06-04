import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HitosDashboard from './Components/hitosDashboard';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HitosDashboard/>} />
            </Routes>
        </Router>
    );
};

export default App;