
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PatientProvider } from './context/PatientContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile'; // Make sure you have this component
import Appointments from './components/Appointments/Appointments'; // Make sure you have this component
import Login from './components/PatientPortal/Login';
import Register from './components/PatientPortal/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <PatientProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ToastContainer />
      </PatientProvider>
    </Router>
  );
};

export default App;