import React, { createContext, useState } from 'react';

export const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctorId, setDoctorId] = useState(null);

  return (
    <DoctorContext.Provider value={{ doctorId, setDoctorId}}>
      {children}
    </DoctorContext.Provider>
  );
};