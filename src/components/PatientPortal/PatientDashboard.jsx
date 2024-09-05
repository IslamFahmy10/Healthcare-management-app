import React, { useContext } from 'react';
import PatientContext from '../../context/PatientContext';

const PatientDashboard = () => {
  const { state } = useContext(PatientContext);
  const user = state.currentUser;

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Medical History</h3>
        <ul>
          {user.medicalHistory.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Upcoming Appointments</h3>
        <ul>
          {state.appointments.filter(app => app.patientId === user.id).map(app => (
            <li key={app.id}>
              {state.doctors.find(d => d.id === app.doctorId)?.name} - {app.date}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Billing Information</h3>
        <ul>
          {/* Assume user has a billing attribute */}
          <li>Total Amount: $1000</li>
        </ul>
      </div>
    </div>
  );
};

export default PatientDashboard;