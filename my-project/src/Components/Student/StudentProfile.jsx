import StudentNav from "./StudentNav";
import { userStore } from "../../App";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import React from "react";

export default function StudentProfile() {
  const [studentToken, setStudentToken] = useContext(userStore);
  const [studentData, setStudentData] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8088/user/dashboard", {
        headers: {
          "x-token": studentToken,
        },
      })
      .then((res) => {
        setStudentData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!studentToken) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <StudentNav />
      <section className="flex flex-col items-center justify-center h-full mt-28">
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 rounded-lg overflow-hidden shadow-lg bg-white">
          <div className="bg-indigo-600 py-4 px-6">
            <h1 className="text-white text-xl font-bold">Student Data</h1>
          </div>
          <div className="p-6">
            <table className="table-auto w-full border-collapse">
              <tbody>
                <tr>
                  <td className="font-semibold text-gray-700 py-2">
                    Student Name:
                  </td>
                  <td className="text-gray-600 py-2">
                    {studentData && studentData.userName}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-700 py-2">
                    Student ID:
                  </td>
                  <td className="text-gray-600 py-2">
                    {studentData && studentData.userID}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-700 py-2">Email:</td>
                  <td className="text-gray-600 py-2">
                    {studentData && studentData.userEmail}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-700 py-2">Branch:</td>
                  <td className="text-gray-600 py-2">
                    {studentData && studentData.userBranch}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-700 py-2">Number:</td>
                  <td className="text-gray-600 py-2">
                    {studentData && studentData.userNumber}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
