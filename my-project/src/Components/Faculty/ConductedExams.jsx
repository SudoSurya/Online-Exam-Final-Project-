import { useEffect, useState } from "react";
import axios from "axios";
import FacultyNav from "./FacultyNav";
import ExamInfo from "../Admin/ExamInfo";
export default function ConductedExams() {
  const [facultyName] = useState(localStorage.getItem("facultyname"));
  const [conductedExams, setConductedExams] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8088/admin/exams/${facultyName}`)
      .then((response) => {
        setConductedExams(response.data);
        setError(`"No Exams Conducted by"${facultyName}`);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <FacultyNav />
      <h1 className="text-2xl font-semibold my-10 text-center">
        Conducted Exams
      </h1>
      <div className="flex justify-center m-10">
        {conductedExams.length ? (
          conductedExams.map((item) => {
            return (
              <ExamInfo
                key={item._id}
                examID={item._id}
                subjectID={item.subjectID}
                subjectName={item.subjectName}
                marks={item.marks}
                totalDuration={item.time}
                totalQuestions={item.TotalQuestions}
                facultyName={item.facultyName}
                branch={item.Branch}
              />
            );
          })
        ) : (
          <div>{error}</div>
        )}
      </div>
    </>
  );
}
