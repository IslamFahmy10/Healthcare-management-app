import React, { useContext, useState } from 'react';
import PatientContext from '../../context/PatientContext';

const MedicalHistory = ({ patientId }) => {
  const { state, dispatch } = useContext(PatientContext);
  const patient = state.patients.find(p => p.id === patientId);
  const [newEntry, setNewEntry] = useState('');

  const handleAddEntry = async () => {
    const updatedPatient = { ...patient, medicalHistory: [...patient.medicalHistory, newEntry] };
    await fetch(`http://localhost:5000/patients/${patientId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPatient),
    });
    dispatch({ type: 'UPDATE_PATIENT', payload: updatedPatient });
    setNewEntry('');
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Medical History for {patient.name}</h2>
      <ul className="list-disc list-inside">
        {patient.medicalHistory.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
        className="input mt-2"
        placeholder="Add new entry"
      />
      <button onClick={handleAddEntry} className="btn mt-2">Add Entry</button>
    </div>
  );
};

export default MedicalHistory;