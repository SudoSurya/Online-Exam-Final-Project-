import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { store } from "../../App";

function AdminLogin() {
  const [adminToken, setAdminToken] = useContext(store);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState("");

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8088/admin/login", data)
      .then((res) => {
        localStorage.setItem("admintoken", res.data.token);
        setAdminToken(localStorage.getItem("admintoken"));
      })
      .catch((err) => {
        setLoginError(err.response.data);
      });
  };

  if (adminToken) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-medium mb-6 text-center text-gray-800">
          Admin Login
        </h2>
        {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="adminID"
          >
            Admin ID
          </label>
          <input
            {...register("adminID", { required: true })}
            className="border rounded-lg px-3 py-2 w-full"
            type="text"
            id="adminID"
          />
          {errors.adminID && (
            <p className="text-red-500 mt-1">Admin ID is required</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="adminPass"
          >
            Admin Password
          </label>
          <input
            {...register("adminPass", { required: true })}
            className="border rounded-lg px-3 py-2 w-full"
            type="password"
            id="adminPass"
          />
          {errors.adminPass && (
            <p className="text-red-500 mt-1">Admin Password is required</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-pink-600 text-white rounded-lg px-4 py-2 hover:bg-pink-700 w-full"
        >
          Login
        </button>
        <p className="text-center text-gray-800 mt-4">
          Don't have an account?{" "}
          <Link
            to="/admin/register"
            className="text-blue-600 hover:text-blue-700"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default AdminLogin;
