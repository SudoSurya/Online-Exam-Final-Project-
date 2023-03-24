const express = require("express");
const StudentResults = require("../Schemas/StudentResults");
let router = express.Router();
router.use(express.json());

router.get("/:studentID/:branch/:subject", async (req, res) => {
  try {
    const { branch, studentID, subject } = req.params;
    const result = await StudentResults.find(
      {
        userBranch: branch,
        userID: studentID,
        "Results.SubjectName": subject,
      },
      { "Results.$": 1 }
    );
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
