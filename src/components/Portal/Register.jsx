import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const useQuery = () =>{return new  URLSearchParams(useLocation().search)}
const Register = () => {
  const query = useQuery()
  const role = query.get('role') 
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      password: '',
      age: '',
      gender:'',

    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      username: Yup.string().required('Required').min(8,'minimum username of 8 chars '),
      password: Yup.string().required('Required'),
      age: Yup.number().required('Required').positive().integer(),
      gender: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      try {
        if(role === "doctor"){
        const specialization =window.prompt('Enter your specialization')
        const dataUser = {...values,specialization,role}
        const dataDoctor = {name:values.name,specialization}
        await axios.post('http://localhost:5000/doctors',dataDoctor)
        await axios.post('http://localhost:5000/users', dataUser);
        toast.success('Registration successful! Logging in...');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);}
        if(role==='patient'){
          const medicalHistory =window.prompt('if you have medical history type it here')
          const dataUser = {...values,role}


          const dataPatient = {...dataUser,medicalHistory}
          await axios.post('http://localhost:5000/patients',dataPatient)
          await axios.post('http://localhost:5000/users',dataUser );
          toast.success('Registration successful! Logging in...');
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);}
        }
      catch (error) {
        toast.error('Registration failed: ' + error.response?.data?.message || error.message);
      }
    },
  });
  return (
    <div className="register-container p-4 mt-4">
      <div className="register-form">
        <h1 className="text-2xl font-bold mb-6">Register As {role}</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
            {formik.errors.name && formik.touched.name && <div className="text-red-500 text-sm">{formik.errors.name}</div>}
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
            {formik.errors.username && formik.touched.username && <div className="text-red-500 text-sm">{formik.errors.username}</div>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
            {formik.errors.password && formik.touched.password && <div className="text-red-500 text-sm">{formik.errors.password}</div>}
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              onChange={formik.handleChange}
              value={formik.values.age}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
            {formik.errors.age && formik.touched.age && <div className="text-red-500 text-sm">{formik.errors.age}</div>}
          </div>
          <div>
            <label htmlFor="male" className="block text-sm font-medium text-gray-700">Male</label>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked= {formik.values.gender ==="male"}
              onChange={formik.handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
             <label htmlFor="female" className="block text-sm font-medium text-gray-700">Female</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value= "female"
              onChange={formik.handleChange}
              checked= {formik.values.gender ==="female"}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
            {formik.errors.gender && formik.touched.gender && <div className="text-red-500 text-sm">{formik.errors.age}</div>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;