import { Link } from "react-router-dom";

export default function AdminNav() {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/admin/dashboard" className="text-white text-xl font-semibold">
          Admin
        </Link>
        <div className="flex">
          <Link
            to="/admin/appove/students"
            className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Students
          </Link>
          <a
            href="#"
            className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Faculty
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Results
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Feedback
          </a>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium ml-4">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
