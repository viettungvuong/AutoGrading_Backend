const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  classId: {
    type: String,
    required: true,
    unique: true,
  },
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
