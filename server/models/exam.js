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
  graded_paper_img: {
    // lưu đường dẫn tới file hình bài thi đã chấm
    type: String,
  },
  session_name: {
    type: String,
    required: true,
  },
});

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;
