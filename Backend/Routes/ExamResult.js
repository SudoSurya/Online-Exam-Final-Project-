const express = require("express");
const StudentResults = require("../Schemas/StudentResults");
let router = express.Router();
router.use(express.json());

router.patch("/submit/result/:id", async (req, res) => {
  const userID = req.params.id;
  const newResult = req.body.Results[0];
  try {
    const student = await StudentResults.find({ userID: userID });

    if (student.length === 0) {
      return res.status(404).json({ message: "Student member not found" });
    }

    student[0].Results.push(newResult);
    const updatedStudent = await student[0].save();

    res.json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/result/:id", async (req, res) => {
  const userID = req.params.id;
  try {
    const student = await StudentResults.find({ userID: userID });

    if (student.length === 0) {
      return res.status(404).json({ message: "Faculty member not found" });
    }

    res.json(student[0].Results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/result/:id/:subjectID", async (req, res) => {
  const userID = req.params.id;
  const SubjectID = req.params.subjectID;
  try {
    const student = await StudentResults.find({ userID: userID });
    const filteredSubjects = student[0].Results.filter(
      (subject) => subject.SubjectID === SubjectID
    );

    if (student.length === 0) {
      return res.status(404).json({ message: "Faculty member not found" });
    }

    res.json(filteredSubjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
