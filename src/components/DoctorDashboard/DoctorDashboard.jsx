import React, { useContext } from 'react';
import PatientContext from '../../context/PatientContext';
import { Line } from 'react-chartjs-2';

const DoctorDashboard = () => {
  const { state } = useContext(PatientContext);

  const appointmentData = state.appointments.map(appointment => ({
    date: appointment.date,
    patient: state.patients.find(p => p.id === appointment.patientId)?.name,
    doctor: state.doctors.find(d => d.id === appointment.doctorId)?.name,
  }));

  const chartData = {
    labels: appointmentData.map(data => data.date),
    datasets: [
      {
        label: 'Appointments',
        data: appointmentData.map(data => data.patient),
        borderColor: '#1363DF',
        backgroundColor: '#1363DF',
      },
    ],
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Doctor Dashboard</h2>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Line data={chartData} />
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Upcoming Appointments</h3>
        <ul>
          {appointmentData.map((appointment, index) => (
            <li key={index}>
              {appointment.date} - {appointment.patient} with Dr. {appointment.doctor}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorDashboard;