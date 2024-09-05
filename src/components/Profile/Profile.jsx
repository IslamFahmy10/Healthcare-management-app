import React, { useContext } from 'react';
import PatientContext from '../../context/PatientContext';
import './Profile.css';
import ProfileP from '../../assets/profileP.jpg'; // Import a default profile picture

const Profile = () => {
  const { state } = useContext(PatientContext);
  const user = state.currentUser; // Assuming `currentUser` is set in the context

  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-content">
          <div className="profile-cover">
            <div className="profile-picture">
              <img
                src={user.profilePicture || ProfileP} // Use default if not set
                alt="Profile"
                className="profile-img"
              />
            </div>
            <div className="profile-info">
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <p className="text-xl mb-1">Username: {user.username}</p>
              <p className="text-xl mb-1">Age: {user.age}</p>
              {/* Add more profile details if needed */}
            </div>
          </div>
        </div>
      ) : (
        <div className="welcome-message">
          <h1>Welcome to Your Clinic</h1>
          <p>More than health and comfort</p>
        </div>
      )}
    </div>
  );
};

export default Profile;