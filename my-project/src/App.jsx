import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import HomePage from "./Components/HomePage";
import StudentReg from "./Components/Student/StudentReg";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import ApproveStudents from "./Components/Admin/ApproveStudents";
import StudentLogin from "./Components/Student/StudentLogin";
import StudentDashboard from "./Components/Student/StudentDashboard";
import StudentProfile from "./Components/Student/StudentProfile";
import FacultyRegister from "./Components/Faculty/FacultyRegister";
import FacultyLogin from "./Components/Faculty/FacultyLogin";
import ApproveFaculty from "./Components/Admin/ApproveFaculty";
import FacultyDashboard from "./Components/Faculty/FacultyDashboard";
import Test from "./Components/Faculty/Test";
import CreateExam from "./Components/Faculty/CreateExam";
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
    <facultyStore.Provider value={[facultyToken, setFacultyToken]}>
      <userStore.Provider value={[studentToken, setStudentToken]}>
        <store.Provider value={[adminToken, setAdminToken]}>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<HomePage />} />
              <Route path="/" element={<HomePage />} />

              <Route path="/student/login" element={<StudentLogin />} />
              <Route path="/student">
                {studentToken ? (
                  <>
                    <Route
                      path="/student/dashboard"
                      element={<StudentDashboard />}
                    />
                    <Route
                      path="/student/profile"
                      element={<StudentProfile />}
                    />
                  </>
                ) : (
                  <Route path="/student/register" element={<StudentReg />} />
                )}
              </Route>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin">
                {adminToken && (
                  <>
                    <Route
                      path="/admin/approve/students"
                      element={<ApproveStudents />}
                    />
                    <Route
                      path="/admin/approve/faculty"
                      element={<ApproveFaculty />}
                    />
                    <Route
                      path="/admin/dashboard"
                      element={<AdminDashboard />}
                    />
                  </>
                )}
              </Route>
              <Route path="/faculty/login" element={<FacultyLogin />} />
              <Route to="/faculty">
                {facultyToken ? (
                  <>
                    <Route
                      path="/faculty/dashboard"
                      element={<FacultyDashboard />}
                    />
                    <Route
                      path="/faculty/create-exam"
                      element={<CreateExam />}
                    />
                  </>
                ) : (
                  <Route
                    path="/faculty/register"
                    element={<FacultyRegister />}
                  />
                )}
              </Route>
              <Route path="/test" element={<Test />} />
            </Routes>
          </BrowserRouter>
        </store.Provider>
      </userStore.Provider>
    </facultyStore.Provider>
  );
}

export default App;
