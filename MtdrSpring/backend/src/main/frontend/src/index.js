import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { UserProvider } from './Contexts/userContext';
import { DoctorProvider } from './Contexts/doctorContext';

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <DoctorProvider>
                <App />
            </DoctorProvider>
        </UserProvider>
    </React.StrictMode>,
    document.getElementById('root')
);