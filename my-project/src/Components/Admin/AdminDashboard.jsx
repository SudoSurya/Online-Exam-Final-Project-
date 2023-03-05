import { store } from "../../App";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import AdminNav from "./AdminNav";
export default function AdminDashboard() {
  const [adminToken] = useContext(store);
  const [data, setData] = useState();
  console.log(data);
  useEffect(() => {
    axios
      .get("http://localhost:8087/admin/dashboard", {
        headers: {
          "x-token": adminToken,
        },
      })
      .then((res) => {
        setData(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!adminToken) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <AdminNav />
      <div>
        <h1>Admin Dashboard</h1>
        <h1>{data && data.adminPass}</h1>
        <h1>{data && data.adminID}</h1>
      </div>
    </>
  );
}
