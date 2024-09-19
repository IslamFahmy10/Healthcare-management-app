import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { useContext } from "react";
import { LoggedContext } from "../../context/logged-context";


const Login = () => {
  const {
    logged,
    setLogged,
    userId,
    setUserId,
    role,
    setRole,
    username,
    setUsername,
    name,
    setName,
  } = useContext(LoggedContext);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.get("http://localhost:5000/users", {
          params: { username: values.username, password: values.password },
        });

        if (response.data.length > 0) {
          toast.success("Login successful!");
          console.log(response.data);
          const userData = response.data[0];
          setLogged(true);
          setUserId(userData.id);
          setRole(userData.role);
          setName(userData.name);
          localStorage.setItem("logged", "true");
          localStorage.setItem("user", JSON.stringify(userData));

          if (userData.role === "patient") {
            window.location.href = "/profilePatient";
          } else if (userData.role === "doctor") {
            window.location.href = "/ProfileDoctor";
          }
        } else {
          toast.error("Invalid username or password");
        }
      } catch (error) {
        toast.error(
          "Login failed: " + error.response?.data?.message || error.message
        );
      }
    },
  });

  return (
    <div className="login-container p-4 m-4">
      <div className="login-form">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
            {formik.errors.username && formik.touched.username && (
              <div className="text-red-500 text-sm">
                {formik.errors.username}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            <span>Do not have an account? </span>
            <a href="/registerType" className="text-blue-500 hover:underline">
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
