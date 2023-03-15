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
