import { useFormik } from "formik";

import { toast } from "react-toastify";
import patient1 from "../assets/patient1.jpg";
import doctor6 from "../assets/doctor6.jpg";

function RegisterType() {
  const formik = useFormik({
    initialValues: {
      role: "",
    },

    onSubmit: (values) => {
      try {
        if (values.role === "patient" ||values.role === "doctor") {
      
          window.location.href = `/register?role=${values.role}`;
        } 
        else { toast.error("Invalid type");   }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="bg-custom-pattern bg-cover bg-center">
      <div className=" bg-gradient-to-r from-blue-500/50 to-purple-500/50 min-h-screen flex flex-col items-center justify-center">
        <h1 className="w-full merriweather-bold text-center text-4xl">
          Welcome to Our Community
        </h1>
        <form
          className="bg-blue-300/50 rounded-full p-12 m-4 w-3/4 flex flex-row gap-5 justify-around h-96 text-2xl"
          onSubmit={formik.handleSubmit}
        >
          <div className="w-1/3 rounded-xl  flex flex-col align-middle justify-center hover:scale-110 transition-all ease-in-out duration-500" 
            style={{
              backgroundImage: `url(${patient1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          > 
          <div className="bg-gray-400/55"><input
              className="p-4 m-4 font-extrabold"
              id="patient"
              type="radio"
              name="role"
              value="patient"
              onChange={formik.handleChange}
              checked={formik.values.role === "patient"}
            />
            <label htmlFor="patient" className="w-full p-4 m-4 font-extrabold z-10 text-white">
              Patient
            </label></div>
            
          </div>
          <div className="w-1/3 rounded-xl hover:scale-110 transition-all ease-in-out duration-500 flex flex-col align-middle justify-center"
            style={{
              backgroundImage: `url(${doctor6})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              
            }}
          >
            <div className="bg-gray-400/55"><input
              className="p-2 m-4 font-extrabold "
              id="doctor"
              type="radio" 
              name="role"
              value="doctor"
              onChange={formik.handleChange}
              checked={formik.values.role === "doctor"}
            />
            <label htmlFor="doctor" className="w-full p-2 m-4 font-extrabold z-10 text-white">
              Doctor
            </label></div>
            
          </div>

          <button
            className="px-8   py-2 mr-7 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
            type="submit"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterType;
