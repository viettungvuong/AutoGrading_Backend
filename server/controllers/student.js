const Student = require("../models/student");
const Exam = require("../models/exam");

const calculateStudentAvg = (studentId) => {
  Exam.find({})
    .populate({
      path: "student",
      match: { studentId: studentId },
    })
    .exec((err, exams) => {
      if (err) {
        return null;
      }
      var sum = 0.0;
      const n = exams.length();
      exams.forEach((exam, index) => {
        sum += exam.score;
      });
      return sum / n;
    });
};

module.exports = {
  calculateStudentAvg,
};
