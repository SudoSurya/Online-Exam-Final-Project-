const mongoose = require("mongoose");

const UnitResults = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userBranch: {
    type: String,
    required: true,
  },
  Results: {
    type: [
      {
        studentID: { type: String, required: true },
        SubjectID: { type: String, required: true },
        SubjectName: { type: String, required: true },
        unit: { type: String, required: true },
        totalQuestions: { type: Number, required: true },
        duration: { type: Number, required: true },
        timeTaken: { type: Number, required: true },
        marks: { type: Number, required: true },
        score: { type: Number, required: true },
        facultyName: { type: String, required: true },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("UnitResults", UnitResults);
