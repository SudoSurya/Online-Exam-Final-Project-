const express = require("express");
const ExamSchema = require("../Schemas/ExamSchema");
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

module.exports = router;
