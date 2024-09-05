import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const formik = useFormik({
    initialValues: {
      patientName: '',
      date: '',
      time: '',
      description: '',
    },
    validationSchema: Yup.object({
      patientName: Yup.string().required('Required'),
      date: Yup.date().required('Required'),
      time: Yup.string().required('Required'),
      description: Yup.string(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post('http://localhost:5000/appointments', values);
        toast.success('Appointment scheduled successfully!');
        resetForm();
        // Refresh appointments list
        const response = await axios.get('http://localhost:5000/appointments');
        setAppointments(response.data);
      } catch (error) {
        toast.error('Error scheduling appointment: ' + error.response?.data?.message || error.message);
      }
    },
  });

  return (
    <div className="appointments-container p-4 m-4">
      <h1 className="text-2xl font-bold mb-4">Schedule Appointment</h1>
      <form onSubmit={formik.handleSubmit} className="mb-6 bg-gray-400/35 p-4 rounded">
        <div className="form-group mb-4">
          <label htmlFor="patientName" className="block text-sm font-medium">Patient Name</label>
          <input
            id="patientName"
            name="patientName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.patientName}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
          {formik.errors.patientName && <div className="text-red-500 text-sm">{formik.errors.patientName}</div>}
        </div>
        <div className="form-group mb-4">
          <label htmlFor="date" className="block text-sm font-medium">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.date}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
          {formik.errors.date && <div className="text-red-500 text-sm">{formik.errors.date}</div>}
        </div>
        <div className="form-group mb-4">
          <label htmlFor="time" className="block text-sm font-medium">Time</label>
          <input
            id="time"
            name="time"
            type="time"
            onChange={formik.handleChange}
            value={formik.values.time}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
          {formik.errors.time && <div className="text-red-500 text-sm">{formik.errors.time}</div>}
        </div>
        <div className="form-group mb-4">
          <label htmlFor="description" className="block text-sm font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Schedule Appointment</button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
      <div className="appointments-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="appointment-card bg-white shadow-md rounded-md p-4">
            <h3 className="text-lg font-semibold">{appointment.patientName}</h3>
            <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {appointment.time}</p>
            <p><strong>Description:</strong> {appointment.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;