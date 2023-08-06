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
      <Route path="/faculty/login" element={<FacultyLogin />} />
      <Route
        path="/faculty/dashboard"
        element={
          <Requireauth>
            <FacultyDashboard />
          </Requireauth>
        }
      />
      <Route path="/faculty/create-exam" element={<CreateExam />} />
      <Route
        path="/faculty/add-unit-exam"
        element={
          <Requireauth>
            <CreateUnitExam />
          </Requireauth>
        }
      />
      <Route
        path="/faculty/feebacks"
        element={
          <Requireauth>
            <Feedbacks />
          </Requireauth>
        }
      />
      <Route
        path="/faculty/conducted-exams"
        element={
          <Requireauth>
            <ConductedExams />
          </Requireauth>
        }
      />
      <Route path="/faculty/register" element={<FacultyRegister />} />
    </Routes>
  );
}
