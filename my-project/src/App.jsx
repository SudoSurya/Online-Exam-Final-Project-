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
import StudentProfile from "./Components/Student/StudentProfile";
import FacultyRegister from "./Components/Faculty/FacultyRegister";
import FacultyLogin from "./Components/Faculty/FacultyLogin";
export const store = createContext();
export const userStore = createContext();
export const facultyStore = createContext();
function App() {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("admintoken")
  );
  const [studentToken, setStudentToken] = useState(
    localStorage.getItem("studenttoken")
  );
  const [facultyToken, setFacultyToken] = useState(
    localStorage.getItem("facultytoken")
  );
  return (
    <facultyStore.Provider value={[facultyToken, setAdminToken]}>
      <userStore.Provider value={[studentToken, setStudentToken]}>
        <store.Provider value={[adminToken, setAdminToken]}>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<HomePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/student/register" element={<StudentReg />} />
              <Route path="/student/login" element={<StudentLogin />} />
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/profile" element={<StudentProfile />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              {adminToken && (
                <Route
                  path="/admin/appove/students"
                  element={<ApproveStudents />}
                />
              )}
              <Route path="/faculty/register" element={<FacultyRegister />} />
              <Route path="/faculty/login" element={<FacultyLogin />} />
            </Routes>
          </BrowserRouter>
        </store.Provider>
      </userStore.Provider>
    </facultyStore.Provider>
  );
}

export default App;
