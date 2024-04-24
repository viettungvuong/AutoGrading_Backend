const mongoose = require("mongoose");
const crypto = require("crypto");

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
    unique: true,
  },
});

classSchema.pre("save", function (next) {
  function generateRandomCode() {
    const randomBytes = crypto.randomBytes(8);
    const code = randomBytes.toString("hex");

    return code;
  }

  if (this.code == null) {
    const code = generateRandomCode();
    this.code = code;
  }

  next();
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
