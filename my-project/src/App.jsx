import "./App.css";
import HomePage from "./Components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentReg from "./Components/Student/StudentReg";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/register" element={<StudentReg />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
