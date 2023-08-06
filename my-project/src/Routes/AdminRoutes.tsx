import { Route, Routes } from "react-router-dom";
import AdminLogin from "../Components/Admin/AdminLogin";
import ApproveStudents from "../Components/Admin/ApproveStudents";
import ApproveFaculty from "../Components/Admin/ApproveFaculty";
import AdminDashboard from "../Components/Admin/AdminDashboard";
import FacultyList from "../Components/Admin/FacultyList";
import ViewStudents from "../Components/Admin/ViewStudents";
import FacultyFeedbacks from "../Components/Admin/FacultyFeedbacks";
import FacultyExams from "../Components/Admin/FacultyExams";
import AdminReports from "../Components/Admin/AdminReports";
import BranchWiseResults from "../Components/Admin/BranchWiseResults";
import { RequireAdminAuth } from "../Auth/AdminAuth";

export default function AdminRoutesConfig() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route
        path="approve/students"
        element={
          <RequireAdminAuth>
            <ApproveStudents />
          </RequireAdminAuth>
        }
      />
      <Route
        path="approve/faculty"
        element={
          <RequireAdminAuth>
            <ApproveFaculty />
          </RequireAdminAuth>
        }
      />
      <Route
        path="dashboard"
        element={
          <RequireAdminAuth>
            <AdminDashboard />
          </RequireAdminAuth>
        }
      />
      <Route
        path="view/faculty"
        element={
          <RequireAdminAuth>
            <FacultyList />
          </RequireAdminAuth>
        }
      />
      <Route
        path="view/students"
        element={
          <RequireAdminAuth>
            <ViewStudents />
          </RequireAdminAuth>
        }
      />
      <Route
        path="view/feedbacks"
        element={
          <RequireAdminAuth>
            <FacultyFeedbacks />
          </RequireAdminAuth>
        }
      />
      <Route
        path="faculty/exams"
        element={
          <RequireAdminAuth>
            <FacultyExams />
          </RequireAdminAuth>
        }
      />
      <Route
        path="reports"
        element={
          <RequireAdminAuth>
            <AdminReports />
          </RequireAdminAuth>
        }
      />
      <Route
        path="results/branch/"
        element={
          <RequireAdminAuth>
            <BranchWiseResults />
          </RequireAdminAuth>
        }
      />
    </Routes>
  );
}
