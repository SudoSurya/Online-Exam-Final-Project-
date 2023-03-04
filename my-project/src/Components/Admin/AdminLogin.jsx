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
    axios.post("http://localhost:8087/admin/login", data).then((res) => {
      localStorage.setItem("admintoken", res.data.token);
      setAdminToken(localStorage.getItem("admintoken"));
    });
  };
  if (adminToken) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-medium mb-6">Admin Login</h2>
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
          className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
