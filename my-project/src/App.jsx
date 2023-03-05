import "./App.css";
import HomePage from "./Components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentReg from "./Components/Student/StudentReg";
import AdminLogin from "./Components/Admin/AdminLogin";
import { createContext, useContext, useState } from "react";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import ApproveStudents from "./Components/Admin/ApproveStudents";
import StudentLogin from "./Components/Student/StudentLogin";
import StudentDashboard from "./Components/Student/StudentDashboard";
export const store = createContext();
export const userStore = createContext();
function App() {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("admintoken")
  );
  const [studentToken, setStudentToken] = useState(
    localStorage.getItem("studenttoken")
  );
  return (
    <userStore.Provider value={[studentToken, setStudentToken]}>
      <store.Provider value={[adminToken, setAdminToken]}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/student/register" element={<StudentReg />} />
            <Route path="/student/login" element={<StudentLogin />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />\
            {adminToken && (
              <Route
                path="/admin/appove/students"
                element={<ApproveStudents />}
              />
            )}
          </Routes>
        </BrowserRouter>
      </store.Provider>
    </userStore.Provider>
  );
}

export default App;
