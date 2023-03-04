const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  adminID: {
    type: String,
    required: true,
  },
  adminPass: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("AdminSchema", AdminSchema);
