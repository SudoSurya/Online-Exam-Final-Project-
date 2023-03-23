const express = require("express");
const StudentResults = require("../Schemas/StudentResults");
let router = express.Router();
router.use(express.json());

router.get("/student/branch/subject", async (req, res) => {
  try {
    const result = await StudentResults.find();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
