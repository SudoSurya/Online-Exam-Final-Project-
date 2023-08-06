import { Route, Routes } from "react-router-dom";
import HomePage from "../Components/HomePage";
import SubjectStats from "../Components/Admin/SubjectStats";
import ResultsTable from "../Components/Admin/ResultsTable";
import UserList from "../Components/Admin/UserList";
import AllSubjectsResults from "../Components/Admin/AllSubjectResults";

export default function PublicRouteConfig() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/stats/:branch/:subjectID/:facultyName/:subjectName1"
        element={<SubjectStats />}
      />
      <Route
        path="/exam/result/:subjectID/:facultyName/:subjectName"
        element={<ResultsTable />}
      />
      <Route path="/branch-wise/results" element={<UserList />} />
      <Route path="/:id/allsubjects" element={<AllSubjectsResults />} />
    </Routes>
  );
}
