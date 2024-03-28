const mongoose = require("mongoose");
const examSessionSchema = new mongoose.Schema({
  exams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }],
});

const ExamSession = mongoose.model("ExamSession", examSessionSchema);

module.exports = ExamSession;
