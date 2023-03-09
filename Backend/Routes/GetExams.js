const express = require("express");
const ExamSchema = require("../Schemas/ExamSchema");
let router = express.Router();
router.use(express.json());

router.get("/get-exams/:Branch", async (req, res) => {
  try {
    const { Branch } = req.params;
    const AvailExams = await ExamSchema.find({ Branch: Branch });
    if (!AvailExams) {
      res.status(200).send("No Exam Available");
    }
    res.send(AvailExams);
  } catch (error) {
    console.log(error);
    res.status(200).send("No Exam Available");
  }
});

module.exports = router;
