const express = require("express");
const UnitExam = require("../Schemas/UnitExam");
let router = express.Router();
router.use(express.json());

router.post("/add-exam/unit", async (req, res) => {
  try {
    const {
      subjectID,
      subjectName,
      unit,
      Branch,
      TotalQuestions,
      marks,
      time,
      Questions,
    } = req.body;

    const exist = await UnitExam.findOne({ subjectID: subjectID });

    if (exist.unit == unit) {
      return res.status(400).send({ message: "Unit already exists" });
    }

    let Exam = new UnitExam({
      subjectID,
      subjectName,
      unit,
      Branch,
      TotalQuestions,
      marks,
      time,
      Questions,
    });
    await Exam.save();

    return res
      .status(200)
      .send({ message: "Exam Added Completed Succesfully" });
  } catch (error) {
    res.status(500).json({ message: "you messed up man" });
    console.log(error);
  }
});

module.exports = router;
