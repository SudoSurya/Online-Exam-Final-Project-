import useStudent from "./useStudent";
import { useState, useEffect } from "react";
import axios from "axios";
import StudentNav from "./StudentNav";
import QuizInfo from "./QuizInfo";
export default function GetExams() {
  const [student] = useStudent();
  const [exams, setExams] = useState([]);
  const [Branch] = useState(localStorage.getItem("studentbranch"));
  //   let Branch = student && student.userBranch;
  console.log(exams);

  useEffect(() => {
    axios
      .get(`http://localhost:8088/user/get-exams/${Branch}`)
      .then((res) => setExams(res.data))
      .catch((error) => console.log(error));
  }, [Branch]);
  return (
    <>
      <StudentNav />
      {exams.map((item) => (
        <QuizInfo
          key={item._id}
          subjectID={item.subjectID}
          subjectName={item.subjectName}
          marks={item.marks}
          totalDuration={item.time}
          totalQuestions={item.TotalQuestions}
        />
      ))}
    </>
  );
}
