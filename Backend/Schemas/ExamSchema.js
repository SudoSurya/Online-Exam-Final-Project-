const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
  subjectID: {
    type: String,
    required: true,
  },
  subjectName: {
    type: String,
    required: true,
  },
  Branch: {
    type: String,
    required: true,
  },
  TotalQuestions: {
    type: Number,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  facultyName: {
    type: String,
    required: true,
  },
  Questions: [
    {
      Question: { type: String, required: true },
      option1: { type: String, required: true },
      option2: { type: String, required: true },
      option3: { type: String, required: true },
      option4: { type: String, required: true },
      answer: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("ExamSchema", ExamSchema);
