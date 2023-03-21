const express = require("express");
const ExamSchema = require("../Schemas/ExamSchema");
const StudentResults = require("../Schemas/StudentResults");
let router = express.Router();
router.use(express.json());

router.get("/exams/:facultyName", async (req, res) => {
  try {
    const { facultyName } = req.params;
    const exams = await ExamSchema.find({ facultyName });
    res.send(exams);
  } catch (error) {
    console.log(error);
    res.status(500).send("No Exams Conducted");
  }
});

router.get("/result/:subjectID/:facultyName", async (req, res) => {
  try {
    const { subjectID, facultyName } = req.params;

    const results = await StudentResults.find(
      {
        "Results.SubjectID": subjectID,
        "Results.facultyName": facultyName,
      },
      { "Results.$": 1 }
    );
    res.send(results);
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
});

module.exports = router;
