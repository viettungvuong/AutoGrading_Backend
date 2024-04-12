const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

examSchema.methods.toJSON = function () {
  const examObject = this.toObject();

  examObject.student = examObject.student.studentId;
  return examObject;
};

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;
