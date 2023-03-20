const mongoose = require("mongoose");

const StudentResults = new mongoose.Schema({
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
        SubjectID: { type: String, required: true },
        SubjectName: { type: String, required: true },
        totalQuestions: { type: Number, required: true },
        duration: { type: Number, required: true },
        timeTaken: { type: Number, required: true },
        score: { type: Number, required: true },
        facultyName: { type: String, required: true },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("StudentResults", StudentResults);
