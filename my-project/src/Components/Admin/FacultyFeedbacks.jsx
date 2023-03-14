import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AdminNav from "./AdminNav";
import useFeedback from "../Student/useFeedback";
export default function FacultyFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [faculty] = useFeedback();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    axios
      .get(`http://localhost:8088/user/feedback/${data.facultyName}`)
      .then((response) => {
        setFeedbacks(response.data);
        console.log(response.data);
      });
  };
  return (
    <>
      <AdminNav />
      <div className="flex flex-col justify-center items-center my-10 ">
        <div className="bg-white shadow-md rounded-lg w-full max-w-2xl">
          <div className="py-4 px-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="faculty"
                  className="block text-gray-800 font-bold mb-2"
                >
                  Faculty
                </label>
                <select
                  id="facultyName"
                  {...register("facultyName", { required: true })}
                  className={`border border-gray-400 rounded w-full py-2 px-3 ${
                    errors.faculty ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select a faculty member</option>
                  {faculty &&
                    faculty.map((option, index) => (
                      <option key={index} value={option.facultyName}>
                        {option.facultyName}
                      </option>
                    ))}
                </select>
                {errors.facultyName && (
                  <p className="text-red-500 mt-2">Faculty name is required</p>
                )}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
                >
                  Get Feedbacks
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 place-items-center py-10  mx-auto ">
        <h1 className="text-2xl">"Student Feedbacks"</h1>
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="bg-white rounded-lg shadow-lg w-1/2 p-6"
            >
              <p className="text-gray-700 font-medium">{feedback.feedback}</p>
              <p className="text-green-500">-- Student feedback</p>
            </div>
          ))
        ) : (
          <div>No Feedbacks Avaiable</div>
        )}
      </div>
    </>
  );
}
