import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { userStore } from "../../App";
export default function StudentLogin() {
  const [studentToken, setStudentToken] = useContext(userStore);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState("");

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8088/user/login", data)
      .then((res) => {
        localStorage.setItem("studenttoken", res.data.token);
        setStudentToken(localStorage.getItem("admintoken"));
      })
      .catch((res) => {
        // alert(res.message);
        alert(res.response.data.message);
      });
  };
  if (studentToken) {
    return <Navigate to="/student/dashboard" />;
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-medium mb-6">Student Login</h2>
        {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="userID"
          >
            Student ID
          </label>
          <input
            {...register("userID", { required: true })}
            className="border rounded-lg px-3 py-2 w-full"
            type="text"
            id="userID"
          />
          {errors.userID && (
            <p className="text-red-500 mt-1">Student ID is required</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="userPassword"
          >
            Password
          </label>
          <input
            {...register("userPassword", { required: true })}
            className="border rounded-lg px-3 py-2 w-full"
            type="password"
            id="userPassword"
          />
          {errors.userPassword && (
            <p className="text-red-500 mt-1">Password is required</p>
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
