import StudentNav from "./StudentNav";
import { userStore } from "../../App";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

function StudentDashboard() {
  const [studentToken, setStudentToken] = useContext(userStore);

  if (!studentToken) {
    return <Navigate to="/" />;
  }
  return (
    <div className="bg-gray-200 min-h-screen">
      <StudentNav />

      {/* Main content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Courses */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Exams</h2>
              <p className="text-gray-600 mb-4">View and manage your exams</p>
              <Link
                to="/student/exams"
                className={classNames(
                  "bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded",
                  "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
                  "text-sm font-medium"
                )}
              >
                View Exams
              </Link>
            </div>

            {/* Assignments */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">FeedBacks</h2>
              <p className="text-gray-600 mb-4">
                View and submit your feedbacks
              </p>
              <Link
                to="/student/assignments"
                className={classNames(
                  "bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded",
                  "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2",
                  "text-sm font-medium"
                )}
              >
                Feedbacks
              </Link>
            </div>

            {/* Grades */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Grades</h2>
              <p className="text-gray-600 mb-4">
                View your grades for your enrolled courses.
              </p>
              <Link
                to="/student/results"
                className={classNames(
                  "bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded",
                  "focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2",
                  "text-sm font-medium"
                )}
              >
                View Grades
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;
