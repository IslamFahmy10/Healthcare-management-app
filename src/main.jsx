import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PatientProvider } from './context/PatientContext';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <PatientProvider>
    <ToastContainer />
    <App />
  </PatientProvider>,
)
