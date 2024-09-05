import React, { useContext } from 'react';
import PatientContext from '../../context/PatientContext';

const AppointmentHistory = () => {
  const { state, dispatch } = useContext(PatientContext);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/appointments/${id}`, { method: 'DELETE' });
    dispatch({ type: 'SET_APPOINTMENTS', payload: state.appointments.filter(app => app.id !== id) });
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Appointment History</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.appointments.map(appointment => (
            <tr key={appointment.id}>
              <td>{state.patients.find(p => p.id === appointment.patientId)?.name}</td>
              <td>{state.doctors.find(d => d.id === appointment.doctorId)?.name}</td>
              <td>{appointment.date}</td>
              <td>
                <button onClick={() => handleDelete(appointment.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentHistory;