const mongoose = require("mongoose");

const examSessionSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  exams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  schoolClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  answers: {
    type: Map,
    of: Number,
  },
  available_choices: {
    type: Number,
    required: true,
  },
});

const ExamSession = mongoose.model("ExamSession", examSessionSchema);

module.exports = ExamSession;
