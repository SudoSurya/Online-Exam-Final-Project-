import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="font-bold text-xl text-gray-800">
                Online Exam
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-lg w-full">
          <h1 className="text-3xl font-bold mb-4">Online Examination System</h1>

          {/* Modules */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Student module */}
            <div className="bg-white shadow-md rounded-lg flex-1">
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">Student</h2>
                <p className="text-gray-600 mb-4">
                  Login or register as a student.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/student/login"
                    className={classNames(
                      "bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded",
                      "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    )}
                  >
                    Login
                  </Link>
                  <Link
                    to="/student/register"
                    className={classNames(
                      "bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded",
                      "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                    )}
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>

            {/* Faculty module */}
            <div className="bg-white shadow-md rounded-lg flex-1">
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">Faculty</h2>
                <p className="text-gray-600 mb-4">
                  Login or register as a faculty member.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/faculty/login"
                    className={classNames(
                      "bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded",
                      "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    )}
                  >
                    Login
                  </Link>
                  <Link
                    to="/faculty/register"
                    className={classNames(
                      "bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded",
                      "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                    )}
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>

            {/*Admin module */}
            <div className="bg-white shadow-md rounded-lg flex-1">
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">Admin</h2>
                <p className="text-gray-600 mb-4">
                  Login or register as an admin.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/admin/login"
                    className={classNames(
                      "bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded",
                      "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    )}
                  >
                    Login
                  </Link>
                  <Link
                    to="/admin/register"
                    className={classNames(
                      "bg-green-500 invisible hover:bg-green-600 text-white py-2 px-4 rounded",
                      "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                    )}
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-gray-600">
            &copy; 2023 My Website. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
