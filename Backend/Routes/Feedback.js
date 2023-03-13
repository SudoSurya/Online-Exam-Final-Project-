const express = require("express");
const FeedbackSchema = require("../Schemas/FeedbackSchema");
let router = express.Router();
router.use(express.json());

router.post("/post/feedback", async (req, res) => {
  try {
    const { facultyName, feedback } = req.body;

    let newFeedback = new FeedbackSchema({
      facultyName,
      feedback,
    });
    await newFeedback.save();

    return res.status(200).send({ message: "Feedback Submitted" });
  } catch (error) {
    res.status(500).json({ message: "you messed up man" });
    console.log(error);
  }
});

module.exports = router;
