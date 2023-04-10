import { useContext } from "react";
import { Link } from "react-router-dom";
import { store } from "../../App";

export default function AdminNav() {
  const [adminToken, setAdminToken] = useContext(store);

  return (
    <nav className="bg-gradient-to-r from-purple-700 via-pink-500 to-red-500 py-4  px-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/admin/dashboard"
          className="text-white text-lg font-semibold tracking-widest"
        >
          ADMIN
        </Link>
        <div className="flex items-center">
          <Link
            to="/admin/approve/students"
            className="text-gray-100 hover:text-white ml-8 mr-4 font-medium tracking-wide"
          >
            Students
          </Link>
          <Link
            to="/admin/approve/faculty"
            className="text-gray-100 hover:text-white mr-4 font-medium tracking-wide"
          >
            Faculty
          </Link>
          <Link
            to="/admin/reports"
            className="text-gray-100 hover:text-white mr-4 font-medium tracking-wide"
          >
            Results
          </Link>
          <Link
            to="/admin/view/feedbacks"
            className="text-gray-100 hover:text-white mr-8 font-medium tracking-wide"
          >
            Feedback
          </Link>
          <button
            onClick={() => {
              setAdminToken(null);
              localStorage.removeItem("admintoken");
            }}
            className="bg-pink-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
