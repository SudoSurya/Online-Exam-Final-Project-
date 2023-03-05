import StudentNav from "./StudentNav";
import { userStore } from "../../App";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
export default function StudentDashboard() {
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
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!studentToken) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <StudentNav />
      <section class="flex flex-col items-center">
        <h1 class="text-4xl font-bold mb-4">
          {studentData && studentData.userName}
        </h1>
        <table class="table-auto border-collapse border border-gray-500">
          <tbody>
            <tr>
              <td class="border border-gray-500 px-4 py-2 font-semibold">
                StudentID:
              </td>
              <td class="border border-gray-500 px-4 py-2">
                {studentData && studentData.userID}
              </td>
            </tr>
            <tr>
              <td class="border border-gray-500 px-4 py-2 font-semibold">
                Email:
              </td>
              <td class="border border-gray-500 px-4 py-2">
                {studentData && studentData.userEmail}
              </td>
            </tr>
            <tr>
              <td class="border border-gray-500 px-4 py-2 font-semibold">
                Branch:
              </td>
              <td class="border border-gray-500 px-4 py-2">
                {studentData && studentData.userBranch}
              </td>
            </tr>
            <tr>
              <td class="border border-gray-500 px-4 py-2 font-semibold">
                Number:
              </td>
              <td class="border border-gray-500 px-4 py-2">
                {studentData && studentData.userNumber}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
