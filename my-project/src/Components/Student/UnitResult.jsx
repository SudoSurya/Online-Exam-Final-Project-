import classNames from "classnames";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
export default function UnitResult() {
  const { subjectName } = useParams();
  const [subjectResult, setSubjectResult] = useState();
  const [studentID] = useState(localStorage.getItem("studentid"));

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8088/user/unit/result/${studentID}/${subjectName}`
      );
      setSubjectResult(response.data[0]);
    };
    fetchData();
  }, [subjectName]);
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
            Unit: {subjectResult && subjectResult.unit}
          </div>
          <div
            className={classNames(
              "text-gray-800",
              "font-medium",
              "text-lg",
              "mb-2"
            )}
          >
            Time: {subjectResult && subjectResult.duration} Seconds
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
            Time Taken: {subjectResult && subjectResult.timeTaken} Seconds
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
                to="/student/unit/exams"
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
