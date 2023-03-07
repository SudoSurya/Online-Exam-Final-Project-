import { store } from "../../App";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import AdminNav from "./AdminNav";

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
      <div className="bg-gray-50 min-h-screen">
        <div className="mx-auto max-w-lg py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Admin Dashboard
          </h1>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Admin ID</h2>
              <p className="text-gray-700">{data?.adminID}</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden mt-4">
            <div className="px-6 py-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                Admin Password
              </h2>
              <p className="text-gray-700">{data?.adminPass}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
