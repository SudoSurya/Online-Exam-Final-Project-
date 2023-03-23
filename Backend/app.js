//  imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRoutes = require("./Routes/UserRoutes");
const AdminRoutes = require("./Routes/AdminRoutes");
const FacultySchema = require("./Routes/FacultyRoutes");
const PendingStudents = require("./Routes/PendingStudents");
const ApproveStudents = require("./Routes/ApproveStudents");
const ApproveFaculty = require("./Routes/ApproveFaculty");
const PendingFaculty = require("./Routes/PendingFaculty");
const AssignSubject = require("./Routes/AssignSubject");
const UnitExamResult = require("./Routes/UnitExamResult");
const FacultyExams = require("./Routes/FacultyExams");
const AddUnitExam = require("./Routes/AddUnitExam");
const BranchResults = require("./Routes/BranchResults");
const Feedback = require("./Routes/Feedback");
const ExamResult = require("./Routes/ExamResult");
const GetExams = require("./Routes/GetExams");
const AddExam = require("./Routes/AddExam");
const bodyParser = require("body-parser");
const UnitExams = require("./Routes/UnitExams");
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use(
  "/user",
  UserRoutes,
  GetExams,
  ExamResult,
  Feedback,
  UnitExams,
  UnitExamResult
);
app.use("/admin", AdminRoutes, AssignSubject, FacultyExams);
app.use("/faculty", PendingFaculty, FacultySchema, AddExam, AddUnitExam);

app.use("", PendingStudents);
app.use("", ApproveStudents);
app.use("", ApproveFaculty);
app.use("", BranchResults);

const PORT = 8088;
app.listen(PORT, () => {
  console.log("http://localhost:8088/");
});
//  DB Connection
mongoose.set("strictQuery", true);
// mongoose
//   .connect(
//     "mongodb+srv://admin:admin@cluster0.jhj7ej8.mongodb.net/?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true,
//     }
//   )
//   .then(() => console.log("DB connected"))
//   .catch((error) => console.error(error));

mongoose
  .connect("mongodb+srv://admin:admin@cluster0.jhj7ej8.mongodb.net/test", {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connected"))
  .catch((error) => console.error(error));
// Test Route
app.get("/", (req, res) => {
  res.send("EndPoints And Backend Working");
});
