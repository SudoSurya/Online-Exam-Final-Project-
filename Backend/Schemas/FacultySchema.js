const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema({
  facultyName: {
    type: String,
    required: true,
  },
  facultyNumber: {
    type: Number,
    required: true,
  },
  facultyEmail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "PENDING",
  },
  Questions: {
    type: [
      {
        SubjectID: { type: String, required: true },
        SubjectName: { type: String, required: true },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("FacultySchema", FacultySchema);
