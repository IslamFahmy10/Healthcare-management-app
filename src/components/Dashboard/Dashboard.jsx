import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch patients and appointments data from the server
    const fetchData = async () => {
      try {
        const patientsResponse = await axios.get('http://localhost:5000/patients');
        const appointmentsResponse = await axios.get('http://localhost:5000/appointments');
        setPatients(patientsResponse.data);
        setAppointments(appointmentsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Example chart data
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Number of Appointments',
        data: appointments.map(app => app.count), // Adjust based on your data structure
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container w-3/4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="chart-container">
        <Line data={chartData} />
      </div>
      <div className="patients-info bg-slate-400/50 m-4 rounded p-4">
        <h2 className="text-xl rounded-lg text-blue-700 text-center font-semibold">Recent Patients</h2>
        <ul>
          {patients.map(patient => (
            <li key={patient.id}>{patient.name} - Age: {patient.age}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;