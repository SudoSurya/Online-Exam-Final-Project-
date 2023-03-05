import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function StudentReg() {
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8088/user/register", data)
      .then((response) => {
        alert(response.data);
        setRegistered(true);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
  if (registered) {
    return <Navigate to="/student/login" />;
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm mx-auto mt-8 bg-white rounded-lg shadow-md p-6"
      >
        <div className="mb-4">
          <label
            htmlFor="userID"
            className="block text-gray-700 font-bold mb-2"
          >
            User ID
          </label>
          <input
            type="text"
            id="userID"
            name="userID"
            {...register("userID", { required: true })}
            className={`w-full p-2 border rounded ${
              errors.userID ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.userID && (
            <span className="text-red-500">User ID is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="userName"
            className="block text-gray-700 font-bold mb-2"
          >
            User Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            {...register("userName", { required: true })}
            className={`w-full p-2 border rounded ${
              errors.userName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.userName && (
            <span className="text-red-500">User Name is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="userEmail"
            className="block text-gray-700 font-bold mb-2"
          >
            User Email
          </label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            {...register("userEmail", { required: true })}
            className={`w-full p-2 border rounded ${
              errors.userEmail ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.userEmail && (
            <span className="text-red-500">User Email is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="userBranch"
            className="block text-gray-700 font-bold mb-2"
          >
            User Branch
          </label>
          <select
            id="userBranch"
            name="userBranch"
            {...register("userBranch", { required: true })}
            className={`w-full p-2 border rounded ${
              errors.userBranch ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select a branch</option>
            <option value="Computer Science and Engineering">
              Computer Science and Engineering
            </option>
            <option value="Electronics and Communication Engineering">
              Electronics and Communication Engineering
            </option>
            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>
            <option value="Civil Engineering">Civil Engineering</option>
          </select>

          {errors.userBranch && (
            <span className="text-red-500">User Branch is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="userNumber"
            className="block text-gray-700 font-bold mb-2"
          >
            Mobile Number
          </label>
          <input
            type="text"
            id="userNumber"
            name="userNumber"
            {...register("userNumber", { required: true })}
            className={`w-full p-2 border rounded ${
              errors.userNumber ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.userNumber && (
            <span className="text-red-500">User Number is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="userPassword"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="userPassword"
            name="userPassword"
            {...register("userPassword", { required: true })}
            className={`w-full p-2 border rounded ${
              errors.userPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.userPassword && (
            <span className="text-red-500">Password is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 font-bold mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            {...register("confirmPassword", { required: true })}
            className={`w-full p-2 border rounded ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.confirmPassword && (
            <span className="text-red-500">Confirm Password is required</span>
          )}
        </div>
        <button
          type="submit"
          className={`w-full p-2 mt-4 bg-blue-500 text-white rounded ${
            loading ? "cursor-wait" : "hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}
