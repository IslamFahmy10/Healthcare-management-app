import { useContext, useState, useEffect } from "react";
import "./Profile.css";
import ProfileP from "../../assets/profileP.jpg"; // Import a default profile picture
import axios from "axios";
import { LoggedContext } from "../../context/logged-context";
import { toast } from 'react-toastify';
 import { ClipboardDocumentListIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Loading from "../Loading";
import AppointmentModal from "../Appointments/AppointmentModal";

const ProfilePatient = () => {
  // Assuming `currentUser` is set in the context
  const { name, age, role, username } = useContext(LoggedContext);
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [myAppointments, setAppointments] = useState(null);
  const [oldDatesStrings, setOldDatesStrings] = useState(null);
  const [upcomingDatesStrings, setUpcomingDatesStrings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
const [myAppointmentModal, setMyAppointmentModal] = useState(null);



  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/patients", {
          params: { name: name },
        });
        const history =
          response.data[0]?.medicalHistory || "No history available";
        const appointments =
          response.data[0]?.appointments || "No appointments";
        setMedicalHistory(history);
        setAppointments(appointments);
        // -----------------Filtering Appointments--------------------
        if (Array.isArray(appointments)) {
          const dateObjects = appointments.map((date) => new Date(date));

          // Get today's date
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Set the time to midnight to ignore the time part

          // Separate the dates into old and upcoming
          const oldDates = dateObjects.filter((date) => date < today);
          const upcomingDates = dateObjects.filter((date) => date >= today);

          // Convert the Date objects back to strings (if needed)
          const oldDatesStrings = oldDates.map(
            (date) => date.toISOString().split("T")[0]
          );
          const upcomingDatesStrings = upcomingDates.map(
            (date) => date.toISOString().split("T")[0]
          );
          setOldDatesStrings(oldDatesStrings);
          setUpcomingDatesStrings(upcomingDatesStrings);

        }
      } catch (error) {
        console.error("Failed to fetch medical history", error);
        setMedicalHistory("Error fetching medical history");
        setAppointments("Error fetching appointments");
      }
    };

    if (name) {
      fetchHistory();
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);


  }, [name,isModalOpen,myAppointmentModal]);

  const deleteAppointment = async (date) => {
    console.log(date);
    
    try {
      // Update the local state
      const updatedAppointments = myAppointments.filter(
        (appointment) => appointment !== date
      );
      setAppointments(updatedAppointments);
      console.log("updated appointments :" + updatedAppointments);
      console.log("myAppointments : " + myAppointments);
      

      // Remove the date from the old or upcoming appointments array
      setOldDatesStrings(oldDatesStrings.filter((d) => d !== date));
      setUpcomingDatesStrings(upcomingDatesStrings.filter((d) => d !== date));
console.log(name);

      // Send a DELETE request to the server to update the appointments
      const response = await axios.get(`http://localhost:5000/patients?name=${name}`);
      const patient = response.data[0];
      console.log(patient);

      
      
      if (patient) {
        await axios.put(`http://localhost:5000/patients/${patient.id}`, {
          ...patient,
          appointments: updatedAppointments
      });
        toast.success('Appointment deleted successfully!');

        // Send a DELETE request to the appointments endpoint
const appointmentResponse = await axios.get(`http://localhost:5000/appointments?date=${date}`);
const appointmentId = appointmentResponse.data[0].id


        if (appointmentId) {
          await axios.delete(
            `http://localhost:5000/appointments/${appointmentId}`
          );
          toast.success('Appointment deleted successfully from General appointments !');
        }
      }
    } catch (error) {
      console.error("Failed to delete appointment", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const user = {
    name,
    username,
    age,
    role,
    profilePicture: ProfileP,
    medicalHistory,
  };

  const nav = () => {
    window.location.href = `/appointments?name=${user.name}`;
  };
  
// Modal setting functions :

const openModal = async(date) => {
    
const appointmentResponse = await axios.get(`http://localhost:5000/appointments?date=${date}`);
const appointmentData = appointmentResponse.data[0]
console.log(appointmentData);

   const myData = {
    description: appointmentData.description,
    time: appointmentData.time,
    date: appointmentData.date,
    patientName: appointmentData.patientName,
    doctorName: appointmentData.doctorName,
    doctorId: appointmentData.doctorId,
    patientId: appointmentData.patientId,
    id: appointmentData.id
   }
   setMyAppointmentModal(myData);

   setIsModalOpen(true);
   console.log(isModalOpen);
   console.log(myAppointmentModal);
   
}
const closeModal = () => {  
  setIsModalOpen(false);
setMyAppointmentModal(null);
}



  return (
    <div className="profile-container w-full">
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
          </div>
          <div className="flex flex-row justify-around align-text-top bg-[#6AC2E9]">
            <div className="profile-info bg-gradient-to-r from-sky-500/70 to-indigo-500/45 rounded-lg shadow-2xl p-4 w-1/2 m-3 h-2/4">
              <div className="flex flex-row justify-center align-middle p-2 m-2">
                <UserCircleIcon className="w-1/8 h-12" />
                <h1 className="w-2/4 text-3xl font-bold mb-2 capitalize ">
                  {user.name}
                </h1>
              </div>
              <p className="text-xl mb-1 bg-[#6A819D]/40 text-white rounded-2xl p-2 ">
                <span className="text-black font-bold text-left">
                  Username:
                </span>{" "}
                {user.username}
              </p>
              <p className="text-xl mb-1 bg-[#6A819D]/40 text-white rounded-2xl p-2 ">
                <span className="text-black font-bold text-left">Age:</span>{" "}
                {user.age}
              </p>
              <p className=" capitalize text-xl mb-1 bg-[#6A819D]/40 text-white rounded-2xl p-2 ">
                <span className="text-black font-bold text-left">
                  Medial history:
                </span>{" "}
                {user.medicalHistory}
              </p>
            </div>
            <div className="profile-info bg-gradient-to-r from-sky-500/70 to-indigo-500/45 rounded-lg shadow-2xl p-4 w-1/2 m-3 h-2/4">
              <div className="flex flex-row justify-center align-middle p-2 m-2">
                <ClipboardDocumentListIcon className="w-1/8 h-12" />
                <h1 className="text-3xl font-bold mb-2 capitalize ">
                  Appointments
                </h1>
              </div>

              {oldDatesStrings || upcomingDatesStrings ? (
                <div className=" flex flex-row justify-around">
                  <div className="w-1/2 bg-[#6AC2E9] rounded-xl p-2 m-2 ">
                    <h3 className="mx-auto w-4/5 p-2 m-2 rounded-2xl  font-bold bg-[#6A819D]/40">
                      In Past
                    </h3>
                    {oldDatesStrings.map((date, index) => (
                      <p key={index}>
                        <span>{index + 1}. </span>
                        {date}
                      </p>
                    ))}
                  </div>
                  <div className="w-1/2 p-2 bg-[#6AC2E9] rounded-xl  m-2 ">
                    <h3 className="w-4/5 p-2 m-2 rounded-2xl font-bold mx-auto bg-[#6A819D]/40">
                      Upcoming{" "}
                    </h3>
                    {upcomingDatesStrings.map((date, index) => (
                      <div
                        className="bg-white/70 rounded-3xl p-3 m-2 mx-auto w-full flex flex-row justify-between align-middle"
                        key={index}
                      >
                        <p className="mr-5">
                          <span>{index + 1}. </span> {date}
                        </p>
                        <div className="flex flex-row justify-start align-middle">
                          <button className="flex justify-center align-middle  p-1 rounded-full hover:bg-[#b9e5f8]">
                            <TrashIcon onClick={()=>{deleteAppointment(date)}} className="w-4 h-5 text-pink-800" />
                          </button>
                          <button onClick={()=>{openModal(date)}} className=" flex justify-center align-middle p-1 rounded-full hover:bg-[#b9e5f8]">
                            <EyeIcon className="w-4 h-5 text-green-800" />
                          </button>
                          <button></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p> There is no appointments for you till now</p>
                </div>
              )}

              <button
                onClick={nav}
                className="flex flex-row justify-center w-full  shadow-xl font-extrabold  bg-green-600 hover:bg-indigo-950  hover:text-white rounded-2xl p-4  m-2 "
              >
                <PencilSquareIcon className="w-1/8 h-8" />
                <span className="ml-2">New appointment</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="welcome-message">
          <h1>Welcome to Your Clinic</h1>
          <p>More than health and comfort</p>c
        </div>
      )}
      <AppointmentModal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      data={myAppointmentModal}/>
    </div>
  );
};

export default ProfilePatient;
