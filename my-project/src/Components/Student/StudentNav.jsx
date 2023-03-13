import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userStore } from "../../App";
export default function StudentNav() {
  const [studentToken, setStudentToken] = useContext(userStore);

  return (
    <nav className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex py-4">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <img
                  className="h-8 w-auto"
                  src="https://vishnu.edu.in/upload_news/newlogo.bmp"
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/student/dashboard"
                className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/student/exams"
                className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Exams
              </Link>
              <Link
                to="/student/results"
                className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Results
              </Link>
              <Link
                to="/student/profile"
                className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Profile
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link
              onClick={() => {
                setStudentToken(null);
                localStorage.clear("studenttoken");
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded-md text-sm font-medium"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
