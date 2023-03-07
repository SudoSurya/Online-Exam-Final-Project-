//  imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const csvParser = require("csv-parser");
const UserRoutes = require("./Routes/UserRoutes");
const AdminRoutes = require("./Routes/AdminRoutes");
const FacultySchema = require("./Routes/FacultyRoutes");
const PendingStudents = require("./Routes/PendingStudents");
const ApproveStudents = require("./Routes/ApproveStudents");
const ApproveFaculty = require("./Routes/ApproveFaculty");
const PendingFaculty = require("./Routes/PendingFaculty");
const AddExam = require("./Routes/AddExam");
const bodyParser = require("body-parser");
const csvtojson = require("csvtojson");
const app = express();
const upload = multer();
app.use(bodyParser.json());
const storage = multer.memoryStorage();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/user", UserRoutes);
app.use("/admin", AdminRoutes);
app.use("/faculty", PendingFaculty);
app.use("", AddExam);
app.use("/faculty", FacultySchema);
app.use("", PendingStudents);
app.use("", ApproveStudents);
app.use("", ApproveFaculty);

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

const myDataSchema = new mongoose.Schema({
  name: [
    {
      name: { type: String, required: true },
      age: { type: String, required: true },
    },
  ],
});

const MyData = mongoose.model("MyData", myDataSchema);

// API endpoint for CSV to MongoDB
app.post("/api/csv-to-mongo", async (req, res) => {
  // console.log(data);
  try {
    const data = new MyData({
      name: req.body,
    });
    data.save((err, savedData) => {
      if (err) {
        console.error(err);
      } else {
        console.log(savedData);
      }
    });
    const results = await MyData.find();
    console.log(results);
    // Return the JSON output
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/fetch-data", async (req, res) => {
  try {
    const results = await MyData.find({}).exec();
    console.log(results);
    // Convert the data to JSON format
    // const jsonOutput = results.map((result) => ({
    //   Name: result.name,
    //   Age: result.age,
    // }));
    z;
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
