import { Route, Routes } from "react-router-dom";
import StudentLogin from "../Components/Student/StudentLogin";
import StudentDashboard from "../Components/Student/StudentDashboard";
import StudentProfile from "../Components/Student/StudentProfile";
import GetExams from "../Components/Student/GetExams";
import UnitExamSearch from "../Components/Student/UnitExamSearch";
import Exam from "../Components/Student/Exam";
import UnitExam from "../Components/Student/UnitExam";
import SubjectResult from "../Components/Student/SubjectResult";
import UnitResult from "../Components/Student/UnitResult";
import ExamResults from "../Components/Student/ExamResults";
import GetUnitResult from "../Components/Student/GetUnitResult";
import PostFeedback from "../Components/Student/PostFeedback";
import StudentReg from "../Components/Student/StudentReg";
import { RequireStudentAuth } from "../Auth/Student";

export default function StudentRoutesConfig() {
  return (
    <Routes>
      <Route path="login" element={<StudentLogin />} />

      <Route
        path="dashboard"
        element={
          <RequireStudentAuth>
            <StudentDashboard />
          </RequireStudentAuth>
        }
      />
      <Route
        path="profile"
        element={
          <RequireStudentAuth>
            <StudentProfile />
          </RequireStudentAuth>
        }
      />
      <Route
        path="exams"
        element={
          <RequireStudentAuth>
            <GetExams />
          </RequireStudentAuth>
        }
      />
      <Route
        path="unit/exams"
        element={
          <RequireStudentAuth>
            <UnitExamSearch />
          </RequireStudentAuth>
        }
      />
      <Route
        path="exam/:id"
        element={
          <RequireStudentAuth>
            <Exam />
          </RequireStudentAuth>
        }
      />
      <Route
        path="unit/exam/:id"
        element={
          <RequireStudentAuth>
            <UnitExam />
          </RequireStudentAuth>
        }
      />
      <Route
        path="result/:subjectID"
        element={
          <RequireStudentAuth>
            <SubjectResult />
          </RequireStudentAuth>
        }
      />
      <Route
        path="unit/result/:subjectName"
        element={
          <RequireStudentAuth>
            <UnitResult />
          </RequireStudentAuth>
        }
      />
      <Route
        path="results"
        element={
          <RequireStudentAuth>
            <ExamResults />
          </RequireStudentAuth>
        }
      />
      <Route
        path="unit/results"
        element={
          <RequireStudentAuth>
            <GetUnitResult />
          </RequireStudentAuth>
        }
      />
      <Route
        path="feedback"
        element={
          <RequireStudentAuth>
            <PostFeedback />
          </RequireStudentAuth>
        }
      />
      <Route path="register" element={<StudentReg />} />
    </Routes>
  );
}
