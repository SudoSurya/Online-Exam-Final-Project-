import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { FacultyContext } from "../../Types/StoresContext";
interface FacultyLoginProps {
  facultyEmail: string;
  password: string;
}
interface ResponseData {
  token: string;
}

export default function FacultyLogin() {
  const { facultyToken, login } = useContext(FacultyContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FacultyLoginProps>();
  const [loginError, setLoginError] = useState<string>("");

  const onSubmit = (data: FacultyLoginProps) => {
    axios
      .post("http://localhost:8088/faculty/login", data)
      .then((res: AxiosResponse<ResponseData>) => {
        if (res.data.token) {
          login(res.data.token);
        }
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
  if (facultyToken) {
    return <Navigate to="/faculty/dashboard" />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit(onSubmit)(event);
        }}
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
