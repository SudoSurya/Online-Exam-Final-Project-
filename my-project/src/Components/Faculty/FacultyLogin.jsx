import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { facultyStore } from "../../App";
export default function FacultyLogin() {
  const [facultyToken, setFacultyToken] = useContext(facultyStore);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState("");

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8088/faculty/login", data)
      .then((res) => {
        localStorage.setItem("facultytoken", res.data.token);
        setStudentToken(localStorage.getItem("facultytoken"));
      })
      .catch((res) => {
        // alert(res.message);
        alert(res.response.data.message);
      });
  };
  if (facultyToken) {
    return <Navigate to="/faculty/dashboard" />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 rounded-lg shadow-md"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Faculty Login
        </h2>
        {loginError && (
          <p className="text-red-500 mb-4 text-center">{loginError}</p>
        )}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="userID"
          >
            Faculty Email
          </label>
          <input
            {...register("facultyEmail", { required: true })}
            className="border rounded-lg px-3 py-2 w-full"
            type="email"
            id="facultyEmail"
          />
          {errors.facultyEmail && (
            <p className="text-red-500 mt-1">Email is required</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            {...register("password", { required: true })}
            className="border rounded-lg px-3 py-2 w-full"
            type="password"
            id="password"
          />
          {errors.password && (
            <p className="text-red-500 mt-1">Password is required</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 w-full"
        >
          Login
        </button>
        <div className="flex justify-between mt-4 text-sm">
          <Link to="/faculty/register" className="text-blue-500">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
}
