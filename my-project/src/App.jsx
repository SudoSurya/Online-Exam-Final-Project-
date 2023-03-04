import "./App.css";
import HomePage from "./Components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentReg from "./Components/Student/StudentReg";
import AdminLogin from "./Components/Admin/AdminLogin";
import { createContext, useContext, useState } from "react";
import AdminDashboard from "./Components/Admin/AdminDashboard";
export const store = createContext();
function App() {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("admintoken")
  );
  return (
    <store.Provider value={[adminToken, setAdminToken]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/register" element={<StudentReg />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </store.Provider>
  );
}

export default App;
