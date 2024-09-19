import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import { LoggedProvider } from './context/logged-context.jsx';

createRoot(document.getElementById('root')).render(
  <LoggedProvider>
  <ToastContainer />
    <App />
</LoggedProvider>
    
)
