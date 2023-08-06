import { Route, Routes } from "react-router-dom";
import FacultyLogin from "../Components/Faculty/FacultyLogin";
import { Requireauth } from "../Auth/FacultyAuth";
import FacultyDashboard from "../Components/Faculty/FacultyDashboard";
import CreateUnitExam from "../Components/Faculty/CreateUnitExam";
import Feedbacks from "../Components/Faculty/Feedbacks";
import ConductedExams from "../Components/Faculty/ConductedExams";
import FacultyRegister from "../Components/Faculty/FacultyRegister";
import CreateExam from "../Components/Faculty/CreateExam";

export default function FacultyRoutesConfig() {
  return (
    <Routes>
      <Route path="login" element={<FacultyLogin />} />
      <Route
        path="dashboard"
        element={
          <Requireauth>
            <FacultyDashboard />
          </Requireauth>
        }
      />
      <Route path="create-exam" element={<CreateExam />} />
      <Route
        path="add-unit-exam"
        element={
          <Requireauth>
            <CreateUnitExam />
          </Requireauth>
        }
      />
      <Route
        path="feebacks"
        element={
          <Requireauth>
            <Feedbacks />
          </Requireauth>
        }
      />
      <Route
        path="conducted-exams"
        element={
          <Requireauth>
            <ConductedExams />
          </Requireauth>
        }
      />
      <Route path="register" element={<FacultyRegister />} />
    </Routes>
  );
}
