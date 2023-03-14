import React, { useState, useEffect } from "react";
import axios from "axios";
import FacultyNav from "./FacultyNav";

function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [facultyName] = useState(localStorage.getItem("facultyname"));
  useEffect(() => {
    axios
      .get(`http://localhost:8088/user/feedback/${facultyName}`)
      .then((response) => {
        setFeedbacks(response.data);
      });
  }, []);

  return (
    <>
      <FacultyNav />
      <div className="grid grid-cols-1 gap-4 place-items-center py-10 bg-gray-200  mx-auto ">
        <h1 className="text-2xl">Student Feedbacks</h1>
        {feedbacks.map((feedback) => (
          <div
            key={feedback._id}
            className="bg-white rounded-lg shadow-lg w-1/2 p-6"
          >
            <p className="text-gray-700 font-medium">{feedback.feedback}</p>
            <p className="text-green-500">-- Student feedback</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Feedbacks;
