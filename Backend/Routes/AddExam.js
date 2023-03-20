const express = require("express");
const ExamSchema = require("../Schemas/ExamSchema");
let router = express.Router();
router.use(express.json());

router.post("/add-exam", async (req, res) => {
  try {
    const {
      subjectID,
      subjectName,
      Branch,
      TotalQuestions,
      marks,
      time,
      facultyName,
      Questions,
    } = req.body;

    const exist = await ExamSchema.findOne({ subjectID, Branch });

    if (exist) {
      return res.status(400).send({ message: "Exam already exists" });
    }

    let Exam = new ExamSchema({
      subjectID,
      subjectName,
      Branch,
      TotalQuestions,
      marks,
      time,
      facultyName,
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

// create a time based quiz app using react where id takes subject name ,time,total questions and Questions and answers from api using axios , style with tailwind css it sends result to mongo db quiz should end after time limit and user should able to go back and forth to navigate questions
