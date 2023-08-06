import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { UserContext } from "../../Types/StoresContext";
import { ResponseToken } from "../../Types/FormDataTypes";
interface StudentLoginProps {
  userID: string;
  userPassword: string;
}

export default function StudentLogin() {
  const {studentToken,login} = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentLoginProps>();
  const [loginError, setLoginError] = useState("");

  const onSubmit = (data:StudentLoginProps) => {
    axios
      .post("http://localhost:8088/user/login", data)
      .then((res:AxiosResponse<ResponseToken>) => {
        localStorage.setItem("studenttoken", res.data.token);
        login(res.data.token);
      })
      .catch((error: unknown) => {
        const axiosError = error as AxiosError;
        const responseData =
          axiosError?.response?.data ?? "Unknown error occurred";
        setLoginError(responseData as string);
        alert(responseData);
        console.log(responseData);
      });
  };
  if (studentToken) {
    return <Navigate to="/student/profile" />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <form
        onSubmit={void handleSubmit(onSubmit)}
        className="bg-white p-10 rounded-lg shadow-md"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Student Login
        </h2>
        {loginError && (
          <p className="text-red-500 mb-4 text-center">{loginError}</p>
        )}
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
          className="bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 w-full"
        >
          Login
        </button>
        <div className="flex justify-between mt-4 text-sm">
          <Link to="/student/register" className="text-blue-500">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
}
