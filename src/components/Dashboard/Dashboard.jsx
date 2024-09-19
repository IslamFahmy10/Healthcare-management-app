import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { UserGroupIcon, UserCircleIcon, BellAlertIcon } from "@heroicons/react/16/solid";

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch patients and appointments data from the server
    const fetchData = async () => {
      try {
        const patientsResponse = await axios.get(
          "http://localhost:5000/patients"
        );
        const appointmentsResponse = await axios.get(
          "http://localhost:5000/appointments"
        );
        const doctors = await axios.get("http://localhost:5000/doctors");
        setPatients(patientsResponse.data);
        setAppointments(appointmentsResponse.data);
        setDoctors(doctors.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Example chart data
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Number of Appointments",
        data: appointments.map((app) => app.count), // Adjust based on your data structure
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container w-3/4">
      <div className="m-16 w-full rounded-lg flex gap-3 flex-row justify-start  flex-wrap">
        <div className="w-1/3  p-2 bg-green-400  rounded-lg flex flex-row justify-start  flex-wrap">
          <div className="w-1/5 flex  justify-center align-middle">
            <UserGroupIcon className=" font-thin text-white" />
          </div>
          <div className=" m-4 flex flex-col">
            <p className="w-full font-bold">Doctors in service</p>
            <span className="text-2xl">{doctors.length}</span>
          </div>
        </div>
        <div className="w-1/3  p-2 bg-green-400  rounded-lg flex flex-row justify-start  flex-wrap">
          <div className="w-1/4 flex  justify-center align-middle">
            <UserCircleIcon className=" font-thin text-white" />
          </div>
          <div className=" m-4 flex flex-col">
            <p className="w-full font-bold">Our Patients</p>
            <span className="text-2xl">{patients.length}</span>
          </div>
        </div>
        <div className="w-1/3  p-2 bg-green-400  rounded-lg flex flex-row justify-start  flex-wrap">
          <div className="w-1/6 flex  justify-center align-middle">
            <BellAlertIcon className=" font-thin text-white" />
          </div>
          <div className=" m-4 flex flex-col">
            <p className="w-full font-bold">Upcoming Appointments</p>
            <span className="text-2xl">{appointments.length}</span>
          </div>
        </div>
        <div></div>
      </div>
      <div className="chart-container">
        <Line data={chartData} />
      </div>
      <div className="patients-info bg-slate-400/50 m-4 rounded p-4">
        <h2 className="text-xl rounded-lg text-blue-700 text-center font-semibold">
          Recent Patients
        </h2>
        <ul>
          {patients.map((patient) => (
            <li key={patient.id}>
              {patient.name} - Age: {patient.age}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
