import { useForm } from "react-hook-form";
import axios from "axios";

export default function StudentReg() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userID: "",
      userName: "",
      userEmail: "",
      userBranch: "",
      userNumber: "",
      userPassword: "",
      confirmPassword: "",
    },
    mode: "onBlur",
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: true,
    reValidateMode: "onChange",
    submitFocusError: true,
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8085/user/register", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto my-8 p-8 bg-white shadow-lg rounded-lg"
    >
      <label htmlFor="userID" className="block font-medium mb-1">
        User ID
      </label>
      <input
        type="text"
        {...register("userID", {
          required: "User ID is required",
        })}
        id="userID"
        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      {errors.userID && <p className="text-red-500">{errors.userID.message}</p>}
      <label htmlFor="userName" className="block font-medium mb-1">
        User Name
      </label>
      <input
        type="text"
        {...register("userName", {
          required: "User Name is required",
        })}
        id="userName"
        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      {errors.userName && (
        <p className="text-red-500">{errors.userName.message}</p>
      )}
      <label htmlFor="userEmail" className="block font-medium mb-1">
        User Email
      </label>
      <input
        type="email"
        {...register("userEmail", {
          required: "User Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "User Email must be a valid email address",
          },
        })}
        id="userEmail"
        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      {errors.userEmail && (
        <p className="text-red-500">{errors.userEmail.message}</p>
      )}
      <label htmlFor="userBranch" className="block font-medium mb-1">
        User Branch
      </label>
      <select
        {...register("userBranch", {
          required: "User Branch is required",
        })}
        id="userBranch"
        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="">Select Branch</option>
        <option value="IT">Information Technology</option>
        <option value="CS">Computer Science</option>
        <option value="ECE">Electronics and Communication Engineering</option>
        <option value="ME">Mechanical Engineering</option>
      </select>
      {errors.userBranch && (
        <p className="text-red-500">{errors.userBranch.message}</p>
      )}
      <label htmlFor="userNumber" className="block font-medium mb-1">
        User Number
      </label>
      <input
        type="tel"
        {...register("userNumber", {
          required: "User Number is required",
        })}
        id="userNumber"
        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      {errors.userNumber && (
        <p className="text-red-500">{errors.userNumber.message}</p>
      )}
      bash Copy code
      <label htmlFor="userPassword" className="block font-medium mb-1">
        User Password
      </label>
      <input
        type="password"
        {...register("userPassword", {
          required: "User Password is required",
        })}
        id="userPassword"
        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      {errors.userPassword && (
        <p className="text-red-500">{errors.userPassword.message}</p>
      )}
      <label htmlFor="confirmPassword" className="block font-medium mb-1">
        Confirm Password
      </label>
      <input
        type="password"
        {...register("confirmPassword", {
          required: "Confirm Password is required",
          validate: (value) =>
            value === getValues("userPassword") || "Passwords do not match",
        })}
        id="confirmPassword"
        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      {errors.confirmPassword && (
        <p className="text-red-500">{errors.confirmPassword.message}</p>
      )}
      <button
        type="submit"
        className="w-full bg-indigo-500 text-white rounded-md py-2 px-4 mt-4 hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </form>
  );
}
