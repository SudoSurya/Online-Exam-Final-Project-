const express = require("express");
const FacultySchema = require("../Schemas/FacultySchema");
let router = express.Router();
router.use(express.json());

router.get("/pending", async (req, res) => {
  try {
    const facultyData = await FacultySchema.find({ status: "PENDING" });

    if (facultyData.length < 1) {
      res.status(200).send("No Pending Requests Available");
    }
    res.send(facultyData);
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server Error");
  }
});

router.get("/approved", async (req, res) => {
  try {
    const facultyData = await FacultySchema.find({ status: "approved" });

    if (facultyData.length < 1) {
      res.status(200).send("No Data");
    }
    res.send(facultyData);
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server Error");
  }
});

module.exports = router;
