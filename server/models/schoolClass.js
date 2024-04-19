const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  classId: {
    type: String,
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
});

classSchema.pre("save", function (next) {
  if (!this.code) {
    const code = generateRandomCode();
    this.code = code;
  }
  next();
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
