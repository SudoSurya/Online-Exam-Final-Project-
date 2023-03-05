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
      <section>
        <h1>{studentData && studentData.userName}</h1>
        <h1>{studentData && studentData.userEmail}</h1>
        <h1>{studentData && studentData.userBranch}</h1>
      </section>
    </>
  );
}
