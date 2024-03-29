const Student = require("../models/student");
const Exam = require("../models/exam");

const getAllExamsOfStudent = async (studentId) => {
  Exam.find({ student: studentId })
    .populate("student")
    .exec((err, exams) => {
      if (err) {
        return null;
      }
      return exams;
    });
};

module.exports = {
  getAllExamsOfStudent,
};
