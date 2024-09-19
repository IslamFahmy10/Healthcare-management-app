import Modal from "react-modal";
import "./AppointmentModal.css";

Modal.setAppElement("#root");

const AppointmentModal = ({ isOpen, onRequestClose, data }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Appointment Details"
      className="modal-content bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 rounded-lg shadow-xl text-white"
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Your Appointment Details</h2>
      <div className="space-y-2">
        <p><strong>Description:</strong> {data?.description}</p>
        <p>
          <strong>Time:</strong> {data?.time} <span className="ml-2"><strong>Date:</strong> {data?.date}</span>
        </p>
        <p><strong>Patient Name:</strong> {data?.patientName}</p>
      </div>
      <button
        onClick={onRequestClose}
        className="mt-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Close
      </button>
    </Modal>
  );
};

export default AppointmentModal;