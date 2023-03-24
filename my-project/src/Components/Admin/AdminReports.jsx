import AdminNav from "./AdminNav";
import { Link } from "react-router-dom";
import classNames from "classnames";
export default function AdminReports() {
  return (
    <>
      <AdminNav />
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Reports</h1>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
            {/* Courses */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Faculty Based Reports</h2>
              <p className="text-gray-600 mb-4">
                View Faculty Conducted Exams And Results of those Exams
              </p>
              <Link
                to="/admin/faculty/exams"
                className={classNames(
                  "bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mr-4 rounded",
                  "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
                  "text-sm font-medium"
                )}
              >
                View Conducted Exams
              </Link>
              {/* <Link
                to="/student/unit/exams"
                className={classNames(
                  "bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 ml-4 rounded",
                  "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
                  "text-sm font-medium"
                )}
              >
                View Unit Exams
              </Link> */}
            </div>

            {/* Assignments */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Student Results</h2>
              <p className="text-gray-600 mb-4">
                View Student Results By Branch and Subject Name
              </p>
              <Link
                to="/branch-wise/results"
                className={classNames(
                  "bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded",
                  "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2",
                  "text-sm font-medium"
                )}
              >
                View Student Results
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
                  "bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 mr-4 rounded",
                  "focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2",
                  "text-sm font-medium"
                )}
              >
                View Grades
              </Link>
              <Link
                to="/student/unit/results"
                className={classNames(
                  "bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 ml-4 rounded",
                  "focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2",
                  "text-sm font-medium"
                )}
              >
                View Unit Grades
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
