const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  schoolClass: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
  ],
  user: {
    // nếu student này có liên kết tài khoản
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
