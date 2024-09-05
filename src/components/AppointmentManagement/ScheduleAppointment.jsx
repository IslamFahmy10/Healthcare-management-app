import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import PatientContext from '../../context/PatientContext';

const ScheduleAppointment = () => {
  const { state, dispatch } = useContext(PatientContext);

  const validationSchema = Yup.object().shape({
    patientId: Yup.number().required('Patient is required'),
    doctorId: Yup.number().required('Doctor is required'),
    date: Yup.date().required('Date is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const res = await fetch('http://localhost:5000/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const newAppointment = await res.json();
    dispatch({ type: 'SET_APPOINTMENTS', payload: [...state.appointments, newAppointment] });
    resetForm();
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Schedule Appointment</h2>
      <Formik
        initialValues={{ patientId: '', doctorId: '', date: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <div>
            <label>Patient</label>
            <Field as="select" name="patientId" className="input">
              <option value="">Select Patient</option>
              {state.patients.map(patient => (
                <option key={patient.id} value={patient.id}>{patient.name}</option>
              ))}
            </Field>
            <ErrorMessage name="patientId" component="div" className="text-red-500" />
          </div>
          <div>
            <label>Doctor</label>
            <Field as="select" name="doctorId" className="input">
              <option value="">Select Doctor</option>
              {state.doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
              ))}
            </Field>
            <ErrorMessage name="doctorId" component="div" className="text-red-500" />
          </div>
          <div>
            <label>Date</label>
            <Field name="date" type="date" className="input" />
            <ErrorMessage name="date" component="div" className="text-red-500" />
          </div>
          <button type="submit" className="btn">Schedule</button>
        </Form>
      </Formik>
    </div>
  );
};

export default ScheduleAppointment;