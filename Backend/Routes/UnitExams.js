const express = require("express");
const UnitExam = require("../Schemas/UnitExam");
let router = express.Router();
router.use(express.json());

router.get("/get-unit-exams/:Branch", async (req, res) => {
  try {
    const { Branch } = req.params;
    const AvailExams = await UnitExam.find({ Branch: Branch });
    if (!AvailExams) {
      res.status(200).send("No Exam Available");
    }
    res.send(AvailExams);
  } catch (error) {
    console.log(error);
    res.status(200).send("No Exam Available");
  }
});

router.get("/get-unit-exams/:Branch/:subjectName", async (req, res) => {
  try {
    const { Branch, subjectName } = req.params;
    const Exams = await UnitExam.find({ Branch, subjectName });
    if (!Exams) {
      res.status(200).send("No Exam Available");
    }
    res.send(Exams);
  } catch (error) {
    console.log(error);
    res.status(200).send("No Exam Available");
  }
});

router.get("/unit/exams/:Branch/subjects", async (req, res) => {
  try {
    const subjects = await UnitExam.find().distinct("subjectName");
    res.json(subjects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/unit/exam/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ExamData = await UnitExam.findById(id);
    if (!ExamData) {
      res.status(200).send("No Exam Available");
    }
    res.send(ExamData);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
