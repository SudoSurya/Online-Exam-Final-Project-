import FacultyNav from "./FacultyNav";
import { Link, Navigate } from "react-router-dom";
import { facultyStore } from "../../App";
import classNames from "classnames";
import { useContext } from "react";
export default function FacultyDashboard() {
  const [facultyToken, setFacultyToken] = useContext(facultyStore);
  if (!facultyToken) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <FacultyNav />
      <div className="bg-gray-200 min-h-screen">
        {/* Main content */}
        <main className="py-10">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Add exams */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold mb-2">Add Exams</h2>
                <p className="text-gray-600 mb-4">
                  Add and manage student exams
                </p>
                <Link
                  to="/student/add-exam"
                  className={classNames(
                    "bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded",
                    "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
                    "text-sm font-medium"
                  )}
                >
                  Add Exams
                </Link>
              </div>

              {/* student feedbacks */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold mb-2">FeedBacks</h2>
                <p className="text-gray-600 mb-4">
                  View and submit your feedbacks
                </p>
                <Link
                  to="/faculty/feedbacks"
                  className={classNames(
                    "bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded",
                    "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2",
                    "text-sm font-medium"
                  )}
                >
                  Feedbacks
                </Link>
              </div>

              {/* student results */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold mb-2">Grades</h2>
                <p className="text-gray-600 mb-4">
                  View your grades for your enrolled courses.
                </p>
                <Link
                  to="/faculty/grades"
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
    </>
  );
}
