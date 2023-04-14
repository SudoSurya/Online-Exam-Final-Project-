import { useState, useEffect } from "react";
import axios from "axios";
import StudentNav from "./StudentNav";
import QuizInfo from "./QuizInfo";
import useResults from "./useResults";
import CompletedExamInfo from "./CompletedExamInfo";
export default function GetExams() {
  const [exams, setExams] = useState([]);
  const [results, subjectIDS] = useResults();
  const [Branch] = useState(localStorage.getItem("studentbranch"));
  console.log(subjectIDS);
  console.log(exams);
  useEffect(() => {
    axios
      .get(`http://localhost:8088/user/get-exams/${Branch}`)
      .then((res) => setExams(res.data))
      .catch((error) => console.log(error));
  }, [Branch]);
  if (exams.length < 1) {
    return (
      <>
        <StudentNav />
        <div>Loading...</div>;
      </>
    );
  }
  const examsNotIncluded = exams.filter(
    (item) => !subjectIDS.includes(item.subjectID)
  );
  console.log(examsNotIncluded.length);
  return (
    <>
      <StudentNav />
      <h1 className="text-2xl font-semibold my-10">Pending Exams</h1>
      <div className="flex justify-center m-10 flex-wrap">
        {examsNotIncluded.length > 0 ? (
          examsNotIncluded.map((item) => (
            <QuizInfo
              key={item._id}
              examID={item._id}
              subjectID={item.subjectID}
              subjectName={item.subjectName}
              marks={item.marks}
              totalDuration={item.time}
              totalQuestions={item.TotalQuestions}
            />
          ))
        ) : (
          <div>No Pending Exams</div>
        )}
      </div>
      <h1 className="text-2xl font-semibold my-10">Completed Exams</h1>
      <div className="flex justify-center m-10 flex-wrap">
        {exams.length > 0 &&
          exams.map((item) => {
            if (subjectIDS.includes(item.subjectID)) {
              return (
                <CompletedExamInfo
                  key={item._id}
                  examID={item._id}
                  subjectID={item.subjectID}
                  subjectName={item.subjectName}
                  marks={item.marks}
                  totalDuration={item.time}
                  totalQuestions={item.TotalQuestions}
                />
              );
            }
          })}
      </div>
    </>
  );
}
