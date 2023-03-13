import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const FacultyRegister = () => {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSubmitting(true);
    axios
      .post("http://localhost:8088/faculty/register", data)
      .then((response) => {
        console.log(response);
        alert(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
        console.log(error.response.data.message);
      });
    setSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gradient-to-r from-green-400 to-blue-500 p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4 text-white">
        Faculty Registration
      </h2>

      <div className="mb-4">
        <label
          htmlFor="facultyName"
          className="block text-white font-bold mb-2"
        >
          Faculty Name
        </label>
        <input
          type="text"
          id="facultyName"
          {...register("facultyName", { required: true })}
          className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.facultyName && "border-red-500"
          }`}
        />
        {errors.facultyName && (
          <span className="text-red-500">Faculty Name is required</span>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="facultyNumber"
          className="block text-white font-bold mb-2"
        >
          Faculty Number
        </label>
        <input
          type="text"
          id="facultyNumber"
          {...register("facultyNumber", { required: true })}
          className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.facultyNumber && "border-red-500"
          }`}
        />
        {errors.facultyNumber && (
          <span className="text-red-500">Faculty Number is required</span>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="facultyEmail"
          className="block text-white font-bold mb-2"
        >
          Faculty Email
        </label>
        <input
          type="email"
          id="facultyEmail"
          {...register("facultyEmail", { required: true })}
          className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.facultyEmail && "border-red-500"
          }`}
        />
        {errors.facultyEmail && (
          <span className="text-red-500">Faculty Email is required</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-white font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
          className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.password && "border-red-500"
          }`}
        />
        {errors.password && (
          <span className="text-red-500">Password is required</span>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block text-white font-bold mb-2"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", { required: true })}
          className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.confirmPassword && "border-red-500"
          }`}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">Confirm Password is required</span>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting..." : "Register"}
      </button>
    </form>
  );
};

export default FacultyRegister;
