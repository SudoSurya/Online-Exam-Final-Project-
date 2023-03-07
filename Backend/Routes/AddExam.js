const express = require("express");
const ExamSchema = require("../Schemas/ExamSchema");
let router = express.Router();
router.use(express.json());

router.post("/faculty/add-exam", async (req, res) => {
  try {
    const { subjectID, subjectName, Branch, marks, time, Questions } = req.body;

    const exist = await ExamSchema.findOne({ subjectID: subjectID });

    if (exist) {
      return res.status(400).send({ message: "Exam already exists" });
    }

    let Exam = new ExamSchema({
      subjectID,
      subjectName,
      Branch,
      marks,
      time,
      Questions,
    });
    await Exam.save();

    return res.status(200).send("Exam Added Completed Succesfully");
  } catch (error) {
    res.status(500).json({ error: "you messed up man" });
    console.log(error);
  }
});

module.exports = router;
