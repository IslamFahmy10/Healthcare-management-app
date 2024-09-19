import { Link } from 'react-router-dom';
import { HomeIcon, UserIcon, CalendarIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline';
import logo from '../assets/hospital-logo-design-vector-medical-cross_53876-136743.avif'

const Navbar = () => {
  return (
    <nav className="navbar bg-blue-500 text-white fixed w-full top-0 left-0 flex items-center justify-between p-3 z-10">
      <div className="w-12 logo text-2xl font-bold">
        <Link className='w-full flex flex-row justify-start align-middle font-serif' to="/">
        <img className='w-full h-12 rounded-full' src={logo}/>
        <span className=' p-2 ml-2 '>ClinicX</span></Link>
      </div>
      <div className="nav-links flex space-x-4">
        <Link to="/dashboard" className="flex items-center">
          <HomeIcon className="w-6 h-6" />
          <span className="ml-2">Dashboard</span>
        </Link>
        <Link to="/profilePatient" className="flex items-center">
          <UserIcon className="w-6 h-6" />
          <span className="ml-2">My Profile</span>
        </Link>
        <Link to="/appointments" className="flex items-center">
          <CalendarIcon className="w-6 h-6" />
          <span className="ml-2">Schedule Appointment</span>
        </Link>
        <Link to="/login" className="flex items-center">
          <ArrowLeftEndOnRectangleIcon className="w-6 h-6" />
          <span className="ml-2">Login</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;