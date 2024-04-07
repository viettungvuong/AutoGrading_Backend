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
});

const ExamSession = mongoose.model("ExamSession", examSessionSchema);

module.exports = ExamSession;
