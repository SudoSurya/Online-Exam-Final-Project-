import classNames from "classnames";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Link, useParams } from "react-router-dom";
interface SubjectExamResult {
  studentID: string;
  SubjectID: string;
  SubjectName: string;
  totalQuestions: number;
  duration: number;
  timeTaken: number;
  score: number;
  _id: string;
}
export default function SubjectResult() {
  const { subjectID } = useParams();
  const [subjectResult, setSubjectResult] = useState<SubjectExamResult>();
  const [studentID] = useState(localStorage.getItem("studentid"));
  console.log(subjectResult);
  useEffect(() => {
    const fetchData = async () => {
      const response: AxiosResponse<SubjectExamResult[]> = await axios.get(
        `http://localhost:8088/user/result/${studentID}/${subjectID}`
      );
      setSubjectResult(response.data[0]);
    };
    fetchData().catch((err) => {
      console.log(err);
    });
  }, [subjectID]);
  return (
    <div
      className={classNames(
        "bg-gradient-to-br",
        "from-purple-500",
        "to-pink-500",
        "h-screen"
      )}
    >
      <div
        className={classNames(
          "flex",
          "justify-center",
          "items-center",
          "h-full"
        )}
      >
        <div
          className={classNames(
            "quiz-container",
            "bg-white",
            "p-4",
            "shadow-md",
            "rounded-lg",
            "w-1/3"
          )}
        >
          <h1
            className={classNames(
              "text-2xl",
              "font-bold",
              "text-center",
              "mb-6",
              "text-gray-800"
            )}
          >
            Exam Result
          </h1>
          <div
            className={classNames(
              "text-gray-800",
              "font-medium",
              "text-lg",
              "mb-2"
            )}
          >
            Subject ID: {subjectResult && subjectResult.SubjectID}
          </div>
          <div
            className={classNames(
              "text-gray-800",
              "font-medium",
              "text-lg",
              "mb-2"
            )}
          >
            Subject: {subjectResult && subjectResult.SubjectName}
          </div>
          <div
            className={classNames(
              "text-gray-800",
              "font-medium",
              "text-lg",
              "mb-2"
            )}
          >
            Time: {subjectResult && subjectResult.duration} Minutes
          </div>
          <div
            className={classNames(
              "text-gray-800",
              "font-medium",
              "text-lg",
              "mb-2"
            )}
          >
            Total Questions: {subjectResult && subjectResult.totalQuestions}
          </div>
          <div
            className={classNames(
              "text-gray-800",
              "font-medium",
              "text-lg",
              "mb-2"
            )}
          >
            Time Taken: {subjectResult && subjectResult.timeTaken} Minutes
          </div>
          <div
            className={classNames("text-gray-800", "font-medium", "text-lg")}
          >
            <h2
              className={classNames(
                "text-3xl",
                "font-bold",
                "text-center",
                "mt-8",
                "mb-4"
              )}
            >
              Your score is: {subjectResult && subjectResult.score}
            </h2>
            <div className={classNames("text-center", "my-4")}>
              <Link
                to="/student/exams"
                className={classNames(
                  "bg-green-500",
                  "text-white",
                  "py-2",
                  "px-4",
                  "rounded-md",
                  "hover:bg-green-600"
                )}
              >
                GoTo Exams
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
