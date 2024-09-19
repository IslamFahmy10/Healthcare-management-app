
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import ProfilePatient from './components/Profile/ProfilePatient'; // Make sure you have this component
import Appointments from './components/Appointments/Appointments'; // Make sure you have this component
import Login from './components/Portal/Login';
import Register from './components/Portal/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterType from './components/RegisterType';
import ProfileDoctor from './components/Profile/ProfileDoctor';

const App = () => {
  return (
    <Router>
        <Navbar />
        <div className='pt-10'>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profilePatient" element={<ProfilePatient />} />
          <Route path="/profileDoctor" element={<ProfileDoctor />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registerType" element={<RegisterType />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ToastContainer />
        </div>
       
    </Router>
  );
};

export default App;