import { store } from "../../App";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import AdminNav from "./AdminNav";
import classNames from "classnames";

export default function AdminDashboard() {
  const [adminToken, setAdminToken] = useContext(store);
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8088/admin/dashboard", {
        headers: {
          "x-token": adminToken,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!adminToken) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <>
      <AdminNav />
      <div className="bg-gray-200 min-h-screen">
        {/* Main content */}
        <main className="py-10">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Add exams */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold mb-2">Assign Subjects</h2>
                <p className="text-gray-600 mb-4">
                  Assign and manage Subjects to Faculty
                </p>
                <Link
                  to="/admin/view/faculty"
                  className={classNames(
                    "bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded",
                    "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
                    "text-sm font-medium"
                  )}
                >
                  Add Subjects
                </Link>
              </div>

              {/* student feedbacks */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold mb-2">Students</h2>
                <p className="text-gray-600 mb-4">
                  View and Approve your Students
                </p>
                <Link
                  to="/admin/approve/students"
                  className={classNames(
                    "bg-green-500 hover:bg-green-600 text-white py-2 px-4  mr-4 rounded",
                    "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2",
                    "text-sm font-medium"
                  )}
                >
                  Approve/Reject
                </Link>
                <Link
                  to="/admin/view/students"
                  className={classNames(
                    "bg-green-500 hover:bg-green-600 text-white py-2 px-4 ml-4 rounded",
                    "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2",
                    "text-sm font-medium"
                  )}
                >
                  View Students
                </Link>
              </div>
              {/* Faculty */}

              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold mb-2">Faculty</h2>
                <p className="text-gray-600 mb-4">
                  View and Approve your Faculty
                </p>
                <Link
                  to="/admin/approve/faculty"
                  className={classNames(
                    "bg-amber-500 hover:bg-amber-600 text-white py-2 px-4  mr-4 rounded",
                    "focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2",
                    "text-sm font-medium"
                  )}
                >
                  Approve/Reject
                </Link>
                <Link
                  to="/admin/view/faculty"
                  className={classNames(
                    "bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 ml-4 rounded",
                    "focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2",
                    "text-sm font-medium"
                  )}
                >
                  View Faculty
                </Link>
              </div>
              {/* student results */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold mb-2">Grades</h2>
                <p className="text-gray-600 mb-4">
                  View your grades for your enrolled courses.
                </p>
                <Link
                  to="/admin/reports"
                  className={classNames(
                    "bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded",
                    "focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2",
                    "text-sm font-medium"
                  )}
                >
                  View Grades
                </Link>
              </div>
              {/* Feedbacks */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold mb-2">Feedbacks</h2>
                <p className="text-gray-600 mb-4">
                  View Student Feedbacks On Faculty.
                </p>
                <Link
                  to="/admin/view/feedbacks"
                  className={classNames(
                    "bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded",
                    "focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2",
                    "text-sm font-medium"
                  )}
                >
                  View Feedbacks
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
