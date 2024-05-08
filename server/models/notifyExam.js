const mongoose = require("mongoose");

const notifyExamSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
  },
});

const ExamNotify = mongoose.model("ExamNotify", examSchema);

module.exports = ExamNotify;
