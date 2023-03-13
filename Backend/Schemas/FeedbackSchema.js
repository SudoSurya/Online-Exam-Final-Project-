const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  facultyName: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("FeedbackSchema", FeedbackSchema);
