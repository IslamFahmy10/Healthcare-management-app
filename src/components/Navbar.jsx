import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, UserIcon, CalendarIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  return (
    <nav className="navbar bg-blue-500 text-white fixed w-full top-0 left-0 flex items-center justify-between p-4">
      <div className="logo text-2xl font-bold">
        <Link to="/">Clinic</Link>
      </div>
      <div className="nav-links flex space-x-4">
        <Link to="/dashboard" className="flex items-center">
          <HomeIcon className="w-6 h-6" />
          <span className="ml-2">Dashboard</span>
        </Link>
        <Link to="/profile" className="flex items-center">
          <UserIcon className="w-6 h-6" />
          <span className="ml-2">Register Patient</span>
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