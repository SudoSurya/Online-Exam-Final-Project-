const express = require("express");
const FacultySchema = require("../Schemas/FacultySchema");
let router = express.Router();
router.use(express.json());

router.patch("/add-subject/faculty/:id", async (req, res) => {
  const facultyId = req.params.id;
  const newSubject = req.body.Questions[0];
  try {
    const faculty = await FacultySchema.findById(facultyId);

    if (!faculty) {
      return res.status(404).json({ message: "Faculty member not found" });
    }

    faculty.Questions.push(newSubject);
    const updatedFaculty = await faculty.save();

    res.json(updatedFaculty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
