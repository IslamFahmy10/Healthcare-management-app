
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import PatientContext from '../../context/PatientContext';

const PatientRegistration = () => {
  const { dispatch } = useContext(PatientContext);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    age: Yup.number().required('Age is required').positive().integer(),
    gender: Yup.string().required('Gender is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const res = await fetch('http://localhost:5000/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const newPatient = await res.json();
    dispatch({ type: 'SET_PATIENTS', payload: [...state.patients, newPatient] });
    resetForm();
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register New Patient</h2>
      <Formik
        initialValues={{ name: '', age: '', gender: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <div>
            <label>Name</label>
            <Field name="name" type="text" className="input" />
            <ErrorMessage name="name" component="div" className="text-red-500" />
          </div>
          <div>
            <label>Age</label>
            <Field name="age" type="number" className="input" />
            <ErrorMessage name="age" component="div" className="text-red-500" />
          </div>
          <div>
            <label>Gender</label>
            <Field as="select" name="gender" className="input">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Field>
            <ErrorMessage name="gender" component="div" className="text-red-500" />
          </div>
          <button type="submit" className="btn">Register</button>
        </Form>
      </Formik>
    </div>
  );
};


export default PatientRegistration;