import { store } from "../../App";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
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
    <div>
      <h1>Admin Dashboard</h1>
      {/* <div>{data.adminID}</div> */}
      <h1>{data && data.adminPass}</h1>
      <h1>{data && data.adminID}</h1>
    </div>
  );
}
