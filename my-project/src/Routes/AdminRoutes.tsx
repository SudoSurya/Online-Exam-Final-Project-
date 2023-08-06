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
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/approve/students"
        element={
          <RequireAdminAuth>
            <ApproveStudents />
          </RequireAdminAuth>
        }
      />
      <Route
        path="/admin/approve/faculty"
        element={
          <RequireAdminAuth>
            <ApproveFaculty />
          </RequireAdminAuth>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <RequireAdminAuth>
            <AdminDashboard />
          </RequireAdminAuth>
        }
      />
      <Route
        path="/admin/view/faculty"
        element={
          <RequireAdminAuth>
            <FacultyList />
          </RequireAdminAuth>
        }
      />
      <Route
        path="/admin/view/students"
        element={
          <RequireAdminAuth>
            <ViewStudents />
          </RequireAdminAuth>
        }
      />
      <Route
        path="/admin/view/feedbacks"
        element={
          <RequireAdminAuth>
            <FacultyFeedbacks />
          </RequireAdminAuth>
        }
      />
      <Route
        path="/admin/faculty/exams"
        element={
          <RequireAdminAuth>
            <FacultyExams />
          </RequireAdminAuth>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <RequireAdminAuth>
            <AdminReports />
          </RequireAdminAuth>
        }
      />
      <Route
        path="/admin/results/branch/"
        element={
          <RequireAdminAuth>
            <BranchWiseResults />
          </RequireAdminAuth>
        }
      />
    </Routes>
  );
}
